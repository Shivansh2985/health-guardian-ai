import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { analysisType, data } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    let systemPrompt = '';
    let userPrompt = '';

    switch (analysisType) {
      case 'diabetes':
        systemPrompt = 'You are a medical AI assistant specializing in diabetes analysis. Provide detailed, accurate health assessments based on patient data. Always emphasize consulting with healthcare professionals.';
        userPrompt = `Analyze the following diabetes-related data and provide a comprehensive assessment:
        
Blood Glucose: ${data.bloodGlucose} mg/dL
HbA1c: ${data.hba1c}%
Age: ${data.age}
BMI: ${data.bmi}
Physical Activity: ${data.activity}
Diet Quality: ${data.diet}

Provide:
1. Risk assessment (low/medium/high)
2. Key findings
3. 5 personalized recommendations
4. Preventive measures
5. Lifestyle modifications

Format your response as JSON with fields: riskLevel, summary, recommendations (array), keyFindings, preventiveMeasures.`;
        break;

      case 'alzheimer':
        systemPrompt = 'You are a neurological health AI assistant specializing in Alzheimer\'s disease risk assessment. Provide evidence-based cognitive health analysis.';
        userPrompt = `Analyze the following cognitive health data:
        
Age: ${data.age}
Memory Score: ${data.memoryScore}/10
Cognitive Function: ${data.cognitiveFunction}
Family History: ${data.familyHistory}
Education Level: ${data.education}
Physical Activity: ${data.activity}
Social Engagement: ${data.socialEngagement}

Provide:
1. Risk assessment (low/medium/high)
2. Cognitive health summary
3. 5 brain health recommendations
4. Early warning signs to monitor
5. Preventive strategies

Format as JSON with: riskLevel, summary, recommendations (array), warningSigns, preventiveStrategies.`;
        break;

      case 'ckd':
        systemPrompt = 'You are a nephrology AI assistant specializing in chronic kidney disease assessment. Provide detailed kidney health analysis.';
        userPrompt = `Analyze the following kidney health data:
        
eGFR: ${data.egfr} mL/min/1.73m²
Creatinine: ${data.creatinine} mg/dL
Blood Pressure: ${data.bloodPressure}
Diabetes: ${data.diabetes}
Albumin/Creatinine Ratio: ${data.acr}
Age: ${data.age}

Provide:
1. CKD stage assessment
2. Risk level (low/medium/high)
3. Key findings
4. 5 kidney health recommendations
5. Dietary modifications
6. Monitoring requirements

Format as JSON with: stage, riskLevel, summary, recommendations (array), dietaryAdvice, monitoringPlan.`;
        break;

      case 'diet':
        systemPrompt = 'You are a certified nutritionist AI assistant. Provide personalized dietary recommendations based on health goals and current diet patterns.';
        userPrompt = `Create a personalized diet plan based on:
        
Goal: ${data.goal}
Current Diet: ${data.currentDiet}
Allergies: ${data.allergies || 'None'}
Activity Level: ${data.activityLevel}
Age: ${data.age}
Weight: ${data.weight} kg
Height: ${data.height} cm

Provide:
1. Nutritional assessment
2. Calorie recommendations
3. Macro distribution
4. 5 meal suggestions
5. Foods to include/avoid
6. Hydration tips

Format as JSON with: assessment, calories, macros, mealPlan (array), foodGuidelines, hydrationTips.`;
        break;

      case 'workout':
        systemPrompt = 'You are a certified fitness AI trainer. Create personalized workout recommendations based on fitness level and goals.';
        userPrompt = `Create a workout plan for:
        
Fitness Goal: ${data.goal}
Current Fitness Level: ${data.fitnessLevel}
Available Time: ${data.availableTime} minutes/day
Equipment: ${data.equipment || 'None'}
Age: ${data.age}
Experience: ${data.experience}

Provide:
1. Fitness assessment
2. Weekly workout schedule
3. 5 recommended exercises
4. Progressive plan
5. Recovery tips
6. Safety guidelines

Format as JSON with: assessment, weeklySchedule, exercises (array), progression, recoveryTips, safetyGuidelines.`;
        break;

      default:
        throw new Error('Invalid analysis type');
    }

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: 'AI credits exhausted. Please add credits to your workspace.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      throw new Error('AI analysis failed');
    }

    const aiData = await aiResponse.json();
    const analysis = aiData.choices[0].message.content;

    // Parse JSON response
    let parsedAnalysis;
    try {
      parsedAnalysis = JSON.parse(analysis);
    } catch {
      // If not JSON, create structured response
      parsedAnalysis = {
        riskLevel: 'medium',
        summary: analysis,
        recommendations: ['Consult with a healthcare professional for personalized advice'],
      };
    }

    // Save report to database
    const reportTitle = `${analysisType.charAt(0).toUpperCase() + analysisType.slice(1)} Analysis - ${new Date().toLocaleDateString()}`;
    
    const { data: report, error: reportError } = await supabase
      .from('health_reports')
      .insert({
        user_id: user.id,
        report_type: analysisType,
        title: reportTitle,
        summary: parsedAnalysis.summary || parsedAnalysis.assessment,
        full_report: analysis,
        risk_level: parsedAnalysis.riskLevel || parsedAnalysis.stage || 'medium',
        recommendations: parsedAnalysis.recommendations || [],
        metrics: data,
      })
      .select()
      .single();

    if (reportError) {
      console.error('Error saving report:', reportError);
    }

    // Award points and check for badges
    const pointsEarned = 10;
    await supabase
      .from('profiles')
      .update({ 
        total_points: supabase.rpc('increment', { x: pointsEarned }) 
      })
      .eq('id', user.id);

    await supabase
      .from('achievements')
      .insert({
        user_id: user.id,
        achievement_type: 'report_generated',
        description: `Generated ${analysisType} analysis report`,
        points_earned: pointsEarned,
      });

    return new Response(
      JSON.stringify({ 
        analysis: parsedAnalysis,
        report,
        pointsEarned,
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in health-analysis:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});