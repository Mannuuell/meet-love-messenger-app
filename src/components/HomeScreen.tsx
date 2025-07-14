import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, Plus, Bell, MapPin, Star, Users, Coffee } from "lucide-react";

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export const HomeScreen = ({ onNavigate }: HomeScreenProps) => {
  const [suggestions] = useState([
    {
      id: 1,
      name: "Ana Silva",
      age: 28,
      location: "São Paulo, SP",
      bio: "Apaixonada por viagens e café. Adoro descobrir novos lugares e culturas.",
      interests: ["Viajar", "Café", "Fotografia"],
      compatibility: "Alta afinidade",
      distance: "2 km"
    },
    {
      id: 2,
      name: "Carlos Oliveira",
      age: 32,
      location: "Rio de Janeiro, RJ",
      bio: "Músico e chef nas horas vagas. Sempre em busca de novas experiências.",
      interests: ["Música", "Culinária", "Arte"],
      compatibility: "Boa afinidade",
      distance: "5 km"
    },
    {
      id: 3,
      name: "Maria Santos",
      age: 26,
      location: "Belo Horizonte, MG",
      bio: "Desenvolvedora, yoga e natureza. Acredito em conexões autênticas.",
      interests: ["Tecnologia", "Yoga", "Natureza"],
      compatibility: "Muito compatível",
      distance: "1 km"
    }
  ]);

  const handleAddFavorite = (personId: number) => {
    console.log(`Added ${personId} to favorites`);
  };

  const handleFollow = (personId: number) => {
    console.log(`Following ${personId}`);
  };

  const getCompatibilityColor = (compatibility: string) => {
    if (compatibility === "Alta afinidade" || compatibility === "Muito compatível") return "bg-trust";
    if (compatibility === "Boa afinidade") return "bg-primary";
    return "bg-accent";
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <div className="p-4 bg-card/50 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Descobrir
            </h1>
            <p className="text-sm text-muted-foreground">
              Pessoas especiais perto de você
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onNavigate('profile')}>
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gradient-romantic text-white text-xs">
                  EU
                </AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="shadow-soft border-0">
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">127</div>
              <div className="text-xs text-muted-foreground">Visitantes</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft border-0">
            <CardContent className="p-4 text-center">
              <Heart className="w-6 h-6 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">23</div>
              <div className="text-xs text-muted-foreground">Curtidas</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft border-0">
            <CardContent className="p-4 text-center">
              <Star className="w-6 h-6 text-trust mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">8</div>
              <div className="text-xs text-muted-foreground">Matches</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Suggestions */}
      <div className="px-4 pb-20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            Sugestões para você
          </h2>
          <Button variant="link" size="sm" onClick={() => onNavigate('explore')}>
            Ver mais
          </Button>
        </div>

        <div className="space-y-4">
          {suggestions.map((person) => (
            <Card key={person.id} className="shadow-romantic border-0 overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  {/* Photo */}
                  <div className="w-24 h-24 bg-gradient-romantic flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      {person.name.charAt(0)}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {person.name}, {person.age}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {person.distance}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getCompatibilityColor(person.compatibility)}`}></div>
                        <span className="text-xs text-muted-foreground">
                          {person.compatibility}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {person.bio}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {person.interests.slice(0, 2).map((interest) => (
                        <Badge key={interest} variant="outline" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                      {person.interests.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{person.interests.length - 2}
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddFavorite(person.id)}
                        className="flex-1"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Favoritar
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleFollow(person.id)}
                        className="flex-1"
                      >
                        <Bell className="w-4 h-4 mr-1" />
                        Seguir
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-6">
          <Button variant="outline" className="w-full">
            Ver mais sugestões
          </Button>
        </div>
      </div>
    </div>
  );
};