// use server'
'use server';

/**
 * @fileOverview AI flow for analyzing vocal recordings and providing feedback.
 *
 * - analyzeVocalPerformance - Analyzes vocal recordings for clarity, emotion, expressiveness, prosody, and fluency, providing qualitative and quantitative feedback.
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
  clarity: z.string().describe('A qualitative analysis of the clarity of the vocal recording.'),
  clarityScore: z.number().min(1).max(10).describe('A quantitative score from 1 to 10 for clarity.'),
  emotion: z.string().describe('A qualitative analysis of the emotion conveyed in the vocal recording.'),
  emotionScore: z.number().min(1).max(10).describe('A quantitative score from 1 to 10 for emotion conveyed.'),
  expressiveness: z
    .string()
    .describe('A qualitative analysis of the expressiveness of the vocal recording.'),
  expressivenessScore: z.number().min(1).max(10).describe('A quantitative score from 1 to 10 for expressiveness.'),
  prosody: z
    .string()
    .describe('A qualitative analysis of the prosody (rhythm, stress, intonation) of the vocal recording.'),
  prosodyScore: z.number().min(1).max(10).describe('A quantitative score from 1 to 10 for prosody.'),
  fluency: z
    .string()
    .describe('A qualitative analysis of the fluency and smoothness of speech in the vocal recording.'),
  fluencyScore: z.number().min(1).max(10).describe('A quantitative score from 1 to 10 for fluency.'),
  technicalScore: z.number().min(1).max(10).describe('An overall technical score from 1 to 10 evaluating the vocal technique.'),
  overallFeedback: z.string().describe('Overall qualitative feedback to improve vocal performance.'),
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

  Analyze the provided vocal recording for clarity, emotion, expressiveness, prosody (rhythm, stress, and intonation), and fluency (smoothness of speech).
  For each of these aspects, provide:
  1. A qualitative analysis (a textual description).
  2. A quantitative score from 1 to 10.

  Also, provide an overall technical score from 1 to 10 evaluating the vocal technique.

  Finally, offer overall qualitative feedback summarizing key areas for improvement.

  Consider any user details provided when generating the analysis.

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

