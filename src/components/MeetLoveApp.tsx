import { useState } from "react";
import { WelcomeScreen } from "./WelcomeScreen";
import { AuthScreen } from "./AuthScreen";
import { ProfileSetupScreen } from "./ProfileSetupScreen";
import { HomeScreen } from "./HomeScreen";
import { ExploreScreen } from "./ExploreScreen";
import { FavoritesScreen } from "./FavoritesScreen";
import { ChatScreen } from "./ChatScreen";
import { ProfileScreen } from "./ProfileScreen";
import { BottomNavigation } from "./BottomNavigation";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileComplete, setProfileComplete] = useState(false);

  const handleGetStarted = () => {
    setCurrentScreen('auth');
  };

  const handleAuth = () => {
    setIsAuthenticated(true);
    setCurrentScreen('profile-setup');
  };

  const handleProfileComplete = () => {
    setProfileComplete(true);
    setCurrentScreen('home');
  };

  const handleNavigation = (screen: string) => {
    if (isAuthenticated && profileComplete) {
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
  const showBottomNav = isAuthenticated && profileComplete && !['welcome', 'auth', 'profile-setup'].includes(currentScreen);

  return (
    <div className="relative">
      {/* Screen Content */}
      {currentScreen === 'welcome' && (
        <WelcomeScreen onGetStarted={handleGetStarted} />
      )}
      
      {currentScreen === 'auth' && (
        <AuthScreen onBack={handleBack} onAuth={handleAuth} />
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