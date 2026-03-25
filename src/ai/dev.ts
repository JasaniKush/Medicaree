import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-prescription-report.ts';
import '@/ai/flows/emergency-guidance.ts';
import '@/ai/flows/prescription-assistant-questions.ts';