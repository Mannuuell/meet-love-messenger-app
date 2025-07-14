import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, X, UserPlus } from "lucide-react";

interface FavoritesScreenProps {
  onNavigate: (screen: string) => void;
}

export const FavoritesScreen = ({ onNavigate }: FavoritesScreenProps) => {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "Camila Rodrigues",
      age: 26,
      bio: "Designer gráfica, amante de arte e natureza. Sempre em busca de novas inspirações.",
      interests: ["Arte", "Design", "Natureza"],
      addedDate: "2 dias atrás",
      hasNewActivity: true,
      compatibility: "95%"
    },
    {
      id: 2,
      name: "Lucas Ferreira", 
      age: 30,
      bio: "Engenheiro de software e músico. Adoro viajar e conhecer culturas diferentes.",
      interests: ["Tecnologia", "Música", "Viagem"],
      addedDate: "1 semana atrás",
      hasNewActivity: false,
      compatibility: "88%"
    },
    {
      id: 3,
      name: "Fernanda Lima",
      age: 28,
      bio: "Psicóloga e yoga instructor. Acredito no poder das conexões humanas verdadeiras.",
      interests: ["Yoga", "Psicologia", "Mindfulness"],
      addedDate: "3 dias atrás",
      hasNewActivity: true,
      compatibility: "92%"
    }
  ]);

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

  const startChat = (personId: number) => {
    console.log(`Starting chat with ${personId}`);
    onNavigate('chat');
  };

  return (
    <div className="min-h-screen bg-gradient-warm pb-20">
      {/* Header */}
      <div className="p-4 bg-card/50 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Meus Favoritos
            </h1>
            <p className="text-sm text-muted-foreground">
              {favorites.length} pessoas especiais
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-gradient-romantic rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {favorites.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
          <div className="w-20 h-20 bg-gradient-romantic rounded-full flex items-center justify-center mb-6">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Nenhum favorito ainda
          </h2>
          <p className="text-muted-foreground text-center mb-6">
            Explore pessoas interessantes e adicione aos seus favoritos para não perder o contato.
          </p>
          <Button variant="romantic" onClick={() => onNavigate('explore')}>
            <UserPlus className="w-4 h-4 mr-2" />
            Explorar Pessoas
          </Button>
        </div>
      )}

      {/* Favorites List */}
      {favorites.length > 0 && (
        <div className="p-4 space-y-4">
          {favorites.map((person) => (
            <Card key={person.id} className="shadow-romantic border-0 overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  {/* Photo */}
                  <div className="relative w-24 h-32 bg-gradient-romantic flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      {person.name.charAt(0)}
                    </span>
                    {person.hasNewActivity && (
                      <div className="absolute top-2 right-2 w-3 h-3 bg-trust rounded-full border-2 border-white animate-pulse"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {person.name}, {person.age}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>Compatibilidade: {person.compatibility}</span>
                          <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                          <span>{person.addedDate}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFavorite(person.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {person.bio}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {person.interests.map((interest) => (
                        <Badge key={interest} variant="outline" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startChat(person.id)}
                        className="flex-1"
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Conversar
                      </Button>
                      <Button
                        variant="romantic"
                        size="sm"
                        className="px-3"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>

                    {person.hasNewActivity && (
                      <div className="mt-2 p-2 bg-trust/10 rounded-lg">
                        <p className="text-xs text-trust font-medium">
                          ✨ Nova atividade disponível
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Actions */}
          <div className="pt-4 space-y-3">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onNavigate('explore')}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Encontrar Mais Pessoas
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Dica: Pessoas nos favoritos são notificadas quando você está online
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};