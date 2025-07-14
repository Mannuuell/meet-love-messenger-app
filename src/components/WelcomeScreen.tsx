import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export const WelcomeScreen = ({ onGetStarted }: WelcomeScreenProps) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse-romantic"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-xl animate-pulse-romantic" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-trust/5 rounded-full blur-2xl"></div>
      </div>

      <div className="text-center z-10 max-w-sm">
        {/* Logo */}
        <div className={`mb-8 ${animate ? 'animate-scale-in' : 'opacity-0'}`}>
          <div className="relative">
            <Heart className="w-20 h-20 text-primary mx-auto mb-4 animate-bounce-gentle" />
            <Sparkles className="w-6 h-6 text-accent absolute -top-2 -right-2 animate-pulse-romantic" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Meet Love
          </h1>
          <div className="w-16 h-1 bg-gradient-romantic mx-auto rounded-full"></div>
        </div>

        {/* Slogan */}
        <div className={`mb-12 ${animate ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Conexões reais,{' '}
            <span className="text-transparent bg-gradient-romantic bg-clip-text font-semibold">
              sentimentos verdadeiros
            </span>
          </p>
        </div>

        {/* CTA Button */}
        <div className={`${animate ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
          <Button 
            variant="romantic" 
            size="lg" 
            onClick={onGetStarted}
            className="w-full font-semibold"
          >
            Começar
          </Button>
        </div>

        {/* Trust indicators */}
        <div className={`mt-8 flex items-center justify-center gap-4 text-sm text-muted-foreground ${animate ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.9s' }}>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-trust rounded-full"></div>
            <span>Seguro</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>Verificado</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <span>Privado</span>
          </div>
        </div>
      </div>
    </div>
  );
};