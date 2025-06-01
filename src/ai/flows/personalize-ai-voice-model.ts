'use server';
/**
 * @fileOverview A flow that personalizes the AI voice model based on user-provided examples.
 *
 * - personalizeAIVoiceModel - A function that personalizes the AI voice model.
 * - PersonalizeAIVoiceModelInput - The input type for the personalizeAIVoiceModel function.
 * - PersonalizeAIVoiceModelOutput - The return type for the personalizeAIVoiceModel function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizeAIVoiceModelInputSchema = z.object({
  userVoiceSamples: z
    .array(z.string())
    .describe(
      'An array of voice samples, each as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Corrected typo here
    ),
  dreamVoiceDescription: z
    .string()
    .describe('A description of the user\'s desired \'dream voice\'.'),
});
export type PersonalizeAIVoiceModelInput = z.infer<
  typeof PersonalizeAIVoiceModelInputSchema
>;

const PersonalizeAIVoiceModelOutputSchema = z.object({
  voiceModelPersonalizationResult: z
    .string()
    .describe(
      'A string describing the result of the voice model personalization process.'
    ),
});
export type PersonalizeAIVoiceModelOutput = z.infer<
  typeof PersonalizeAIVoiceModelOutputSchema
>;

export async function personalizeAIVoiceModel(
  input: PersonalizeAIVoiceModelInput
): Promise<PersonalizeAIVoiceModelOutput> {
  return personalizeAIVoiceModelFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizeAIVoiceModelPrompt',
  input: {schema: PersonalizeAIVoiceModelInputSchema},
  output: {schema: PersonalizeAIVoiceModelOutputSchema},
  prompt: `You are a voice modulation expert. You will analyze the user's voice samples and their description of their desired "dream voice", and provide guidance on how to adjust their voice to match the model.\n\nUser's dream voice description: {{{dreamVoiceDescription}}}\n\nUser voice samples:{{#each userVoiceSamples}} {{media url=this}} {{/each}}\n\nResult:`, // Added Handlebars each loop to process voice samples
});

const personalizeAIVoiceModelFlow = ai.defineFlow(
  {
    name: 'personalizeAIVoiceModelFlow',
    inputSchema: PersonalizeAIVoiceModelInputSchema,
    outputSchema: PersonalizeAIVoiceModelOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
