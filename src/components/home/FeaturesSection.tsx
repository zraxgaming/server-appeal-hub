import { 
  Sword, 
  Shield, 
  Users, 
  Sparkles, 
  Coins, 
  Map,
  Trophy,
  Heart
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Sword,
    title: "Custom Enchants",
    description: "Over 50+ unique enchantments to discover and master.",
  },
  {
    icon: Coins,
    title: "Economy System",
    description: "Trade, sell, and build your fortune with our balanced economy.",
  },
  {
    icon: Users,
    title: "Clans & Teams",
    description: "Form alliances, create clans, and conquer together.",
  },
  {
    icon: Map,
    title: "Custom World",
    description: "Explore our handcrafted world with unique biomes and structures.",
  },
  {
    icon: Trophy,
    title: "Events & Seasons",
    description: "Compete in weekly events and seasonal competitions.",
  },
  {
    icon: Shield,
    title: "Anti-Cheat",
    description: "Advanced protection ensuring fair gameplay for everyone.",
  },
  {
    icon: Heart,
    title: "Active Community",
    description: "Join thousands of players in our welcoming community.",
  },
  {
    icon: Sparkles,
    title: "Regular Updates",
    description: "New content and features added every month.",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-gradient">Z-Craft</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We've built the ultimate Minecraft experience with features designed 
            for both casual players and hardcore enthusiasts.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.title}
                className="group bg-card/50 hover:bg-card border-border/50 hover:border-primary/30 transition-all duration-300 hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
