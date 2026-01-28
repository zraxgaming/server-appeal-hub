import { Layout } from "@/components/layout/Layout";
import { AppealForm } from "@/components/appeal/AppealForm";
import { Helmet } from "react-helmet-async";
import { FileText, Clock, Shield, AlertTriangle } from "lucide-react";

const guidelines = [
  {
    icon: FileText,
    title: "Be Honest",
    description: "Provide accurate information about your ban and circumstances.",
  },
  {
    icon: Clock,
    title: "Be Patient",
    description: "Appeals are reviewed within 48-72 hours by our staff team.",
  },
  {
    icon: Shield,
    title: "One Chance",
    description: "If approved, any future violations may result in a permanent ban.",
  },
  {
    icon: AlertTriangle,
    title: "No Spam",
    description: "Submitting multiple appeals will result in automatic denial.",
  },
];

const Appeal = () => {
  return (
    <>
      <Helmet>
        <title>Ban Appeal - Z-Craft Minecraft Server</title>
        <meta 
          name="description" 
          content="Submit a ban appeal for Z-Craft Minecraft server. If you believe your ban was unjust or you've learned from your mistakes, we'll review your case." 
        />
        <meta name="keywords" content="ban appeal, unban, Z-Craft, Minecraft server, appeal form" />
        <link rel="canonical" href="https://z-craft.xyz/appeal" />
        
        <meta property="og:title" content="Ban Appeal - Z-Craft Minecraft Server" />
        <meta property="og:description" content="Submit a ban appeal for Z-Craft Minecraft server." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Layout>
        <div className="min-h-screen py-12">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Ban <span className="text-gradient">Appeal</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Everyone deserves a second chance. Submit your appeal below and 
                our staff team will review your case.
              </p>
            </div>

            {/* Guidelines */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
              {guidelines.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={item.title}
                    className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border/50 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{item.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Form */}
            <div className="animate-slide-up">
              <AppealForm />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Appeal;
