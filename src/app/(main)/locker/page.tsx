"use client";

import { useLocalStorage } from '@/hooks/use-local-storage';
import { AnalyzePrescriptionReportOutput } from "@/ai/flows/analyze-prescription-report";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/header';

type StoredReport = AnalyzePrescriptionReportOutput & { savedAt: string };

export default function LockerPage() {
  const [locker, setLocker] = useLocalStorage<StoredReport[]>("health-locker", []);

  const clearLocker = () => {
    setLocker([]);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight font-headline">Health Locker</h1>
          {locker.length > 0 && (
            <Button variant="destructive" onClick={clearLocker}>
              <Trash2 className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          )}
        </div>

        {locker.length === 0 ? (
          <Card className="text-center p-12">
            <CardContent>
              <h3 className="text-xl font-semibold">Your Health Locker is empty.</h3>
              <p className="text-muted-foreground mt-2 mb-4">
                Upload and save a prescription analysis to see it here.
              </p>
              <Button asChild>
                <Link href="/">Upload Prescription</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locker.sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()).map((report, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <FileText className="text-primary"/>
                    Report
                  </CardTitle>
                   <CardDescription>
                    Saved on {new Date(report.savedAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="font-semibold">{report.summary}</p>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{report.diagnosis}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
