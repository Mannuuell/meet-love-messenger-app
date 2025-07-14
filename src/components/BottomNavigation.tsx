import { Button } from "@/components/ui/button";
import { Home, Search, Heart, MessageCircle, User } from "lucide-react";

interface BottomNavigationProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export const BottomNavigation = ({ activeScreen, onNavigate }: BottomNavigationProps) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explorar', icon: Search },
    { id: 'favorites', label: 'Favoritos', icon: Heart },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-sm border-t border-border z-50">
      <div className="flex items-center justify-around p-2">
        {navItems.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant="ghost"
            size="sm"
            onClick={() => onNavigate(id)}
            className={`flex flex-col items-center gap-1 p-2 h-auto ${
              activeScreen === id 
                ? 'text-primary' 
                : 'text-muted-foreground'
            }`}
          >
            <Icon className={`w-5 h-5 ${activeScreen === id ? 'text-primary' : ''}`} />
            <span className="text-xs">{label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};