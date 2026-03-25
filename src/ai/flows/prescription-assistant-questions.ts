'use server';
/**
 * @fileOverview A context-aware AI assistant that answers questions based on analyzed prescription data.
 *
 * - prescriptionAssistantQuestions - A function that handles user questions about prescription data.
 * - PrescriptionAssistantQuestionsInput - The input type for the prescriptionAssistantQuestions function.
 * - PrescriptionAssistantQuestionsOutput - The return type for the prescriptionAssistantQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input schema for the previously analyzed prescription data
const AnalyzedPrescriptionDataSchema = z.object({
  summary: z.string().describe('One-line summary of the prescription.'),
  diagnosis: z.string().describe('Plain-language diagnosis from the prescription.'),
  medicationSchedule: z.string().describe('Medication schedule in table format.'),
  potentialSideEffects: z.array(z.string()).describe('List of potential side effects.'),
  followUpChecklist: z.array(z.string()).describe('Follow-up checklist items.'),
});

// Input schema for the prescription assistant questions flow
const PrescriptionAssistantQuestionsInputSchema = z.object({
  analyzedData: AnalyzedPrescriptionDataSchema.describe('The previously analyzed prescription data.'),
  userQuestion: z.string().describe('The user\'s question about the prescription data.'),
});
export type PrescriptionAssistantQuestionsInput = z.infer<typeof PrescriptionAssistantQuestionsInputSchema>;

// Output schema for the prescription assistant questions flow
const PrescriptionAssistantQuestionsOutputSchema = z.object({
  answer: z.string().describe('The concise answer from the AI assistant based on the analyzed prescription data.'),
});
export type PrescriptionAssistantQuestionsOutput = z.infer<typeof PrescriptionAssistantQuestionsOutputSchema>;

// Wrapper function to call the Genkit flow
export async function prescriptionAssistantQuestions(input: PrescriptionAssistantQuestionsInput): Promise<PrescriptionAssistantQuestionsOutput> {
  return prescriptionAssistantQuestionsFlow(input);
}

// Define the prompt for the AI assistant
const prescriptionAssistantPrompt = ai.definePrompt({
  name: 'prescriptionAssistantPrompt',
  input: {schema: PrescriptionAssistantQuestionsInputSchema},
  output: {schema: PrescriptionAssistantQuestionsOutputSchema},
  prompt: `You are a context-aware AI assistant named MediCare designed to help users understand their analyzed prescription data.
Your role is to answer specific questions about the provided prescription data.
You MUST NOT provide any external medical advice, diagnoses, or treatment recommendations. Only refer to the information provided to answer the user's question.
Be concise and to the point. If the question cannot be answered from the provided data, state that you cannot answer based on the given information.

Here is the analyzed prescription data:
Summary: {{{analyzedData.summary}}}
Diagnosis: {{{analyzedData.diagnosis}}}
Medication Schedule:
{{{analyzedData.medicationSchedule}}}
Potential Side Effects:
{{#each analyzedData.potentialSideEffects}}
- {{{this}}}
{{/each}}
Follow-up Checklist:
{{#each analyzedData.followUpChecklist}}
- {{{this}}}
{{/each}}

User's Question: "{{{userQuestion}}}"

Your concise answer:`,
});

// Define the Genkit flow
const prescriptionAssistantQuestionsFlow = ai.defineFlow(
  {
    name: 'prescriptionAssistantQuestionsFlow',
    inputSchema: PrescriptionAssistantQuestionsInputSchema,
    outputSchema: PrescriptionAssistantQuestionsOutputSchema,
  },
  async (input) => {
    const {output} = await prescriptionAssistantPrompt(input);
    return output!;
  }
);
