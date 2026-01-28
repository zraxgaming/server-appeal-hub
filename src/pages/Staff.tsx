import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Shield, Star, Users } from "lucide-react";

const staffMembers = [
  {
    name: "ZCraftOwner",
    role: "Owner",
    roleColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    icon: Crown,
    description: "Server founder and lead developer.",
    discord: "zcraftowner",
  },
  {
    name: "AdminSteve",
    role: "Administrator",
    roleColor: "bg-red-500/10 text-red-500 border-red-500/20",
    icon: Shield,
    description: "Server management and community lead.",
    discord: "adminsteve",
  },
  {
    name: "ModAlex",
    role: "Senior Moderator",
    roleColor: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    icon: Star,
    description: "Player support and rule enforcement.",
    discord: "modalex",
  },
  {
    name: "HelperJohn",
    role: "Moderator",
    roleColor: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    icon: Users,
    description: "Community assistance and moderation.",
    discord: "helperjohn",
  },
  {
    name: "ModSarah",
    role: "Moderator",
    roleColor: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    icon: Users,
    description: "Event coordinator and player support.",
    discord: "modsarah",
  },
  {
    name: "HelperMike",
    role: "Helper",
    roleColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    icon: Users,
    description: "New player assistance and guidance.",
    discord: "helpermike",
  },
];

const Staff = () => {
  return (
    <>
      <Helmet>
        <title>Staff Team - Z-Craft Minecraft Server</title>
        <meta 
          name="description" 
          content="Meet the dedicated staff team of Z-Craft Minecraft server. Our team is here to help and ensure a great gaming experience for everyone." 
        />
        <meta name="keywords" content="staff, team, moderators, admins, Z-Craft, Minecraft server" />
        <link rel="canonical" href="https://z-craft.xyz/staff" />
      </Helmet>

      <Layout>
        <div className="min-h-screen py-12">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Our <span className="text-gradient">Staff Team</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Meet the dedicated team members who keep Z-Craft running smoothly 
                and ensure a great experience for everyone.
              </p>
            </div>

            {/* Staff Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {staffMembers.map((member, index) => {
                const Icon = member.icon;
                return (
                  <Card 
                    key={member.name}
                    className="group bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover-lift animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6 text-center">
                      {/* Avatar Placeholder */}
                      <div className="relative w-24 h-24 mx-auto mb-4">
                        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20 group-hover:border-primary/40 transition-colors">
                          <Icon className="h-10 w-10 text-primary" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-card border border-border">
                          <div className="w-3 h-3 rounded-full bg-success" />
                        </div>
                      </div>

                      {/* Name & Role */}
                      <h3 className="font-bold text-lg mb-2">{member.name}</h3>
                      <Badge 
                        variant="outline" 
                        className={`mb-3 ${member.roleColor}`}
                      >
                        {member.role}
                      </Badge>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground mb-3">
                        {member.description}
                      </p>

                      {/* Discord */}
                      <p className="text-xs text-muted-foreground">
                        Discord: <span className="font-mono">@{member.discord}</span>
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Join Staff CTA */}
            <div className="max-w-2xl mx-auto mt-16 text-center animate-fade-in">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-3">Want to Join Our Team?</h3>
                  <p className="text-muted-foreground mb-4">
                    We're always looking for dedicated players to help us maintain 
                    and grow the Z-Craft community. Join our Discord to apply!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Requirements: Active player, 16+, Discord account, good reputation
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Staff;
