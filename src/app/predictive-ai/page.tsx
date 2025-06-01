"use client";

import { useState } from "react";
import { PageContainer } from "@/components/page-container";
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUpload } from "@/components/file-upload";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, UserCog, LineChart, MessageSquareHeart, Mic2 } from "lucide-react";

import {
  personalizeAIVoiceModel,
  type PersonalizeAIVoiceModelInput,
  type PersonalizeAIVoiceModelOutput,
} from "@/ai/flows/personalize-ai-voice-model";
import {
  analyzeVocalPerformance,
  type AnalyzeVocalPerformanceInput,
  type AnalyzeVocalPerformanceOutput,
} from "@/ai/flows/analyze-vocal-performance";
import {
  summarizeVocalStatistics,
  type SummarizeVocalStatisticsInput,
  type SummarizeVocalStatisticsOutput,
} from "@/ai/flows/summarize-vocal-statistics";
import {
  suggestVocalAdjustments,
  type SuggestVocalAdjustmentsInput,
  type SuggestVocalAdjustmentsOutput,
} from "@/ai/flows/suggest-vocal-adjustments";

export default function PredictiveAIPage() {
  const { toast } = useToast();

  // State for Personalize AI Voice Model
  const [userVoiceSamples, setUserVoiceSamples] = useState<string[]>([]);
  const [dreamVoiceDescription, setDreamVoiceDescription] = useState("");
  const [personalizeResult, setPersonalizeResult] = useState<PersonalizeAIVoiceModelOutput | null>(null);
  const [isPersonalizing, setIsPersonalizing] = useState(false);

  // State for Analyze Vocal Performance
  const [performanceRecording, setPerformanceRecording] = useState<string | null>(null);
  const [performanceUserDetails, setPerformanceUserDetails] = useState("");
  const [analysisResult, setAnalysisResult] = useState<AnalyzeVocalPerformanceOutput | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // State for Summarize Vocal Statistics
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [audioAnalysisDataUri, setAudioAnalysisDataUri] = useState<string | null>(null);
  const [channelName, setChannelName] = useState("");
  const [summaryResult, setSummaryResult] = useState<SummarizeVocalStatisticsOutput | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  
  // State for Suggest Vocal Adjustments
  const [adjustmentVoiceSample, setAdjustmentVoiceSample] = useState<string | null>(null);
  const [desiredVocalChars, setDesiredVocalChars] = useState("");
  const [adjustmentSuggestion, setAdjustmentSuggestion] = useState<SuggestVocalAdjustmentsOutput | null>(null);
  const [isSuggesting, setIsSuggesting] = useState(false);


  const handlePersonalize = async () => {
    if (userVoiceSamples.length === 0 || !dreamVoiceDescription) {
      toast({ title: "Error", description: "Please provide voice samples and a dream voice description.", variant: "destructive" });
      return;
    }
    setIsPersonalizing(true);
    setPersonalizeResult(null);
    try {
      const result = await personalizeAIVoiceModel({ userVoiceSamples, dreamVoiceDescription });
      setPersonalizeResult(result);
      toast({ title: "Personalization Complete", description: "AI voice model personalization finished." });
    } catch (error) {
      toast({ title: "Personalization Failed", description: String(error) || "An unknown error occurred.", variant: "destructive" });
    } finally {
      setIsPersonalizing(false);
    }
  };

  const handleAnalyzePerformance = async () => {
    if (!performanceRecording) {
      toast({ title: "Error", description: "Please upload a vocal recording.", variant: "destructive" });
      return;
    }
    setIsAnalyzing(true);
    setAnalysisResult(null);
    try {
      const result = await analyzeVocalPerformance({ recordingDataUri: performanceRecording, userDetails: performanceUserDetails });
      setAnalysisResult(result);
      toast({ title: "Analysis Complete", description: "Vocal performance analysis is ready." });
    } catch (error) {
      toast({ title: "Analysis Failed", description: String(error) || "An unknown error occurred.", variant: "destructive" });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleSummarizeStats = async () => {
    if (!videoTitle || !audioAnalysisDataUri || !channelName) {
      toast({ title: "Error", description: "Please fill in all required fields for summarization.", variant: "destructive" });
      return;
    }
    setIsSummarizing(true);
    setSummaryResult(null);
    try {
      const result = await summarizeVocalStatistics({ videoTitle, videoDescription, audioAnalysisDataUri, channelName });
      setSummaryResult(result);
      toast({ title: "Summarization Complete", description: "Vocal statistics summary is ready." });
    } catch (error) {
      toast({ title: "Summarization Failed", description: String(error) || "An unknown error occurred.", variant: "destructive" });
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleSuggestAdjustments = async () => {
    if (!adjustmentVoiceSample || !desiredVocalChars) {
      toast({ title: "Error", description: "Please provide a voice sample and desired characteristics.", variant: "destructive" });
      return;
    }
    setIsSuggesting(true);
    setAdjustmentSuggestion(null);
    try {
      const result = await suggestVocalAdjustments({ voiceSampleDataUri: adjustmentVoiceSample, desiredVocalCharacteristics: desiredVocalChars });
      setAdjustmentSuggestion(result);
      toast({ title: "Suggestion Ready", description: "AI vocal adjustment suggestions are available." });
    } catch (error) {
      toast({ title: "Suggestion Failed", description: String(error) || "An unknown error occurred.", variant: "destructive" });
    } finally {
      setIsSuggesting(false);
    }
  };


  return (
    <PageContainer>
      <PageHeader
        title="Predictive AI Suite"
        description="Leverage powerful AI tools for vocal analysis, personalization, and improvement."
      />

      <Tabs defaultValue="personalize" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="personalize"><UserCog className="mr-2 h-4 w-4" />Personalize</TabsTrigger>
          <TabsTrigger value="analyze"><MessageSquareHeart className="mr-2 h-4 w-4" />Analyze</TabsTrigger>
          <TabsTrigger value="summarize"><LineChart className="mr-2 h-4 w-4" />Summarize</TabsTrigger>
          <TabsTrigger value="suggest"><Mic2 className="mr-2 h-4 w-4" />Suggest</TabsTrigger>
        </TabsList>

        <TabsContent value="personalize">
          <Card>
            <CardHeader>
              <CardTitle>Personalize AI Voice Model</CardTitle>
              <CardDescription>"Teach" the AI your desired voice with examples.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FileUpload 
                onFileChange={(uris) => setUserVoiceSamples(uris as string[])} 
                label="Upload User Voice Samples (Multiple)"
                multiple 
                id="personalize-samples"
              />
              <div>
                <Label htmlFor="dreamVoice" className="block mb-1 text-sm font-medium">Dream Voice Description</Label>
                <Textarea
                  id="dreamVoice"
                  placeholder="Describe your ideal voice (e.g., 'A warm, feminine voice with clear articulation')."
                  value={dreamVoiceDescription}
                  onChange={(e) => setDreamVoiceDescription(e.target.value)}
                  rows={4}
                />
              </div>
              <Button onClick={handlePersonalize} disabled={isPersonalizing} className="w-full sm:w-auto">
                <Sparkles className="mr-2 h-4 w-4" />
                {isPersonalizing ? "Personalizing..." : "Personalize Model"}
              </Button>
              {personalizeResult && (
                <div className="mt-4 p-4 border rounded-md bg-muted">
                  <h4 className="font-semibold mb-2">Personalization Result:</h4>
                  <p className="text-sm">{personalizeResult.voiceModelPersonalizationResult}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analyze">
          <Card>
            <CardHeader>
              <CardTitle>Analyze Vocal Performance</CardTitle>
              <CardDescription>Get feedback on clarity, emotion, and expressiveness.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FileUpload 
                onFileChange={(uri) => setPerformanceRecording(uri as string)} 
                label="Upload Vocal Recording (Single File)"
                id="analyze-recording"
              />
              <div>
                <Label htmlFor="userDetails" className="block mb-1 text-sm font-medium">User Details (Optional)</Label>
                <Textarea
                  id="userDetails"
                  placeholder="Any relevant background, goals, or preferences (e.g., 'Practicing for a public speech')."
                  value={performanceUserDetails}
                  onChange={(e) => setPerformanceUserDetails(e.target.value)}
                  rows={3}
                />
              </div>
              <Button onClick={handleAnalyzePerformance} disabled={isAnalyzing} className="w-full sm:w-auto">
                <Sparkles className="mr-2 h-4 w-4" />
                {isAnalyzing ? "Analyzing..." : "Analyze Performance"}
              </Button>
              {analysisResult && (
                <div className="mt-4 p-4 border rounded-md bg-muted space-y-2">
                  <h4 className="font-semibold">Analysis Results:</h4>
                  <p><strong>Clarity:</strong> {analysisResult.clarity}</p>
                  <p><strong>Emotion:</strong> {analysisResult.emotion}</p>
                  <p><strong>Expressiveness:</strong> {analysisResult.expressiveness}</p>
                  <p><strong>Overall Feedback:</strong> {analysisResult.overallFeedback}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summarize">
          <Card>
            <CardHeader>
              <CardTitle>Summarize Vocal Statistics (YouTube)</CardTitle>
              <CardDescription>Get AI-driven summaries and improvement suggestions for channel content.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div>
                <Label htmlFor="videoTitle" className="block mb-1 text-sm font-medium">Video Title</Label>
                <Input id="videoTitle" placeholder="Enter YouTube video title" value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="videoDescription" className="block mb-1 text-sm font-medium">Video Description</Label>
                <Textarea id="videoDescription" placeholder="Enter YouTube video description" value={videoDescription} onChange={(e) => setVideoDescription(e.target.value)} rows={3} />
              </div>
               <FileUpload 
                onFileChange={(uri) => setAudioAnalysisDataUri(uri as string)} 
                label="Upload Audio Analysis Data (e.g., JSON, TXT)"
                accept=".json,.txt"
                id="summarize-audio-data"
              />
              <div>
                <Label htmlFor="channelName" className="block mb-1 text-sm font-medium">Channel Name</Label>
                <Input id="channelName" placeholder="Enter YouTube channel name" value={channelName} onChange={(e) => setChannelName(e.target.value)} />
              </div>
              <Button onClick={handleSummarizeStats} disabled={isSummarizing} className="w-full sm:w-auto">
                <Sparkles className="mr-2 h-4 w-4" />
                {isSummarizing ? "Summarizing..." : "Summarize Statistics"}
              </Button>
              {summaryResult && (
                <div className="mt-4 p-4 border rounded-md bg-muted space-y-2">
                  <h4 className="font-semibold">Summary & Suggestions:</h4>
                  <p><strong>Summary:</strong> {summaryResult.summary}</p>
                  <p><strong>Suggested Improvements:</strong> {summaryResult.suggestedImprovements}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="suggest">
          <Card>
            <CardHeader>
              <CardTitle>Suggest Vocal Adjustments</CardTitle>
              <CardDescription>Get real-time AI suggestions for vocal technique.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FileUpload 
                onFileChange={(uri) => setAdjustmentVoiceSample(uri as string)} 
                label="Upload Voice Sample (Single File)"
                id="suggest-voice-sample"
              />
              <div>
                <Label htmlFor="desiredChars" className="block mb-1 text-sm font-medium">Desired Vocal Characteristics</Label>
                <Textarea
                  id="desiredChars"
                  placeholder="Describe the vocal characteristics you're aiming for (e.g., 'A clearer, more resonant tone')."
                  value={desiredVocalChars}
                  onChange={(e) => setDesiredVocalChars(e.target.value)}
                  rows={3}
                />
              </div>
              <Button onClick={handleSuggestAdjustments} disabled={isSuggesting} className="w-full sm:w-auto">
                <Sparkles className="mr-2 h-4 w-4" />
                {isSuggesting ? "Getting Suggestions..." : "Get Adjustments"}
              </Button>
              {adjustmentSuggestion && (
                <div className="mt-4 p-4 border rounded-md bg-muted">
                  <h4 className="font-semibold mb-2">Suggested Adjustments:</h4>
                  <p className="text-sm">{adjustmentSuggestion.suggestedAdjustments}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </PageContainer>
  );
}
