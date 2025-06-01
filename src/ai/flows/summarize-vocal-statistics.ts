'use server';
/**
 * @fileOverview This file defines a Genkit flow for summarizing vocal statistics per YouTube video
 * and suggesting vocal improvements for the channel.
 *
 * - summarizeVocalStatistics - The main function that orchestrates the vocal analysis and summarization.
 * - SummarizeVocalStatisticsInput - The input type for the summarizeVocalStatistics function.
 * - SummarizeVocalStatisticsOutput - The output type for the summarizeVocalStatistics function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input schema for the flow
const SummarizeVocalStatisticsInputSchema = z.object({
  videoTitle: z.string().describe('The title of the YouTube video.'),
  videoDescription: z.string().describe('The description of the YouTube video.'),
  audioAnalysisDataUri: z
    .string()
    .describe(
      'Audio analysis data as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'. This should contain data about the video\'s vocal characteristics, such as pitch, tone, and clarity.'
    ),
  channelName: z.string().describe('The name of the YouTube channel.'),
});
export type SummarizeVocalStatisticsInput = z.infer<typeof SummarizeVocalStatisticsInputSchema>;

// Output schema for the flow
const SummarizeVocalStatisticsOutputSchema = z.object({
  summary: z.string().describe('A summary of the vocal statistics for the video.'),
  suggestedImprovements: z
    .string()
    .describe('AI suggested improvements for the channel based on the vocal statistics.'),
});
export type SummarizeVocalStatisticsOutput = z.infer<typeof SummarizeVocalStatisticsOutputSchema>;

// Main function to be called
export async function summarizeVocalStatistics(
  input: SummarizeVocalStatisticsInput
): Promise<SummarizeVocalStatisticsOutput> {
  return summarizeVocalStatisticsFlow(input);
}

// Define the prompt
const summarizeVocalStatisticsPrompt = ai.definePrompt({
  name: 'summarizeVocalStatisticsPrompt',
  input: {schema: SummarizeVocalStatisticsInputSchema},
  output: {schema: SummarizeVocalStatisticsOutputSchema},
  prompt: `You are an AI assistant helping YouTube creators optimize their content for vocal quality.\n\n  Analyze the provided vocal statistics for a specific video and suggest improvements for the entire channel.\n\n  Video Title: {{{videoTitle}}}\n  Video Description: {{{videoDescription}}}\n  Channel Name: {{{channelName}}}\n  Audio Analysis Data: {{media url=audioAnalysisDataUri}}\n\n  Based on this information, provide a summary of the vocal statistics for the video and suggest vocal improvements for the channel. Consider aspects like clarity, tone, emotion, and overall vocal performance.\n\n  Summary:\n  Suggested Improvements:\n  `,
});

// Define the flow
const summarizeVocalStatisticsFlow = ai.defineFlow(
  {
    name: 'summarizeVocalStatisticsFlow',
    inputSchema: SummarizeVocalStatisticsInputSchema,
    outputSchema: SummarizeVocalStatisticsOutputSchema,
  },
  async input => {
    const {output} = await summarizeVocalStatisticsPrompt(input);
    return output!;
  }
);
