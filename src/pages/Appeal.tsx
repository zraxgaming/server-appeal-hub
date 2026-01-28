import { Layout } from "@/components/layout/Layout";
import { AppealForm } from "@/components/appeal/AppealForm";
import { Helmet } from "react-helmet-async";
import { AlertCircle, Shield } from "lucide-react";

const Appeal = () => {
  return (
    <>
      <Helmet>
        <title>Ban Appeal - Z-Craft Minecraft Server</title>
        <meta 
          name="description" 
          content="Submit a ban appeal for Z-Craft Premium Minecraft server. Our experienced staff team will fairly review your case and provide a timely response." 
        />
        <meta name="keywords" content="ban appeal, unban, Z-Craft, Minecraft server, appeal form, fair review" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://appeal.z-craft.xyz" />
        
        <meta property="og:title" content="Ban Appeal - Z-Craft Minecraft Server" />
        <meta property="og:description" content="Submit a professional ban appeal for Z-Craft. Fair review process with expert staff." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://appeal.z-craft.xyz" />
        <meta property="og:image" content="https://appeal.z-craft.xyz/og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ban Appeal - Z-Craft Minecraft Server" />
        <meta name="twitter:description" content="Submit your ban appeal for Z-Craft" />
        <meta name="theme-color" content="hsl(120, 60%, 42%)" />

        {/* JSON-LD structured data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Z-Craft Ban Appeal System",
            "description": "Official ban appeal system for Z-Craft Minecraft server",
            "url": "https://appeal.z-craft.xyz",
            "applicationCategory": "GameApplication",
            "inLanguage": "en-US"
          })}
        </script>
      </Helmet>

      <Layout>
        <div className="relative min-h-[calc(100vh-8rem)] py-12 overflow-hidden">
          {/* Dotted Glow Background */}
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
            
            {/* Dotted Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)`,
                backgroundSize: '50px 50px',
              }}
            />
            
            {/* Glow Orbs */}
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float opacity-20" />
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse opacity-20" />
            <div className="absolute top-1/2 right-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float opacity-15" style={{ animationDelay: '2s' }} />
          </div>

          {/* Content Container */}
          <div className="relative z-10 flex flex-col py-12">
            {/* Banner */}
            <div className="w-full mb-12 animate-fade-in px-4 group">
              <div className="container mx-auto">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-primary/30 group-hover:shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 z-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img 
                    src="/banner.png" 
                    alt="Z-Craft Ban Appeal Banner" 
                    className="w-full max-h-[250px] object-contain rounded-2xl transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Form Container */}
            <div className="container mx-auto px-4 flex-1">
              <div className="animate-slide-up max-w-3xl mx-auto relative">
                {/* Glow Background for Form */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Form Wrapper */}
                <div className="relative bg-card/40 backdrop-blur-xl border border-border/30 rounded-2xl p-8 md:p-12 shadow-xl transition-all duration-500 hover:border-primary/30 hover:shadow-2xl group">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="mb-8 animate-fade-in">
                      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                        Ban Appeal
                      </h1>
                    </div>
                    
                    <AppealForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Appeal;
