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
        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .dotted-bg-light {
            background-image: 
              radial-gradient(circle, #d1d5db 1px, transparent 1px);
            background-size: 40px 40px;
            background-position: 0 0;
          }
          
          .dotted-bg-dark {
            background-image: 
              radial-gradient(circle, #374151 1px, transparent 1px);
            background-size: 40px 40px;
            background-position: 0 0;
          }
          
          .fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
          }
          
          .mesh-gradient-light {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
            opacity: 0.08;
          }
          
          .mesh-gradient-dark {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
            opacity: 0.15;
          }
        `}</style>

        <div className="relative min-h-[calc(100vh-8rem)] py-8 sm:py-12 md:py-16 overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300">
          {/* Animated Background */}
          <div className="absolute inset-0 dotted-bg-light dark:dotted-bg-dark opacity-40 dark:opacity-30"></div>
          
          {/* Gradient mesh overlay */}
          <div className="absolute top-0 right-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 mesh-gradient-light dark:mesh-gradient-dark rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 mesh-gradient-light dark:mesh-gradient-dark rounded-full blur-3xl"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Banner */}
            <div className="mb-10 sm:mb-14 md:mb-16 fade-in-up">
              <img 
                src="/banner.png" 
                alt="Z-Craft Ban Appeal Banner" 
                className="w-full max-h-[180px] sm:max-h-[220px] md:max-h-[250px] object-contain rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg sm:shadow-xl md:shadow-2xl hover:shadow-2xl dark:hover:shadow-2xl/50 transition-shadow duration-500"
              />
            </div>

            {/* Form Section */}
            <div className="max-w-3xl md:max-w-5xl mx-auto fade-in-up" style={{ animationDelay: '0.2s' }}>
              <AppealForm />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Appeal;
