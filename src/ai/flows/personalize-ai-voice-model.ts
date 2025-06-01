
'use server';
/**
 * @fileOverview A flow that personalizes AI guidance based on user-provided voice samples and their desired voice.
 *
 * - personalizeAIVoiceModel - A function that provides personalized vocal guidance.
 * - PersonalizeAIVoiceModelInput - The input type for the personalizeAIVoiceModel function.
 * - PersonalizeAIVoiceModelOutput - The return type for the personalizeAIVoiceModel function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizeAIVoiceModelInputSchema = z.object({
  userVoiceSamples: z
    .array(z.string())
    .describe(
      'An array of voice samples, each as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'
    ),
  dreamVoiceDescription: z
    .string()
    .describe('A description of the user\'s desired \'dream voice\'.'),
});
export type PersonalizeAIVoiceModelInput = z.infer<
  typeof PersonalizeAIVoiceModelInputSchema
>;

const PersonalizeAIVoiceModelOutputSchema = z.object({
  toneGuidance: z
    .string()
    .describe('Specific advice to achieve the desired tonal qualities based on the samples and dream voice description.'),
  clarityGuidance: z
    .string()
    .describe('Actionable steps to improve vocal clarity towards the goal, based on the samples and dream voice description.'),
  emotionGuidance: z
    .string()
    .describe('Suggestions on how to convey desired emotions effectively, based on the samples and dream voice description.'),
  overallSummary: z
    .string()
    .describe('A summary of the personalized vocal improvement plan based on the provided inputs.'),
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
  prompt: `You are an expert AI vocal coach. The user wants to train their voice and has provided voice samples and a description of their "dream voice."

Analyze these inputs and provide personalized guidance on how the user can adjust their:
1.  **Tone**: Offer specific, actionable advice to help the user achieve the tonal qualities described in their "dream voice," considering their current samples. What exercises or focal points can they use?
2.  **Clarity**: Provide actionable steps to improve vocal clarity towards their stated goal. What aspects of articulation or resonance should they focus on?
3.  **Emotion**: Give suggestions on how to convey the desired emotions more effectively in their voice, aligning with their "dream voice" description and analyzing their current samples.

Your guidance should be practical, constructive, and help the user understand what to practice.
Finally, provide an overall summary of the personalized vocal improvement plan.

User's dream voice description: {{{dreamVoiceDescription}}}

User voice samples:
{{#each userVoiceSamples}}
- Voice Sample ({{media url=this}})
{{/each}}

Provide detailed, actionable feedback for tone, clarity, and emotion, and an overall summary.`,
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
