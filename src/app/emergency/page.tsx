"use client";

import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { emergencyGuidance, EmergencyGuidanceOutput } from "@/ai/flows/emergency-guidance";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, Copy, Headphones, Loader2, MessageSquare, Send, Siren } from 'lucide-react';
import Link from 'next/link';

const formSchema = z.object({
  emergencyDescription: z.string().min(10, { message: "Please describe the emergency in more detail." }),
});

export default function EmergencyPage() {
  const [guidance, setGuidance] = useState<EmergencyGuidanceOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { emergencyDescription: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setGuidance(null);
    try {
      const result = await emergencyGuidance({
        emergencyDescription: values.emergencyDescription,
        language: "English",
      });
      setGuidance(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Guidance Error",
        description: "Could not get emergency guidance. Please call emergency services directly.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard!" });
  }

  return (
    <div className="min-h-screen bg-destructive text-destructive-foreground flex flex-col items-center justify-center p-4">
      <Link href="/" className="absolute top-4 left-4 text-destructive-foreground/80 hover:text-destructive-foreground transition">
        &larr; Back to MediCare Home
      </Link>
      <Card className="w-full max-w-2xl bg-background/90 text-foreground shadow-2xl">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <Siren className="h-12 w-12 text-destructive"/>
            </div>
          <CardTitle className="text-3xl text-destructive">Emergency Help Mode</CardTitle>
          <CardDescription>
            Describe your emergency below for AI-powered immediate guidance.
            <br/>
            <strong>If this is a life-threatening situation, call your local emergency number immediately.</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!guidance ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="emergencyDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Describe the Situation</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 'Someone is unconscious and not breathing', 'I have a deep cut that is bleeding a lot'"
                          className="min-h-[120px] text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="w-full bg-destructive hover:bg-destructive/90" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
                  Get Immediate Advice
                </Button>
              </form>
            </Form>
          ) : (
            <div className="space-y-6">
                <Card className="bg-red-100 dark:bg-red-900/50 border-destructive">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><AlertTriangle/>Immediate Advice</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg font-bold">{guidance.summary}</p>
                        <p className="mt-2">{guidance.advice}</p>
                    </CardContent>
                </Card>

                {guidance.audioAdvice && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Headphones/>Audio Guidance</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <audio controls src={guidance.audioAdvice} className="w-full">
                                Your browser does not support the audio element.
                            </audio>
                        </CardContent>
                    </Card>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><MessageSquare/>Emergency Messages</CardTitle>
                        <CardDescription>Quickly copy and send these messages.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {guidance.emergencyMessages.map((msg, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                                <p className="flex-1 mr-2">{msg}</p>
                                <Button size="icon" variant="ghost" onClick={() => copyToClipboard(msg)}>
                                    <Copy className="h-4 w-4"/>
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                
                <Button size="lg" variant="outline" className="w-full" onClick={() => setGuidance(null)}>
                    Start Over
                </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
