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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Send, CheckCircle, AlertCircle } from "lucide-react";
import { saveAppeal, submitToWebhook } from "@/lib/appeal-storage";
import { saveAppealToSupabase, markWebhookSent } from "@/integrations/supabase/appeals";
import { toast } from "@/hooks/use-toast";

const appealSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(16, "Username must be less than 16 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  discordId: z.string()
    .regex(/^\d+$/, "Discord ID must contain only numbers")
    .min(1, "Discord ID is required"),
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
      // Save to Supabase and localStorage
      const savedAppeal = await saveAppeal(data as Omit<import("@/lib/appeal-storage").AppealData, 'id' | 'submittedAt' | 'status'>);

      // Try webhook (optional, will not fail if webhook is not configured)
      const webhookSuccess = await submitToWebhook(savedAppeal);
      
      // Mark webhook as sent in Supabase if successful
      if (supabaseAppeal && webhookSuccess) {
        await markWebhookSent(supabaseAppeal.id);
      }

      setIsSuccess(true);
      toast({
        title: "Appeal Submitted!",
        description: "Your appeal has been submitted successfully. We'll review it shortly.",
      });

      form.reset();
    } catch (error) {
      console.error("Error submitting appeal:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your appeal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="max-w-2xl mx-auto bg-card border-primary/30 animate-scale-in shadow-lg">
        <CardContent className="pt-16 pb-16 text-center">
          <div className="inline-flex p-5 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 text-primary mb-8 animate-bounce-in">
            <CheckCircle className="h-16 w-16" />
          </div>
          <h3 className="text-3xl font-bold mb-4">Appeal Submitted Successfully!</h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto text-lg leading-relaxed">
            Thank you for submitting your appeal. Our experienced staff team will carefully review your case 
            and get back to you within <span className="font-semibold text-foreground">48-72 hours</span>.
          </p>
          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">
              📧 We'll contact you via the email you provided
            </p>
            <Button onClick={() => setIsSuccess(false)} variant="outline" className="w-full hover-glow">
              Submit Another Appeal
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto bg-card border-border/50 shadow-lg animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-t-lg">
        <CardTitle className="text-3xl bg-gradient-primary bg-clip-text text-transparent">Ban Appeal Form</CardTitle>
        <CardDescription className="text-base mt-2">
          Submit your appeal below. Our team will provide a fair and thorough review.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="animate-fade-in">
                  <FormLabel className="text-base font-semibold">Minecraft Username</FormLabel>
                  <FormControl>
                    <Input placeholder="YourUsername" className="h-11 text-base" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your exact Minecraft username (case-sensitive)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Discord & Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="discordId"
                render={({ field }) => (
                  <FormItem className="animate-fade-in stagger-1">
                    <FormLabel>Discord User ID</FormLabel>
                    <FormControl>
                      <Input placeholder="123456789012345678" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your numeric Discord ID (right-click user in Discord to copy)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="animate-fade-in stagger-2">
                    <FormLabel className="text-base font-semibold">Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" className="h-11 text-base" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Ban Reason */}
            <FormField
              control={form.control}
              name="banReason"
              render={({ field }) => (
                <FormItem className="animate-fade-in stagger-3">
                  <FormLabel className="text-base font-semibold">Ban Reason</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-11 text-base">
                        <SelectValue placeholder="Select the reason for your ban" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {banReasons.map((reason) => (
                        <SelectItem key={reason.value} value={reason.value}>
                          {reason.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Appeal Reason */}
            <FormField
              control={form.control}
              name="appealReason"
              render={({ field }) => (
                <FormItem className="animate-fade-in stagger-4">
                  <FormLabel className="text-base font-semibold">Why Should We Unban You?</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Explain why you believe you should be unbanned. Be honest and take responsibility if needed..."
                      className="min-h-[150px] resize-y text-base"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Minimum 50 characters. Be honest and explain your situation clearly.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Additional Info */}
            {/* Removed - additionalInfo field */}

            {/* Info Box */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">Important:</span> Appeals are reviewed within 48-72 hours. Submitting false information 
                or multiple appeals may result in automatic denial.
              </p>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              size="lg" 
              className="w-full gap-2 text-base h-12 bg-gradient-primary hover:shadow-glow font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Submit Appeal
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
