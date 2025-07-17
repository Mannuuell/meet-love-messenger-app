import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Camera, MapPin, Heart, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface ProfileSetupScreenProps {
  onBack: () => void;
  onComplete: () => void;
}

export const ProfileSetupScreen = ({ onBack, onComplete }: ProfileSetupScreenProps) => {
  const [step, setStep] = useState(1);
  const [discreteMode, setDiscreteMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    location: '',
    bio: '',
    interests: [] as string[],
    genderPreference: '',
    ageRange: [18, 35]
  });

  const { saveProfile } = useAuth();
  const { toast } = useToast();

  const interests = [
    'Viajar', 'Música', 'Livros', 'Culinária', 'Fitness', 'Cinema', 
    'Arte', 'Tecnologia', 'Natureza', 'Fotografia', 'Dança', 'Esportes'
  ];

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.name.trim()) {
        toast({
          title: "Erro",
          description: "Nome é obrigatório",
          variant: "destructive"
        });
        return false;
      }
      if (!formData.age || parseInt(formData.age) < 18 || parseInt(formData.age) > 80) {
        toast({
          title: "Erro",
          description: "Idade deve estar entre 18 e 80 anos",
          variant: "destructive"
        });
        return false;
      }
      if (!formData.location.trim()) {
        toast({
          title: "Erro",
          description: "Localização é obrigatória",
          variant: "destructive"
        });
        return false;
      }
      if (!formData.bio.trim() || formData.bio.length < 20) {
        toast({
          title: "Erro",
          description: "Bio deve ter pelo menos 20 caracteres",
          variant: "destructive"
        });
        return false;
      }
    } else if (step === 2) {
      if (formData.interests.length < 3) {
        toast({
          title: "Erro",
          description: "Selecione pelo menos 3 interesses",
          variant: "destructive"
        });
        return false;
      }
    } else if (step === 3) {
      if (!formData.genderPreference) {
        toast({
          title: "Erro",
          description: "Selecione uma preferência de gênero",
          variant: "destructive"
        });
        return false;
      }
    }
    return true;
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsLoading(true);
      try {
        const success = saveProfile({
          name: formData.name,
          age: parseInt(formData.age),
          location: formData.location,
          bio: formData.bio,
          interests: formData.interests,
          genderPreference: formData.genderPreference,
          ageRange: formData.ageRange as [number, number],
          discreteMode,
          photos: []
        });

        if (success) {
          toast({
            title: "Sucesso!",
            description: "Perfil criado com sucesso"
          });
          onComplete();
        } else {
          toast({
            title: "Erro",
            description: "Erro ao salvar perfil. Tente novamente.",
            variant: "destructive"
          });
        }
      } catch (error) {
        toast({
          title: "Erro",
          description: "Algo deu errado. Tente novamente.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pt-4">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="text-center">
          <h1 className="text-xl font-semibold text-foreground">Criar Perfil</h1>
          <p className="text-sm text-muted-foreground">Passo {step} de 3</p>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="w-full bg-secondary rounded-full h-2">
          <div 
            className="bg-gradient-romantic h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-romantic border-0">
          {step === 1 && (
            <>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-foreground">
                  Vamos começar!
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Conte-nos sobre você
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Photo Upload */}
                <div className="text-center">
                  <div className="relative mx-auto w-32 h-32 bg-gradient-romantic rounded-full flex items-center justify-center mb-4 shadow-romantic">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                  <Button variant="outline" size="sm">
                    Adicionar Fotos
                  </Button>
                </div>

                {/* Basic Info */}
                <div className="space-y-4">
                  <Input
                    placeholder="Nome"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Idade"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                    />
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Localização"
                        className="pl-10"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                      />
                    </div>
                  </div>

                  <Textarea
                    placeholder="Escreva uma bio interessante sobre você..."
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    className="min-h-[100px]"
                  />
                </div>

                <Button onClick={handleNext} variant="romantic" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    "Próximo"
                  )}
                </Button>
              </CardContent>
            </>
          )}

          {step === 2 && (
            <>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-foreground">
                  Seus interesses
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Selecione o que você gosta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <Badge
                      key={interest}
                      variant={formData.interests.includes(interest) ? "default" : "outline"}
                      className={`cursor-pointer transition-all ${
                        formData.interests.includes(interest) 
                          ? 'bg-primary text-primary-foreground shadow-soft' 
                          : 'hover:bg-secondary'
                      }`}
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  {formData.interests.length} selecionados
                </div>

                <Button onClick={handleNext} variant="romantic" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    "Próximo"
                  )}
                </Button>
              </CardContent>
            </>
          )}

          {step === 3 && (
            <>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-foreground">
                  Preferências
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Quem você gostaria de conhecer?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Gender Preference */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">
                    Estou procurando por:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Homens', 'Mulheres', 'Todos'].map((option) => (
                      <Button
                        key={option}
                        variant={formData.genderPreference === option ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFormData({...formData, genderPreference: option})}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Age Range */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">
                    Faixa etária: {formData.ageRange[0]} - {formData.ageRange[1]} anos
                  </label>
                  <div className="px-3">
                    <input
                      type="range"
                      min="18"
                      max="65"
                      value={formData.ageRange[1]}
                      onChange={(e) => setFormData({
                        ...formData, 
                        ageRange: [formData.ageRange[0], parseInt(e.target.value)]
                      })}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Discrete Mode */}
                <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <div className="flex items-center gap-3">
                    {discreteMode ? (
                      <EyeOff className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <Eye className="w-5 h-5 text-muted-foreground" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Modo discreto
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Controle quem pode ver seu perfil
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={discreteMode ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDiscreteMode(!discreteMode)}
                  >
                    {discreteMode ? "Ativo" : "Inativo"}
                  </Button>
                </div>

                <Button onClick={handleNext} variant="romantic" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Criando perfil...
                    </>
                  ) : (
                    <>
                      <Heart className="w-4 h-4 mr-2" />
                      Completar Perfil
                    </>
                  )}
                </Button>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};