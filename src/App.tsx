import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import WorkoutManagement from "./pages/WorkoutManagement";
import DietPlanner from "./pages/DietPlanner";
import DiabetesAnalyzer from "./pages/DiabetesAnalyzer";
import AlzheimerAnalyzer from "./pages/AlzheimerAnalyzer";
import CKDAnalyzer from "./pages/CKDAnalyzer";
import AIChat from "./pages/AIChat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<DashboardHome />} />
                <Route path="workout" element={<WorkoutManagement />} />
                <Route path="diet" element={<DietPlanner />} />
                <Route path="diabetes" element={<DiabetesAnalyzer />} />
                <Route path="alzheimer" element={<AlzheimerAnalyzer />} />
                <Route path="ckd" element={<CKDAnalyzer />} />
                <Route path="chat" element={<AIChat />} />
              </Route>
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
