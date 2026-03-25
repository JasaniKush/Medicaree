"use client";

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { analyzePrescriptionReport, AnalyzePrescriptionReportOutput } from '@/ai/flows/analyze-prescription-report';
import { useToast } from "@/hooks/use-toast";
import { ProcessingLoader } from '@/components/processing-loader';
import { ReportDisplay } from '@/components/report-display';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { AiAssistant } from '@/components/ai-assistant';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/header';
import type { StoredReport } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Language = "en" | "hi" | "gu";

export default function AnalysisPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [report, setReport] = useState<AnalyzePrescriptionReportOutput | null>(null);
  const [language, setLanguage] = useState<Language>("en");
  const [age, setAge] = useState<string>('');
  const [prescriptionDataUri, setPrescriptionDataUri] = useState<string | null>(null);
  const [locker, setLocker] = useLocalStorage<StoredReport[]>("health-locker", []);

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
      analyzePrescriptionReport({ 
        prescriptionDataUri, 
        language, 
        age: age ? parseInt(age, 10) : undefined 
      })
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
  }, [prescriptionDataUri, language, age, toast, router]);

  const handleSaveToLocker = () => {
    if (report) {
      // Avoid duplicates
      if (!locker.some(item => item.summary === report.summary)) {
        const newReport: StoredReport = {
          ...report,
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          savedAt: new Date().toISOString(),
          type: 'prescription'
        };
        setLocker([...locker, newReport]);
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
              <div className="flex items-center gap-2">
                 <Input
                    type="number"
                    placeholder="Enter Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-28"
                  />
                  <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
                      <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="hi">Hindi</SelectItem>
                          <SelectItem value="gu">Gujarati</SelectItem>
                      </SelectContent>
                  </Select>
                <Button onClick={handleSaveToLocker}>
                  <Save className="mr-2 h-4 w-4" />
                  Save
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
