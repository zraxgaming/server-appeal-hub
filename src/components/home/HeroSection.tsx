import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Shield, Zap, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export const HeroSection = () => {
  const [copied, setCopied] = useState(false);
  const serverIP = "play.zcraft.xyz";

  const copyIP = () => {
    navigator.clipboard.writeText(serverIP);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Server IP copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8 animate-fade-in">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-medium">Season 4 Now Live</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            Welcome to{" "}
            <span className="text-gradient">Z-Craft</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up stagger-1">
            Experience Minecraft like never before. Survival, custom enchants, 
            economy, and an amazing community await.
          </p>

          {/* Server IP Copy */}
          <div className="flex items-center justify-center gap-4 mb-8 animate-slide-up stagger-2">
            <button
              onClick={copyIP}
              className="group flex items-center gap-3 px-6 py-3 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 shadow-soft hover:shadow-glow"
            >
              <span className="text-lg font-mono font-semibold">{serverIP}</span>
              {copied ? (
                <Check className="h-5 w-5 text-primary" />
              ) : (
                <Copy className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              )}
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up stagger-3">
            <Link to="/appeal">
              <Button size="lg" className="gap-2 bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow">
                Submit Appeal
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/rules">
              <Button size="lg" variant="outline" className="gap-2">
                <Shield className="h-4 w-4" />
                View Rules
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 animate-slide-up stagger-4">
            {[
              { label: "Players", value: "2.5K+" },
              { label: "Uptime", value: "99.9%" },
              { label: "Since", value: "2019" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient">{stat.value}</div>
                <div className="text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
