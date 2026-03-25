'use server';
/**
 * @fileOverview This file implements a Genkit flow to analyze prescription images or PDFs.
 * It processes the input to generate a comprehensive report including a summary, diagnosis,
 * medication schedule, potential side effects, and a follow-up checklist in the user's preferred language.
 *
 * - analyzePrescriptionReport - The main function to trigger the prescription analysis.
 * - AnalyzePrescriptionReportInput - The input type for the analysis function.
 * - AnalyzePrescriptionReportOutput - The output type for the analysis function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzePrescriptionReportInputSchema = z.object({
  prescriptionDataUri: z
    .string()
    .describe(
      "A photo or PDF of a prescription, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'. Supported mimetypes include image/jpeg, image/png, image/webp, application/pdf."
    ),
  language: z.enum(['en', 'hi']).describe("The desired output language for the report. 'en' for English, 'hi' for Hindi."),
});

export type AnalyzePrescriptionReportInput = z.infer<typeof AnalyzePrescriptionReportInputSchema>;

const AnalyzePrescriptionReportOutputSchema = z.object({
  summary: z.string().describe("A concise one-line summary of the prescription."),
  diagnosis: z.string().describe("A plain-language explanation of the diagnosed condition."),
  medicationSchedule: z
    .string()
    .describe(
      "A medication schedule presented as a markdown table, including medication names, dosages, frequencies, and durations. Example: | Medication | Dosage | Frequency | Duration |\\n|---|---|---|---|\\n| Amoxicillin | 500mg | Twice daily | 7 days |"
    ),
  sideEffects: z.string().describe("Potential side effects of the prescribed medications."),
  followUpChecklist: z
    .string()
    .describe("A checklist of recommended follow-up actions or precautions."),
});

export type AnalyzePrescriptionReportOutput = z.infer<typeof AnalyzePrescriptionReportOutputSchema>;

const analyzePrescriptionReportPrompt = ai.definePrompt({
  name: 'analyzePrescriptionReportPrompt',
  input: { schema: AnalyzePrescriptionReportInputSchema },
  output: { schema: AnalyzePrescriptionReportOutputSchema },
  prompt: `You are an AI assistant designed to analyze medical prescriptions and provide clear, comprehensive reports.

Your task is to analyze the provided prescription (image or PDF) and generate a detailed report in JSON format. The report should include a one-line summary, a plain-language diagnosis, a medication schedule as a markdown table, potential side effects, and a follow-up checklist.

Translate all output fields into the requested language: {{{language}}}.

Prescription:
{{media url=prescriptionDataUri}}

Please provide the output in a structured JSON format matching the following schema. Ensure the 'medicationSchedule' is formatted as a markdown table.

Example Output (English):
\`\`\`json
{
  "summary": "Prescription for common cold with antibiotics.",
  "diagnosis": "The prescription indicates a common cold, likely with a bacterial co-infection given the antibiotic.",
  "medicationSchedule": "| Medication | Dosage | Frequency | Duration |\\n|---|---|---|---|\\n| Amoxicillin | 500mg | Twice daily | 7 days |\\n| Paracetamol | 500mg | Three times daily | As needed |",
  "sideEffects": "Amoxicillin may cause nausea, diarrhea, or rash. Paracetamol rarely causes side effects at recommended doses, but overdose can cause liver damage.",
  "followUpChecklist": "- Complete the full course of antibiotics.\\n- Drink plenty of fluids.\\n- Rest adequately.\\n- Consult a doctor if symptoms worsen or persist after 7 days."
}
\`\`\`

Example Output (Hindi):
\`\`\`json
{
  "summary": "सामान्य सर्दी और एंटीबायोटिक्स के लिए एक नुस्खा।",
  "diagnosis": "यह नुस्खा सामान्य सर्दी का संकेत देता है, एंटीबायोटिक के उपयोग को देखते हुए संभवतः जीवाणु संक्रमण के साथ।",
  "medicationSchedule": "| दवा | खुराक | आवृत्ति | अवधि |\\n|---|---|---|---|\\n| एमोक्सिसिलिन | 500 मिलीग्राम | दिन में दो बार | 7 दिन |\\n| पैरासिटामोल | 500 मिलीग्राम | दिन में तीन बार | आवश्यकतानुसार |",
  "sideEffects": "एमोक्सिसिलिन से मतली, दस्त या दाने हो सकते हैं। पैरासिटामोल अनुशंसित खुराक पर शायद ही कभी दुष्प्रभाव पैदा करता है, लेकिन अधिक खुराक से लीवर को नुकसान हो सकता है।",
  "followUpChecklist": "- एंटीबायोटिक दवाओं का पूरा कोर्स पूरा करें।\\n- खूब सारे तरल पदार्थ पिएं।\\n- पर्याप्त आराम करें।\\n- यदि लक्षण बिगड़ते हैं या 7 दिनों के बाद भी बने रहते हैं तो डॉक्टर से सलाह लें।"
}
\`\`\`

Your response MUST be a JSON object conforming to the schema.
`,
});

const analyzePrescriptionReportFlow = ai.defineFlow(
  {
    name: 'analyzePrescriptionReportFlow',
    inputSchema: AnalyzePrescriptionReportInputSchema,
    outputSchema: AnalyzePrescriptionReportOutputSchema,
  },
  async (input) => {
    const { output } = await analyzePrescriptionReportPrompt(input);
    if (!output) {
      throw new Error('Failed to generate prescription report.');
    }
    return output;
  }
);

export async function analyzePrescriptionReport(input: AnalyzePrescriptionReportInput): Promise<AnalyzePrescriptionReportOutput> {
  return analyzePrescriptionReportFlow(input);
}
