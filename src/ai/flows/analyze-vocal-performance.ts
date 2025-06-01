// use server'
'use server';

/**
 * @fileOverview AI flow for analyzing vocal recordings and providing feedback.
 *
 * - analyzeVocalPerformance - Analyzes vocal recordings for clarity, emotion, and expressiveness.
 * - AnalyzeVocalPerformanceInput - The input type for the analyzeVocalPerformance function.
 * - AnalyzeVocalPerformanceOutput - The return type for the analyzeVocalPerformance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeVocalPerformanceInputSchema = z.object({
  recordingDataUri: z
    .string()
    .describe(
      "A vocal recording as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  userDetails: z
    .string()
    .optional()
    .describe('Any relevant background on the user such as goals or preferences'),
});
export type AnalyzeVocalPerformanceInput = z.infer<typeof AnalyzeVocalPerformanceInputSchema>;

const AnalyzeVocalPerformanceOutputSchema = z.object({
  clarity: z.string().describe('An analysis of the clarity of the vocal recording.'),
  emotion: z.string().describe('An analysis of the emotion conveyed in the vocal recording.'),
  expressiveness: z
    .string()
    .describe('An analysis of the expressiveness of the vocal recording.'),
  overallFeedback: z.string().describe('Overall feedback to improve vocal performance.'),
});
export type AnalyzeVocalPerformanceOutput = z.infer<typeof AnalyzeVocalPerformanceOutputSchema>;

export async function analyzeVocalPerformance(
  input: AnalyzeVocalPerformanceInput
): Promise<AnalyzeVocalPerformanceOutput> {
  return analyzeVocalPerformanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeVocalPerformancePrompt',
  input: {schema: AnalyzeVocalPerformanceInputSchema},
  output: {schema: AnalyzeVocalPerformanceOutputSchema},
  prompt: `You are an AI vocal coach providing feedback on vocal recordings.

  Analyze the provided vocal recording for clarity, emotion and expressiveness.

  Offer overall feedback to improve vocal performance.

  Consider any user details when generating the analysis.

  Vocal Recording: {{media url=recordingDataUri}}
  User Details: {{{userDetails}}}
  `,
});

const analyzeVocalPerformanceFlow = ai.defineFlow(
  {
    name: 'analyzeVocalPerformanceFlow',
    inputSchema: AnalyzeVocalPerformanceInputSchema,
    outputSchema: AnalyzeVocalPerformanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
