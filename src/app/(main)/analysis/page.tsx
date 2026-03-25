"use client";

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { analyzePrescriptionReport, AnalyzePrescriptionReportOutput } from '@/ai/flows/analyze-prescription-report';
import { useToast } from "@/hooks/use-toast";
import { ProcessingLoader } from '@/components/processing-loader';
import { ReportDisplay } from '@/components/report-display';
import { Button } from '@/components/ui/button';
import { Save, Languages } from 'lucide-react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { AiAssistant } from '@/components/ai-assistant';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/header';

type Language = "en" | "hi";

export default function AnalysisPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [report, setReport] = useState<AnalyzePrescriptionReportOutput | null>(null);
  const [language, setLanguage] = useState<Language>("en");
  const [prescriptionDataUri, setPrescriptionDataUri] = useState<string | null>(null);
  const [locker, setLocker] = useLocalStorage<AnalyzePrescriptionReportOutput[]>("health-locker", []);

  useEffect(() => {
    const dataUri = sessionStorage.getItem('prescriptionDataUri');
    if (!dataUri) {
      router.replace('/');
      return;
    }
    setPrescriptionDataUri(dataUri);
  }, [router]);

  useEffect(() => {
    if (prescriptionDataUri) {
      setIsLoading(true);
      analyzePrescriptionReport({ prescriptionDataUri, language })
        .then(setReport)
        .catch(err => {
          console.error(err);
          toast({
            variant: "destructive",
            title: "Analysis Failed",
            description: "We couldn't analyze your prescription. Please try again with a clearer image.",
          });
          router.push('/');
        })
        .finally(() => setIsLoading(false));
    }
  }, [prescriptionDataUri, language, toast, router]);

  const handleSaveToLocker = () => {
    if (report) {
      // Avoid duplicates
      if (!locker.some(item => item.summary === report.summary)) {
        setLocker([...locker, { ...report, savedAt: new Date().toISOString() }]);
        toast({
          title: "Saved!",
          description: "Your prescription report has been saved to your Health Locker.",
        });
      } else {
        toast({
          title: "Already Saved",
          description: "This report is already in your Health Locker.",
        });
      }
    }
  };
  
  const toggleLanguage = () => {
    setLanguage(prev => (prev === "en" ? "hi" : "en"));
  };

  const assistantData = useMemo(() => {
    if (!report) return null;
    return {
      summary: report.summary,
      diagnosis: report.diagnosis,
      medicationSchedule: report.medicationSchedule,
      potentialSideEffects: report.sideEffects.split('. '),
      followUpChecklist: report.followUpChecklist.split('\n'),
    };
  }, [report]);

  return (
    <>
      <Header />
      <div className="container mx-auto py-8 px-4">
        {isLoading && <ProcessingLoader />}
        {!isLoading && report && (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h1 className="text-3xl font-bold tracking-tight font-headline">Analysis Report</h1>
              <div className="flex gap-2">
                <Button variant="outline" onClick={toggleLanguage}>
                  <Languages className="mr-2 h-4 w-4" />
                  {language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
                </Button>
                <Button onClick={handleSaveToLocker}>
                  <Save className="mr-2 h-4 w-4" />
                  Save to Locker
                </Button>
              </div>
            </div>
            <ReportDisplay report={report} />
            {assistantData && <AiAssistant analyzedData={assistantData} />}
          </>
        )}
        {!isLoading && !report && (
          <Card>
              <CardContent className="p-8 text-center">
                  <p>Could not load analysis report. Please try uploading again.</p>
                  <Button onClick={() => router.push('/')} className="mt-4">Go Home</Button>
              </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
