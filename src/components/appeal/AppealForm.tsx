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
import { toast } from "@/hooks/use-toast";

const appealSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(16, "Username must be less than 16 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  discordTag: z.string()
    .min(2, "Discord tag is required")
    .max(100, "Discord tag is too long"),
  email: z.string()
    .email("Please enter a valid email address"),
  banReason: z.string()
    .min(1, "Please select a ban reason"),
  appealReason: z.string()
    .min(50, "Please provide at least 50 characters explaining your appeal")
    .max(2000, "Appeal reason must be less than 2000 characters"),
  additionalInfo: z.string()
    .max(1000, "Additional info must be less than 1000 characters")
    .optional(),
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
      discordTag: "",
      email: "",
      banReason: "",
      appealReason: "",
      additionalInfo: "",
    },
  });

  const onSubmit = async (data: AppealFormValues) => {
    setIsSubmitting(true);

    try {
      // Save to localStorage - cast to required type after zod validation
      const savedAppeal = saveAppeal(data as Omit<import("@/lib/appeal-storage").AppealData, 'id' | 'submittedAt' | 'status'>);

      // Try webhook (optional, will not fail if webhook is not configured)
      await submitToWebhook(savedAppeal);

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
      <Card className="max-w-2xl mx-auto bg-card/50 border-primary/20 animate-scale-in">
        <CardContent className="pt-12 pb-12 text-center">
          <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-6">
            <CheckCircle className="h-12 w-12" />
          </div>
          <h3 className="text-2xl font-bold mb-3">Appeal Submitted Successfully!</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Thank you for submitting your appeal. Our staff team will review your case 
            and get back to you within 48-72 hours.
          </p>
          <Button onClick={() => setIsSuccess(false)} variant="outline">
            Submit Another Appeal
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto bg-card/50 border-border/50 shadow-soft">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Ban Appeal Form</CardTitle>
        <CardDescription>
          Fill out the form below to submit your ban appeal. Be honest and detailed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="animate-fade-in">
                  <FormLabel>Minecraft Username</FormLabel>
                  <FormControl>
                    <Input placeholder="YourUsername" {...field} />
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
                name="discordTag"
                render={({ field }) => (
                  <FormItem className="animate-fade-in stagger-1">
                    <FormLabel>Discord Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="animate-fade-in stagger-2">
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
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
                  <FormLabel>Ban Reason</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
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
                  <FormLabel>Why Should We Unban You?</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Explain why you believe you should be unbanned. Be honest and take responsibility if needed..."
                      className="min-h-[150px] resize-y"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Minimum 50 characters. Be honest and explain your situation.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Additional Info */}
            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem className="animate-fade-in stagger-5">
                  <FormLabel>Additional Information (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any additional context or information you'd like to provide..."
                      className="min-h-[100px] resize-y"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Info Box */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border/50">
              <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                Appeals are reviewed within 48-72 hours. Submitting false information 
                or multiple appeals may result in your appeal being denied automatically.
              </p>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              size="lg" 
              className="w-full gap-2 bg-gradient-primary hover:opacity-90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
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
