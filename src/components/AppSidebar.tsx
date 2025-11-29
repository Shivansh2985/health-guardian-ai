import { Activity, Brain, Heart, Home, MessageSquare, Utensils, Dumbbell, Database, LogOut, User } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'Workout Management', url: '/dashboard/workout', icon: Dumbbell },
  { title: 'Diet Planner', url: '/dashboard/diet', icon: Utensils },
  { title: 'Diabetes Analyzer', url: '/dashboard/diabetes', icon: Activity },
  { title: 'Alzheimer Analyzer', url: '/dashboard/alzheimer', icon: Brain },
  { title: 'CKD Analyzer', url: '/dashboard/ckd', icon: Database },
  { title: 'AI Assistant', url: '/dashboard/chat', icon: MessageSquare },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarContent>
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-hero rounded-xl flex items-center justify-center shadow-glow shrink-0">
              <Heart className="w-6 h-6 text-white" />
            </div>
            {!collapsed && (
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                HealthAI Guardian
              </span>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-primary text-primary-foreground shadow-soft'
                            : 'hover:bg-muted'
                        }`}
                      >
                        <item.icon className="w-5 h-5 shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      {/* User Profile Section */}
      <div className="border-t p-4 mt-auto">
        {!collapsed ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user?.email?.[0].toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <div className="font-medium text-sm truncate">{user?.email}</div>
                <div className="text-xs text-muted-foreground">Health Guardian</div>
              </div>
            </div>
            <Button
              onClick={signOut}
              variant="outline"
              className="w-full"
              size="sm"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        ) : (
          <Button
            onClick={signOut}
            variant="ghost"
            size="icon"
            className="w-full"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        )}
      </div>
    </Sidebar>
  );
}
