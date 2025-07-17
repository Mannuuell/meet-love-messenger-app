import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, MapPin, Zap, Users, Coffee } from "lucide-react";

interface ExploreScreenProps {
  onNavigate: (screen: string) => void;
  appData: any;
}

export const ExploreScreen = ({ onNavigate }: ExploreScreenProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    distance: [10],
    age: [25, 35],
    interests: [] as string[]
  });
  const [showFilters, setShowFilters] = useState(false);

  const interests = ['Viajar', 'Música', 'Livros', 'Culinária', 'Fitness', 'Cinema', 'Arte', 'Tecnologia'];

  const nearbyPeople = [
    {
      id: 1,
      name: "Julia Costa",
      age: 29,
      distance: "500m",
      interests: ["Arte", "Música"],
      isOnline: true
    },
    {
      id: 2,
      name: "Pedro Lima",
      age: 31,
      distance: "1.2km",
      interests: ["Fitness", "Viajar"],
      isOnline: false
    },
    {
      id: 3,
      name: "Sofia Mendes",
      age: 27,
      distance: "800m", 
      interests: ["Livros", "Cinema"],
      isOnline: true
    }
  ];

  const toggleInterest = (interest: string) => {
    setFilters(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-warm pb-20">
      {/* Header */}
      <div className="p-4 bg-card/50 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-foreground">
            Explorar
          </h1>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, interesses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card className="mx-4 mb-4 shadow-soft border-0">
          <CardContent className="p-4 space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Distância: {filters.distance[0]}km
              </label>
              <Slider
                value={filters.distance}
                onValueChange={(value) => setFilters({...filters, distance: value})}
                max={50}
                step={1}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Idade: {filters.age[0]} - {filters.age[1]} anos
              </label>
              <Slider
                value={filters.age}
                onValueChange={(value) => setFilters({...filters, age: value})}
                min={18}
                max={60}
                step={1}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Interesses
              </label>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <Badge
                    key={interest}
                    variant={filters.interests.includes(interest) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleInterest(interest)}
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setFilters({ distance: [10], age: [25, 35], interests: [] })}
                className="flex-1"
              >
                Limpar
              </Button>
              <Button variant="romantic" size="sm" className="flex-1">
                Aplicar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <Card className="shadow-soft border-0 cursor-pointer hover:shadow-romantic transition-all">
            <CardContent className="p-4 text-center">
              <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-foreground">Pessoas Próximas</h3>
              <p className="text-sm text-muted-foreground">Por GPS</p>
            </CardContent>
          </Card>
          <Card className="shadow-soft border-0 cursor-pointer hover:shadow-romantic transition-all">
            <CardContent className="p-4 text-center">
              <Coffee className="w-8 h-8 text-accent mx-auto mb-2" />
              <h3 className="font-semibold text-foreground">Afinidades</h3>
              <p className="text-sm text-muted-foreground">Por interesses</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Nearby People */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            Pessoas próximas
          </h2>
          <span className="text-sm text-muted-foreground">
            {nearbyPeople.length} pessoas
          </span>
        </div>

        <div className="space-y-3">
          {nearbyPeople.map((person) => (
            <Card key={person.id} className="shadow-soft border-0 cursor-pointer hover:shadow-romantic transition-all">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* Photo */}
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-romantic rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        {person.name.charAt(0)}
                      </span>
                    </div>
                    {person.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-foreground">
                        {person.name}, {person.age}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {person.distance}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                      {person.interests.map((interest) => (
                        <Badge key={interest} variant="outline" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>

                    {person.isOnline && (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-600">Online agora</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-6 text-center">
          <Button variant="outline" className="w-full">
            <Users className="w-4 h-4 mr-2" />
            Carregar mais pessoas
          </Button>
        </div>
      </div>
    </div>
  );
};