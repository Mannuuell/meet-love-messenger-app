import { useState, useEffect } from "react";
import { WelcomeScreen } from "./WelcomeScreen";
import { AuthScreen } from "./AuthScreen";
import { ProfileSetupScreen } from "./ProfileSetupScreen";
import { HomeScreen } from "./HomeScreen";
import { ExploreScreen } from "./ExploreScreen";
import { FavoritesScreen } from "./FavoritesScreen";
import { ChatScreen } from "./ChatScreen";
import { ProfileScreen } from "./ProfileScreen";
import { BottomNavigation } from "./BottomNavigation";
import { useAuth } from "@/hooks/useAuth";
import { useAppData } from "@/hooks/useAppData";

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
  const { user, isAuthenticated, isProfileComplete, isLoading } = useAuth();
  const appData = useAppData(user?.id);

  // Set initial screen based on auth state
  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && isProfileComplete) {
        setCurrentScreen('home');
      } else if (isAuthenticated && !isProfileComplete) {
        setCurrentScreen('profile-setup');
      } else {
        setCurrentScreen('welcome');
      }
    }
  }, [isAuthenticated, isProfileComplete, isLoading]);

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
    if (isAuthenticated && isProfileComplete) {
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
  const showBottomNav = isAuthenticated && isProfileComplete && !['welcome', 'auth', 'profile-setup'].includes(currentScreen);

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
        <HomeScreen onNavigate={handleNavigation} appData={appData} />
      )}
      
      {currentScreen === 'explore' && (
        <ExploreScreen onNavigate={handleNavigation} appData={appData} />
      )}
      
      {currentScreen === 'favorites' && (
        <FavoritesScreen onNavigate={handleNavigation} appData={appData} />
      )}
      
      {currentScreen === 'chat' && (
        <ChatScreen onNavigate={handleNavigation} appData={appData} user={user} />
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