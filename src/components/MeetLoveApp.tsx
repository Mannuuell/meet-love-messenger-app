import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { WelcomeScreen } from "./WelcomeScreen";
import { AuthScreen } from "./AuthScreen";
import { ProfileSetupScreen } from "./ProfileSetupScreen";
import { HomeScreen } from "./HomeScreen";
import { ExploreScreen } from "./ExploreScreen";
import { FavoritesScreen } from "./FavoritesScreen";
import { ChatScreen } from "./ChatScreen";
import { ProfileScreen } from "./ProfileScreen";
import { BottomNavigation } from "./BottomNavigation";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

type AppScreen = 
  | 'welcome'
  | 'auth' 
  | 'profile-setup'
  | 'home'
  | 'explore'
  | 'favorites'
  | 'chat'
  | 'profile';

export const MeetLoveApp = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('welcome');
  const { user, isAuthenticated, isLoading } = useSupabaseAuth();
  const [hasProfile, setHasProfile] = useState(false);

  // Check if user has profile
  useEffect(() => {
    const checkProfile = async () => {
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        setHasProfile(!!data);
      }
    };

    if (user) {
      checkProfile();
    }
  }, [user]);

  // Set initial screen based on auth state
  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && hasProfile) {
        setCurrentScreen('home');
      } else if (isAuthenticated && !hasProfile) {
        setCurrentScreen('profile-setup');
      } else {
        setCurrentScreen('welcome');
      }
    }
  }, [isAuthenticated, hasProfile, isLoading]);

  const handleGetStarted = () => {
    setCurrentScreen('auth');
  };

  const handleAuthSuccess = () => {
    // Auth hook will handle state updates
    // Screen will be set via useEffect
  };

  const handleProfileComplete = () => {
    // Profile completion is handled in ProfileSetupScreen
    // Screen will be set via useEffect
  };

  const handleNavigation = (screen: string) => {
    if (isAuthenticated && hasProfile) {
      setCurrentScreen(screen as AppScreen);
    }
  };

  const handleBack = () => {
    if (currentScreen === 'auth') {
      setCurrentScreen('welcome');
    } else if (currentScreen === 'profile-setup') {
      setCurrentScreen('auth');
    }
  };

  // Show main app screens with navigation  
  const showBottomNav = isAuthenticated && hasProfile && !['welcome', 'auth', 'profile-setup'].includes(currentScreen);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-romantic rounded-full mx-auto mb-4 animate-pulse"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Screen Content */}
      {currentScreen === 'welcome' && (
        <WelcomeScreen onGetStarted={handleGetStarted} />
      )}
      
      {currentScreen === 'auth' && (
        <AuthScreen onBack={handleBack} onAuth={handleAuthSuccess} />
      )}
      
      {currentScreen === 'profile-setup' && (
        <ProfileSetupScreen onBack={handleBack} onComplete={handleProfileComplete} />
      )}
      
      {currentScreen === 'home' && (
        <HomeScreen onNavigate={handleNavigation} />
      )}
      
      {currentScreen === 'explore' && (
        <ExploreScreen onNavigate={handleNavigation} />
      )}
      
      {currentScreen === 'favorites' && (
        <FavoritesScreen onNavigate={handleNavigation} />
      )}
      
      {currentScreen === 'chat' && (
        <ChatScreen onNavigate={handleNavigation} />
      )}
      
      {currentScreen === 'profile' && (
        <ProfileScreen onNavigate={handleNavigation} />
      )}

      {/* Bottom Navigation */}
      {showBottomNav && (
        <BottomNavigation 
          activeScreen={currentScreen} 
          onNavigate={handleNavigation} 
        />
      )}
    </div>
  );
};