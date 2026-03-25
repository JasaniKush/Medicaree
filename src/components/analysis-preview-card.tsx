"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, Pill } from 'lucide-react';

export function AnalysisPreviewCard() {
  return (
    <Card className="w-full max-w-md shadow-2xl bg-white/80 backdrop-blur-sm dark:bg-card/80">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primary flex items-center gap-2">
          <Pill />
          Analysis Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-sm mb-1">Diagnosis</h4>
          <p className="text-sm text-muted-foreground">Bacterial Infection</p>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-2">Medication</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="h-8">Drug</TableHead>
                <TableHead className="h-8">Dosage</TableHead>
                <TableHead className="h-8">Freq.</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="py-1">Amoxicillin</TableCell>
                <TableCell className="py-1">500mg</TableCell>
                <TableCell className="py-1">2/day</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="py-1">Ibuprofen</TableCell>
                <TableCell className="py-1">200mg</TableCell>
                <TableCell className="py-1">SOS</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-2">Checklist</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Complete antibiotic course.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Stay hydrated.</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
