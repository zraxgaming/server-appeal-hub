import { Layout } from "@/components/layout/Layout";
import { AppealForm } from "@/components/appeal/AppealForm";
import { Helmet } from "react-helmet-async";

const Appeal = () => {
  return (
    <>
      <Helmet>
        <title>Ban Appeal - Z-Craft</title>
        <meta 
          name="description" 
          content="Submit a ban appeal for Z-Craft Minecraft server. If you believe your ban was unjust, we'll review your case." 
        />
        <meta name="keywords" content="ban appeal, unban, Z-Craft, Minecraft server" />
        <link rel="canonical" href="https://appeal.z-craft.xyz" />
        
        <meta property="og:title" content="Ban Appeal - Z-Craft" />
        <meta property="og:description" content="Submit a ban appeal for Z-Craft Minecraft server." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Layout>
        <div className="min-h-[calc(100vh-8rem)] flex items-center py-12">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                Ban Appeal
              </h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Submit your appeal below and our staff will review your case.
              </p>
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
