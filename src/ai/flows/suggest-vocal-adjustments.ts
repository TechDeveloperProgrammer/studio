// src/ai/flows/suggest-vocal-adjustments.ts
'use server';
/**
 * @fileOverview An AI agent that suggests real-time vocal adjustments.
 *
 * - suggestVocalAdjustments - A function that provides vocal adjustment suggestions.
 * - SuggestVocalAdjustmentsInput - The input type for the suggestVocalAdjustments function.
 * - SuggestVocalAdjustmentsOutput - The return type for the suggestVocalAdjustments function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestVocalAdjustmentsInputSchema = z.object({
  voiceSampleDataUri: z
    .string()
    .describe(
      "A voice sample, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  desiredVocalCharacteristics: z
    .string()
    .describe('The desired vocal characteristics the user is aiming for.'),
});
export type SuggestVocalAdjustmentsInput = z.infer<typeof SuggestVocalAdjustmentsInputSchema>;

const SuggestVocalAdjustmentsOutputSchema = z.object({
  suggestedAdjustments: z
    .string()
    .describe('AI suggested adjustments to vocal technique in real-time.'),
});
export type SuggestVocalAdjustmentsOutput = z.infer<typeof SuggestVocalAdjustmentsOutputSchema>;

export async function suggestVocalAdjustments(
  input: SuggestVocalAdjustmentsInput
): Promise<SuggestVocalAdjustmentsOutput> {
  return suggestVocalAdjustmentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestVocalAdjustmentsPrompt',
  input: {schema: SuggestVocalAdjustmentsInputSchema},
  output: {schema: SuggestVocalAdjustmentsOutputSchema},
  prompt: `You are a vocal coach providing real-time feedback.

You will analyze the user's voice sample and desired vocal characteristics and provide specific, actionable suggestions for improvement.

Desired vocal characteristics: {{{desiredVocalCharacteristics}}}
Voice sample: {{media url=voiceSampleDataUri}}

Provide feedback to the user in a concise manner.`,
});

const suggestVocalAdjustmentsFlow = ai.defineFlow(
  {
    name: 'suggestVocalAdjustmentsFlow',
    inputSchema: SuggestVocalAdjustmentsInputSchema,
    outputSchema: SuggestVocalAdjustmentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
