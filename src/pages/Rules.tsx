import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, 
  MessageSquare, 
  Ban, 
  Users, 
  Coins, 
  Bug,
  AlertTriangle,
  Heart
} from "lucide-react";

const ruleCategories = [
  {
    icon: Shield,
    title: "General Rules",
    color: "text-primary",
    rules: [
      "Respect all players and staff members at all times.",
      "No hacking, cheating, or using unfair modifications.",
      "Do not exploit bugs or glitches - report them instead.",
      "English only in public chat channels.",
      "Follow staff instructions without argument.",
    ],
  },
  {
    icon: MessageSquare,
    title: "Chat Rules",
    color: "text-blue-500",
    rules: [
      "No spam, flooding, or excessive caps.",
      "No advertising other servers or services.",
      "No inappropriate, offensive, or discriminatory content.",
      "No sharing personal information.",
      "Keep discussions civil and constructive.",
    ],
  },
  {
    icon: Ban,
    title: "Prohibited Actions",
    color: "text-destructive",
    rules: [
      "Griefing or destroying other players' builds.",
      "Stealing from other players.",
      "Creating lag machines or intentionally crashing the server.",
      "Using alternate accounts to evade bans.",
      "Impersonating staff or other players.",
    ],
  },
  {
    icon: Users,
    title: "Player Interactions",
    color: "text-amber-500",
    rules: [
      "No harassment, bullying, or targeted attacks.",
      "PvP only in designated areas or with consent.",
      "Respect claimed land and protected areas.",
      "No scamming in trades or transactions.",
      "Report suspicious behavior to staff.",
    ],
  },
  {
    icon: Coins,
    title: "Economy Rules",
    color: "text-emerald-500",
    rules: [
      "No real-money trading (RMT) for in-game items.",
      "No exploiting economy bugs or glitches.",
      "Fair pricing in player shops.",
      "No money duplication or exploitation.",
      "All trades must be honored once agreed upon.",
    ],
  },
  {
    icon: Bug,
    title: "Bug Reporting",
    color: "text-purple-500",
    rules: [
      "Report all bugs immediately to staff.",
      "Do not share or exploit discovered bugs.",
      "Provide detailed reproduction steps.",
      "Screenshots and videos are appreciated.",
      "You may receive rewards for valid bug reports.",
    ],
  },
];

const Rules = () => {
  return (
    <>
      <Helmet>
        <title>Server Rules - Z-Craft Minecraft Server</title>
        <meta 
          name="description" 
          content="Read the official rules for Z-Craft Minecraft server. Know what's expected to ensure a fair and enjoyable experience for everyone." 
        />
        <meta name="keywords" content="rules, guidelines, Z-Craft, Minecraft server, community guidelines" />
        <link rel="canonical" href="https://z-craft.xyz/rules" />
      </Helmet>

      <Layout>
        <div className="min-h-screen py-12">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Server <span className="text-gradient">Rules</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Please read and follow these rules to ensure a fair and enjoyable 
                experience for everyone on Z-Craft.
              </p>
            </div>

            {/* Warning Banner */}
            <div className="max-w-4xl mx-auto mb-12 animate-slide-up">
              <div className="flex items-start gap-4 p-6 rounded-xl bg-destructive/10 border border-destructive/20">
                <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-destructive mb-1">Important Notice</h3>
                  <p className="text-sm text-muted-foreground">
                    Breaking these rules may result in warnings, temporary bans, or permanent bans 
                    depending on the severity. Ignorance of the rules is not an excuse.
                  </p>
                </div>
              </div>
            </div>

            {/* Rules Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {ruleCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Card 
                    key={category.title}
                    className="bg-card/50 border-border/50 shadow-soft animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-muted ${category.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {category.rules.map((rule, ruleIndex) => (
                          <li 
                            key={ruleIndex}
                            className="flex items-start gap-3 text-sm"
                          >
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                              {ruleIndex + 1}
                            </span>
                            <span className="text-muted-foreground">{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Footer Message */}
            <div className="max-w-4xl mx-auto mt-12 text-center animate-fade-in">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Heart className="h-4 w-4 text-primary" />
                <p>Thanks for being part of the Z-Craft community!</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Rules;
