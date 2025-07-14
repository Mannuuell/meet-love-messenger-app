import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Settings, 
  Edit, 
  Shield, 
  Bell, 
  Eye, 
  Heart, 
  Users, 
  Star, 
  Camera,
  CheckCircle,
  MapPin,
  Calendar,
  Zap
} from "lucide-react";

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
}

export const ProfileScreen = ({ onNavigate }: ProfileScreenProps) => {
  const [notifications, setNotifications] = useState({
    messages: true,
    matches: true,
    likes: false,
    marketing: false
  });

  const [privacy, setPrivacy] = useState({
    showOnline: true,
    discreteMode: false,
    showDistance: true
  });

  const userProfile = {
    name: "Você",
    age: 28,
    location: "São Paulo, SP",
    bio: "Apaixonada por viagens, música e boas conversas. Sempre em busca de conexões autênticas.",
    interests: ["Viajar", "Música", "Fotografia", "Culinária", "Arte"],
    verified: true,
    memberSince: "Janeiro 2024"
  };

  const stats = [
    { label: "Visitantes", value: 127, icon: Eye },
    { label: "Curtidas", value: 23, icon: Heart },
    { label: "Matches", value: 8, icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-warm pb-20">
      {/* Header */}
      <div className="p-4 bg-card/50 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">
            Meu Perfil
          </h1>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Card */}
        <Card className="shadow-romantic border-0">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="relative">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-gradient-romantic text-white text-xl">
                    {userProfile.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="default"
                  size="icon"
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-foreground">
                    {userProfile.name}, {userProfile.age}
                  </h2>
                  {userProfile.verified && (
                    <CheckCircle className="w-5 h-5 text-trust" />
                  )}
                </div>
                
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                  <MapPin className="w-3 h-3" />
                  {userProfile.location}
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  Membro desde {userProfile.memberSince}
                </div>
              </div>

              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Button>
            </div>

            <p className="text-muted-foreground mb-4">
              {userProfile.bio}
            </p>

            <div className="flex flex-wrap gap-2">
              {userProfile.interests.map((interest) => (
                <Badge key={interest} variant="outline">
                  {interest}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <Card key={label} className="shadow-soft border-0">
              <CardContent className="p-4 text-center">
                <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{value}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-16" onClick={() => onNavigate('favorites')}>
            <div className="text-center">
              <Heart className="w-6 h-6 mx-auto mb-1" />
              <span className="text-sm">Favoritos</span>
            </div>
          </Button>
          <Button variant="outline" className="h-16">
            <div className="text-center">
              <Users className="w-6 h-6 mx-auto mb-1" />
              <span className="text-sm">Seguidores</span>
            </div>
          </Button>
        </div>

        {/* Privacy Settings */}
        <Card className="shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Privacidade
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Status online</p>
                <p className="text-sm text-muted-foreground">Mostrar quando estou online</p>
              </div>
              <Switch
                checked={privacy.showOnline}
                onCheckedChange={(checked) => 
                  setPrivacy({...privacy, showOnline: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Modo discreto</p>
                <p className="text-sm text-muted-foreground">Controle quem pode ver seu perfil</p>
              </div>
              <Switch
                checked={privacy.discreteMode}
                onCheckedChange={(checked) => 
                  setPrivacy({...privacy, discreteMode: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Mostrar distância</p>
                <p className="text-sm text-muted-foreground">Exibir sua localização aproximada</p>
              </div>
              <Switch
                checked={privacy.showDistance}
                onCheckedChange={(checked) => 
                  setPrivacy({...privacy, showDistance: checked})
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Novas mensagens</p>
                <p className="text-sm text-muted-foreground">Notificar sobre mensagens</p>
              </div>
              <Switch
                checked={notifications.messages}
                onCheckedChange={(checked) => 
                  setNotifications({...notifications, messages: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Novos matches</p>
                <p className="text-sm text-muted-foreground">Notificar sobre novos matches</p>
              </div>
              <Switch
                checked={notifications.matches}
                onCheckedChange={(checked) => 
                  setNotifications({...notifications, matches: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Curtidas</p>
                <p className="text-sm text-muted-foreground">Notificar quando curtirem seu perfil</p>
              </div>
              <Switch
                checked={notifications.likes}
                onCheckedChange={(checked) => 
                  setNotifications({...notifications, likes: checked})
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Premium Features */}
        <Card className="shadow-romantic border-0 bg-gradient-romantic">
          <CardContent className="p-6 text-center text-white">
            <Zap className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Meet Love Premium</h3>
            <p className="text-white/80 mb-4">
              Desbloqueie recursos exclusivos e encontre seu match mais rápido
            </p>
            <Button variant="secondary" className="w-full">
              Conhecer Premium
            </Button>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            Configurações da conta
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Ajuda e suporte
          </Button>
          <Button variant="outline" className="w-full justify-start text-destructive">
            Sair da conta
          </Button>
        </div>
      </div>
    </div>
  );
};