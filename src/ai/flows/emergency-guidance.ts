'use server';
/**
 * @fileOverview An AI agent that provides immediate emergency guidance.
 *
 * - emergencyGuidance - A function that handles the emergency guidance process.
 * - EmergencyGuidanceInput - The input type for the emergencyGuidance function.
 * - EmergencyGuidanceOutput - The return type for the emergencyGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import * as wav from 'wav';

const EmergencyGuidanceInputSchema = z.object({
  emergencyDescription: z
    .string()
    .describe('A brief description of the urgent situation.'),
  language: z
    .string()
    .default('English')
    .describe(
      'The desired language for the guidance (e.g., "English", "Hindi").'
    ),
});
export type EmergencyGuidanceInput = z.infer<typeof EmergencyGuidanceInputSchema>;

const EmergencyGuidanceOutputSchema = z.object({
  summary: z.string().describe('A one-line summary of the immediate advice.'),
  advice: z
    .string()
    .describe('A few VERY SHORT bullet points of actionable advice (e.g., "- Call 108 immediately.").'),
  emergencyMessages: z
    .array(z.string())
    .describe(
      'A list of pre-written messages suitable for contacting emergency services or loved ones.'
    ),
  audioAdvice: z
    .string()
    .describe('Data URI of the audio representation of the advice (WAV format).'),
});
export type EmergencyGuidanceOutput = z.infer<typeof EmergencyGuidanceOutputSchema>;

export async function emergencyGuidance(
  input: EmergencyGuidanceInput
): Promise<EmergencyGuidanceOutput> {
  return emergencyGuidanceFlow(input);
}

const emergencyGuidancePrompt = ai.definePrompt({
  name: 'emergencyGuidancePrompt',
  input: {schema: EmergencyGuidanceInputSchema},
  output: {schema: EmergencyGuidanceOutputSchema},
  prompt: `You are an AI assistant designed to provide immediate and actionable emergency guidance. The user is in a critical situation.
Your response MUST be extremely brief and direct. Use short bullet points for the 'advice' field.
Prioritize safety and immediate actions. Always include advice to call emergency services.

Based on the following description of the emergency and the desired language, provide:
1. A one-line summary of the immediate advice in the 'summary' field.
2. A few VERY SHORT bullet points of actionable advice in the 'advice' field (e.g., "- Call 108 immediately.", "- Keep patient calm.").
3. Several short, pre-written emergency messages for the user to send for help in the 'emergencyMessages' field.

Language for output: {{{language}}}
Emergency Description: {{{emergencyDescription}}}

Ensure the tone is calm, clear, and direct.`,
});

const emergencyGuidanceFlow = ai.defineFlow(
  {
    name: 'emergencyGuidanceFlow',
    inputSchema: EmergencyGuidanceInputSchema,
    outputSchema: EmergencyGuidanceOutputSchema,
  },
  async (input) => {
    // Generate text advice and messages using the primary AI model
    const {output} = await emergencyGuidancePrompt(input);

    if (!output) {
      throw new Error('Failed to generate emergency guidance text.');
    }

    const adviceText = output.advice;

    // Generate audio for the advice using the TTS model
    const {media} = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {voiceName: 'Algenib'}, // Using a default voice
          },
        },
      },
      prompt: adviceText,
    });

    if (!media || !media.url) {
      throw new Error('No audio media returned from TTS.');
    }

    // Convert PCM audio to WAV format for broader compatibility
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    const audioWavBase64 = await toWav(audioBuffer);

    return {
      ...output,
      audioAdvice: 'data:audio/wav;base64,' + audioWavBase64,
    };
  }
);

/**
 * Helper function to convert raw PCM audio data to WAV format.
 * This function is necessary because the TTS model often returns raw PCM data
 * which needs to be wrapped in a WAV container for common audio playback.
 *
 * @param pcmData The raw PCM audio data as a Buffer.
 * @param channels The number of audio channels (default: 1 for mono).
 * @param rate The sample rate in Hz (default: 24000).
 * @param sampleWidth The sample width in bytes (default: 2 for 16-bit audio).
 * @returns A Promise that resolves with the base64 encoded WAV audio string.
 */
async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
