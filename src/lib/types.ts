import type { AnalyzePrescriptionReportOutput } from "@/ai/flows/analyze-prescription-report";

export type StoredReport = AnalyzePrescriptionReportOutput & {
  id: string;
  savedAt: string;
  type: 'prescription' | 'lab';
};
