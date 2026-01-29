import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Send, CheckCircle } from "lucide-react";
import { submitToWebhook } from "@/lib/appeal-storage";
import { toast } from "@/hooks/use-toast";

const appealSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(16, "Username must be less than 16 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  discordId: z.string()
    .min(2, "Discord tag is required")
    .max(100, "Discord tag is too long"),
  email: z.string()
    .email("Please enter a valid email address"),
  banReason: z.string()
    .min(1, "Please select a ban reason"),
  appealReason: z.string()
    .min(50, "Please provide at least 50 characters explaining your appeal")
    .max(2000, "Appeal reason must be less than 2000 characters"),
});

type AppealFormValues = z.infer<typeof appealSchema>;

const banReasons = [
  { value: "hacking", label: "Hacking / Cheating" },
  { value: "toxicity", label: "Toxicity / Harassment" },
  { value: "scamming", label: "Scamming" },
  { value: "exploiting", label: "Bug Exploiting" },
  { value: "advertising", label: "Advertising" },
  { value: "inappropriate", label: "Inappropriate Content" },
  { value: "ban-evasion", label: "Ban Evasion" },
  { value: "other", label: "Other" },
];

const AnimationStyles = () => (
  <style>{`
    @keyframes slideUpIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes successPop {
      0% { transform: scale(0.5); opacity: 0; }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); opacity: 1; }
    }
    .slide-up { animation: slideUpIn 0.5s ease-out forwards; }
    .scale-in { animation: scaleIn 0.5s ease-out forwards; }
    .success-pop { animation: successPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }
    .input-focus { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
    .input-focus:focus-within { box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
    .gradient-border {
      position: relative;
      border: 1px solid transparent;
      background: linear-gradient(white, white) padding-box,
                  linear-gradient(135deg, #3b82f6, #8b5cf6, #d946ef) border-box;
    }
    .gradient-border-dark {
      position: relative;
      border: 1px solid transparent;
      background: linear-gradient(#111827, #111827) padding-box,
                  linear-gradient(135deg, #3b82f6, #8b5cf6, #d946ef) border-box;
    }
    .card-hover {
      transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
    }
    .card-hover:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.1);
    }
    @media (max-width: 640px) {
      .card-hover:hover {
        transform: translateY(-2px);
      }
    }
    .dark .gradient-border-dark {
      border: 1px solid transparent;
      background: linear-gradient(#111827, #111827) padding-box,
                  linear-gradient(135deg, #3b82f6, #8b5cf6, #d946ef) border-box;
    }
  `}</style>
);


export const AppealForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<AppealFormValues>({
    resolver: zodResolver(appealSchema),
    defaultValues: {
      username: "",
      discordId: "",
      email: "",
      banReason: "",
      appealReason: "",
    },
  });

  const onSubmit = async (data: AppealFormValues) => {
    setIsSubmitting(true);

    try {
      // Create appeal object with required fields
      const appealData: import("@/lib/appeal-storage").AppealData = {
        id: `appeal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        username: data.username,
        discordId: data.discordId,
        email: data.email,
        banReason: data.banReason,
        appealReason: data.appealReason,
        submittedAt: new Date().toISOString(),
        status: 'pending',
      };

      // Submit directly to webhook
      await submitToWebhook(appealData);

      setIsSuccess(true);
      toast({
        title: "✅ Appeal Submitted!",
        description: "Your appeal has been sent to the team.",
      });

      form.reset();
    } catch (error) {
      console.error("Error submitting appeal:", error);
      toast({
        title: "❌ Submission Failed",
        description: error instanceof Error ? error.message : "There was an error submitting your appeal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <>
        <style>{`
          @keyframes successPop {
            0% {
              transform: scale(0.5);
              opacity: 0;
            }
            50% {
              transform: scale(1.05);
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          .success-pop { animation: successPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }
        `}</style>
        <div className="text-center py-12 sm:py-16 md:py-20 success-pop">
          <div className="inline-flex p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 mb-6 sm:mb-8 border-2 border-emerald-200 dark:border-emerald-700/50 shadow-lg sm:shadow-xl md:shadow-2xl">
            <CheckCircle className="h-20 sm:h-24 md:h-28 w-20 sm:w-24 md:w-28 text-emerald-600 dark:text-emerald-400 stroke-[1.5]" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-950 dark:text-white mb-3 sm:mb-4 tracking-tight">
            Appeal Submitted
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 max-w-xl mx-auto text-lg sm:text-xl font-semibold px-4">
            Thank you for submitting your appeal
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-8 sm:mb-12 max-w-xl mx-auto text-base sm:text-lg leading-relaxed px-4">
            We'll carefully review your case and contact you via Discord within 48-72 hours
          </p>
          <Button 
            onClick={() => setIsSuccess(false)} 
            className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 dark:from-emerald-500 dark:to-green-500 dark:hover:from-emerald-600 dark:hover:to-green-600 text-white font-bold px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg sm:rounded-xl transform hover:scale-105"
          >
            Submit Another Appeal
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <AnimationStyles />
      
      <div className="w-full">
        {/* Form Header */}
        <div className="mb-8 sm:mb-10 md:mb-16 slide-up text-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-gray-950 dark:text-white mb-2 sm:mb-3 md:mb-4 tracking-tighter">
            Ban Appeal
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Submit your case for review. We take every appeal seriously.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-900 backdrop-blur-md gradient-border dark:gradient-border-dark rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-8 shadow-lg dark:shadow-2xl dark:shadow-blue-500/10 card-hover scale-in border-2 dark:border-blue-500/20">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6 md:space-y-8">
              {/* Username */}
              <div className="slide-up" style={{ animationDelay: '0.1s' }}>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white mb-2 block uppercase tracking-wider">
                        Minecraft Username
                      </FormLabel>
                      <FormControl>
                        <div className="input-focus">
                          <Input 
                            placeholder="Enter your username" 
                            className="h-10 sm:h-11 md:h-12 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-medium placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 shadow-sm focus:shadow-md focus:border-blue-400 dark:focus:border-blue-500 focus:ring-0 transition-all duration-300 rounded-lg sm:rounded-xl text-sm sm:text-base"
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 dark:text-red-400 text-xs mt-1" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Discord & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-8">
                <div className="slide-up" style={{ animationDelay: '0.2s' }}>
                  <FormField
                    control={form.control}
                    name="discordId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white mb-2 block uppercase tracking-wider">
                          Discord Tag
                        </FormLabel>
                        <FormControl>
                          <div className="input-focus">
                            <Input 
                              placeholder="username#0000" 
                              className="h-10 sm:h-11 md:h-12 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-medium placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 shadow-sm focus:shadow-md focus:border-blue-400 dark:focus:border-blue-500 focus:ring-0 transition-all duration-300 rounded-lg sm:rounded-xl text-sm sm:text-base"
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormDescription className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                          We'll contact you here
                        </FormDescription>
                        <FormMessage className="text-red-500 dark:text-red-400 text-xs mt-1" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="slide-up" style={{ animationDelay: '0.3s' }}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white mb-2 block uppercase tracking-wider">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <div className="input-focus">
                            <Input 
                              type="email" 
                              placeholder="you@example.com" 
                              className="h-10 sm:h-11 md:h-12 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-medium placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 shadow-sm focus:shadow-md focus:border-blue-400 dark:focus:border-blue-500 focus:ring-0 transition-all duration-300 rounded-lg sm:rounded-xl text-sm sm:text-base"
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500 dark:text-red-400 text-xs mt-1" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Ban Reason */}
              <div className="slide-up" style={{ animationDelay: '0.4s' }}>
                <FormField
                  control={form.control}
                  name="banReason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white mb-2 block uppercase tracking-wider">
                        Ban Reason
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <div className="input-focus">
                            <SelectTrigger className="h-10 sm:h-11 md:h-12 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-medium bg-white dark:bg-gray-800 shadow-sm focus:shadow-md focus:border-blue-400 dark:focus:border-blue-500 focus:ring-0 transition-all duration-300 rounded-lg sm:rounded-xl text-sm sm:text-base">
                              <SelectValue placeholder="Select a reason" />
                            </SelectTrigger>
                          </div>
                        </FormControl>
                        <SelectContent className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl shadow-lg text-gray-900 dark:text-white">
                          {banReasons.map((reason) => (
                            <SelectItem key={reason.value} value={reason.value} className="font-medium text-gray-900 dark:text-white cursor-pointer text-sm sm:text-base">
                              {reason.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500 dark:text-red-400 text-xs mt-1" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Appeal Reason */}
              <div className="slide-up" style={{ animationDelay: '0.5s' }}>
                <FormField
                  control={form.control}
                  name="appealReason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white mb-2 block uppercase tracking-wider">
                        Your Appeal
                      </FormLabel>
                      <FormControl>
                        <div className="input-focus">
                          <Textarea 
                            placeholder="Explain your situation and why you believe you should be unbanned..."
                            className="min-h-[100px] sm:min-h-[120px] md:min-h-[150px] border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-medium placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 shadow-sm focus:shadow-md focus:border-blue-400 dark:focus:border-blue-500 focus:ring-0 transition-all duration-300 resize-none rounded-lg sm:rounded-xl p-3 text-sm sm:text-base"
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormDescription className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                        Minimum 50 characters. Be honest and thorough.
                      </FormDescription>
                      <FormMessage className="text-red-500 dark:text-red-400 text-xs mt-1" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 sm:pt-5 md:pt-6 slide-up" style={{ animationDelay: '0.6s' }}>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full h-10 sm:h-11 md:h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 dark:from-blue-500 dark:via-purple-500 dark:to-pink-500 dark:hover:from-blue-600 dark:hover:via-purple-600 dark:hover:to-pink-600 text-white font-bold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 rounded-lg sm:rounded-xl"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 sm:h-5 w-4 sm:w-5 animate-spin mr-2" />
                      <span className="hidden sm:inline">Submitting...</span>
                      <span className="sm:hidden">Submitting</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                      <span className="hidden sm:inline">Submit Appeal</span>
                      <span className="sm:hidden">Submit</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Info Section */}
        <div className="mt-8 sm:mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 px-4 sm:px-0">
          <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-8 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 shadow-md dark:shadow-lg dark:shadow-blue-500/5 card-hover slide-up" style={{ animationDelay: '0.7s' }}>
            <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 md:mb-4">✅</div>
            <h3 className="font-bold text-gray-950 dark:text-white mb-2 text-base sm:text-lg md:text-xl">Fair Review</h3>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-400 leading-relaxed">Every appeal is carefully reviewed by our experienced admin team with fair judgment.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-8 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 shadow-md dark:shadow-lg dark:shadow-blue-500/5 card-hover slide-up" style={{ animationDelay: '0.8s' }}>
            <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 md:mb-4">⚡</div>
            <h3 className="font-bold text-gray-950 dark:text-white mb-2 text-base sm:text-lg md:text-xl">Quick Response</h3>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-400 leading-relaxed">Expect a detailed response within 48-72 hours via Discord DM or email.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-8 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 shadow-md dark:shadow-lg dark:shadow-blue-500/5 card-hover slide-up" style={{ animationDelay: '0.9s' }}>
            <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 md:mb-4">💎</div>
            <h3 className="font-bold text-gray-950 dark:text-white mb-2 text-base sm:text-lg md:text-xl">Be Honest</h3>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-400 leading-relaxed">Genuine honesty and sincere reflection will significantly strengthen your appeal.</p>
          </div>
        </div>
      </div>
    </>
  );
};
