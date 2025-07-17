import { useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  isAuthenticated: boolean;
}

export interface UserProfile {
  userId: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  interests: string[];
  genderPreference: string;
  ageRange: [number, number];
  discreteMode: boolean;
  photos: string[];
  createdAt: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user and profile from localStorage on mount
  useEffect(() => {
    const loadUserData = () => {
      try {
        const savedUser = localStorage.getItem('meetlove_user');
        const savedProfile = localStorage.getItem('meetlove_profile');
        
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
        }
        
        if (savedProfile) {
          const profileData = JSON.parse(savedProfile);
          setProfile(profileData);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user exists in localStorage
      const existingUsers = JSON.parse(localStorage.getItem('meetlove_users') || '[]');
      const existingUser = existingUsers.find((u: any) => u.email === email);

      if (existingUser && existingUser.password === password) {
        const userData: User = {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          phone: existingUser.phone,
          isAuthenticated: true
        };

        setUser(userData);
        localStorage.setItem('meetlove_user', JSON.stringify(userData));
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string, phone?: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('meetlove_users') || '[]');
      const userExists = existingUsers.some((u: any) => u.email === email);

      if (userExists) {
        return false;
      }

      const newUser = {
        id: `user_${Date.now()}`,
        name,
        email,
        password,
        phone,
        createdAt: new Date().toISOString()
      };

      const userData: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        isAuthenticated: true
      };

      // Save to users list
      existingUsers.push(newUser);
      localStorage.setItem('meetlove_users', JSON.stringify(existingUsers));

      // Set current user
      setUser(userData);
      localStorage.setItem('meetlove_user', JSON.stringify(userData));
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const saveProfile = (profileData: Omit<UserProfile, 'userId' | 'createdAt'>): boolean => {
    try {
      if (!user) return false;

      const newProfile: UserProfile = {
        ...profileData,
        userId: user.id,
        createdAt: new Date().toISOString()
      };

      setProfile(newProfile);
      localStorage.setItem('meetlove_profile', JSON.stringify(newProfile));
      
      return true;
    } catch (error) {
      console.error('Profile save error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem('meetlove_user');
    localStorage.removeItem('meetlove_profile');
  };

  const updateProfile = (updates: Partial<UserProfile>): boolean => {
    try {
      if (!profile) return false;

      const updatedProfile = { ...profile, ...updates };
      setProfile(updatedProfile);
      localStorage.setItem('meetlove_profile', JSON.stringify(updatedProfile));
      
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    }
  };

  return {
    user,
    profile,
    isLoading,
    isAuthenticated: !!user?.isAuthenticated,
    isProfileComplete: !!profile,
    login,
    register,
    logout,
    saveProfile,
    updateProfile
  };
};