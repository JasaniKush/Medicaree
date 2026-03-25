"use client";

import type { AnalyzePrescriptionReportOutput } from "@/ai/flows/analyze-prescription-report";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Info, List, Pill, AlertTriangle, FileText, Volume2 } from "lucide-react";

type ReportDisplayProps = {
  report: AnalyzePrescriptionReportOutput;
};

// Simple markdown table parser
const parseMarkdownTable = (markdown: string): { headers: string[]; rows: string[][] } => {
  if (!markdown || typeof markdown !== 'string') {
    return { headers: [], rows: [] };
  }
  const lines = markdown.trim().split('\n');
  if (lines.length < 2) return { headers: [], rows: [] };

  const headers = lines[0].split('|').map(h => h.trim()).filter(h => h);
  const rows = lines.slice(2).map(line => line.split('|').map(cell => cell.trim()).filter(cell => cell));

  return { headers, rows };
};


export function ReportDisplay({ report }: ReportDisplayProps) {
  const { summary, diagnosis, medicationSchedule, sideEffects, followUpChecklist, summaryAudio } = report;
  const { headers: medHeaders, rows: medRows } = parseMarkdownTable(medicationSchedule);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <FileText className="text-primary"/>
            Prescription Summary
          </CardTitle>
          <CardDescription>A quick overview of your prescription analysis.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg">{summary}</p>
          {summaryAudio && (
            <div className="mt-4">
               <div className="flex items-center gap-2 mb-2 text-sm font-medium text-muted-foreground">
                 <Volume2 className="h-4 w-4" />
                 <span>Audio Summary</span>
               </div>
               <audio controls src={summaryAudio} className="w-full h-10">
                  Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3"><Info className="text-primary"/> Diagnosis</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{diagnosis}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3"><AlertTriangle className="text-primary"/> Potential Side Effects</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{sideEffects}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3"><Pill className="text-primary"/> Medication Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          {medRows.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  {medHeaders.map((header, index) => <TableHead key={index}>{header}</TableHead>)}
                </TableRow>
              </TableHeader>
              <TableBody>
                {medRows.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, cellIndex) => <TableCell key={cellIndex}>{cell}</TableCell>)}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
             <p>{medicationSchedule}</p>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3"><List className="text-primary"/> Follow-up Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {followUpChecklist.split('\n').map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <span>{item.replace(/^- /, '')}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
