import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CTASection } from "@/components/home/CTASection";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Z-Craft - Premium Minecraft Survival Server</title>
        <meta 
          name="description" 
          content="Join Z-Craft, the ultimate Minecraft survival experience with custom enchants, economy, clans, and an amazing community. Play now at play.zcraft.xyz" 
        />
        <meta name="keywords" content="Minecraft, server, survival, Z-Craft, custom enchants, economy, gaming" />
        <link rel="canonical" href="https://z-craft.xyz" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Z-Craft - Premium Minecraft Survival Server" />
        <meta property="og:description" content="Join Z-Craft, the ultimate Minecraft survival experience with custom enchants, economy, and clans." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://z-craft.xyz" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Z-Craft - Premium Minecraft Survival Server" />
        <meta name="twitter:description" content="Join Z-Craft, the ultimate Minecraft survival experience." />
      </Helmet>

      <Layout>
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;
