
"use client";

import { useState, useEffect } from "react";
import { PageContainer } from "@/components/page-container";
import { PageHeader } from "@/components/page-header";
import { FeatureCard } from "@/components/feature-card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mic, StopCircle, Play, Pause, Download, Upload, GitCompareArrows, Wand2, FileAudio } from "lucide-react";
import Image from "next/image";
import { analyzeVocalPerformance, type AnalyzeVocalPerformanceOutput } from "@/ai/flows/analyze-vocal-performance";
import { FileUpload } from "@/components/file-upload";
import { useToast } from "@/hooks/use-toast";

export default function VocalStudioPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("wav");
  const [analysisResult, setAnalysisResult] = useState<AnalyzeVocalPerformanceOutput | null>(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
  const [recordingDataUri, setRecordingDataUri] = useState<string | null>(null);
  const [userDetailsForAnalysis, setUserDetailsForAnalysis] = useState("");

  const { toast } = useToast();

  // Effect to simulate recording state for demo purposes
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecording) {
      timer = setTimeout(() => {
        setIsRecording(false);
        toast({ title: "Recording Stopped", description: "Recording finished after 5 seconds (demo)." });
        // Simulate a recording URI
        setRecordingDataUri("data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAAABkYXRhAAAAAA=="); 
      }, 5000); // Stop recording after 5 seconds
    }
    return () => clearTimeout(timer);
  }, [isRecording, toast]);

  const handleRecord = () => {
    setIsRecording(true);
    setRecordingDataUri(null); // Clear previous recording
    setAnalysisResult(null); // Clear previous analysis
    toast({ title: "Recording Started", description: "Recording for 5 seconds (demo)..." });
  };

  const handleStop = () => {
    setIsRecording(false);
  };

  const handlePlay = () => {
    if (!recordingDataUri) {
      toast({ title: "No recording", description: "Please record or upload audio first.", variant: "destructive"});
      return;
    }
    setIsPlaying(true);
    // Placeholder for actual playback logic
    toast({ title: "Playback Started", description: "Playing recorded audio (demo)..." });
    setTimeout(() => setIsPlaying(false), 3000); // Simulate playback duration
  };
  
  const handlePause = () => {
    setIsPlaying(false);
    // Placeholder for actual pause logic
    toast({ title: "Playback Paused" });
  };

  const handleAnalyze = async () => {
    if (!recordingDataUri) {
      toast({ title: "Error", description: "Please record or upload audio before analyzing.", variant: "destructive" });
      return;
    }
    setIsLoadingAnalysis(true);
    setAnalysisResult(null);
    try {
      const result = await analyzeVocalPerformance({ recordingDataUri, userDetails: userDetailsForAnalysis });
      setAnalysisResult(result);
      toast({ title: "Analysis Complete", description: "Vocal performance analysis is ready." });
    } catch (error) {
      console.error("Error analyzing vocal performance:", error);
      toast({ title: "Analysis Failed", description: String(error) || "An unknown error occurred.", variant: "destructive" });
    } finally {
      setIsLoadingAnalysis(false);
    }
  };

  const handleFileUploadedForAnalysis = (dataUri: string | string[]) => {
    if (typeof dataUri === 'string') {
      setRecordingDataUri(dataUri);
      setAnalysisResult(null); // Clear previous analysis when new file is uploaded
      toast({ title: "File Uploaded", description: "Audio file is ready for analysis or playback." });
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title="Vocal Studio"
        description="Record, compare, analyze, and export your vocal performances."
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recording & Playback Column */}
        <div className="lg:col-span-2 space-y-6">
          <FeatureCard title="Recording Controls" icon={<Mic className="w-6 h-6" />}>
            <div className="flex flex-wrap items-center gap-4 p-2">
              <Button onClick={isRecording ? handleStop : handleRecord} disabled={isPlaying} className="min-w-[120px]">
                {isRecording ? <StopCircle className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
                {isRecording ? "Stop" : "Record"}
              </Button>
              <Button onClick={isPlaying ? handlePause : handlePlay} disabled={isRecording || !recordingDataUri} variant="secondary" className="min-w-[120px]">
                {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <div className="flex items-center gap-2">
                <Label htmlFor="format-select">Format:</Label>
                <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                  <SelectTrigger id="format-select" className="w-[100px]">
                    <SelectValue placeholder="Format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wav">.wav</SelectItem>
                    <SelectItem value="ogg">.ogg</SelectItem>
                    <SelectItem value="flac">.flac</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {isRecording && <p className="text-sm text-destructive p-2">Recording in progress... (Demo: 5s)</p>}
            {recordingDataUri && !isRecording && <p className="text-sm text-green-600 p-2">Recording available. Ready to play or analyze.</p>}
             <div className="p-2">
                <FileUpload 
                    onFileChange={handleFileUploadedForAnalysis} 
                    label="Or Upload Audio File" 
                    accept="audio/*"
                    id="studio-audio-upload"
                />
            </div>
          </FeatureCard>

          <div className="grid md:grid-cols-2 gap-6">
            <FeatureCard title="Spectrogram" icon={<FileAudio className="w-6 h-6" />}>
              <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                 <Image src="https://placehold.co/400x225.png?text=Spectrogram" alt="Spectrogram Placeholder" width={400} height={225} className="object-cover rounded-md" data-ai-hint="audio spectrum" />
              </div>
            </FeatureCard>
            <FeatureCard title="Pitch Curve" icon={<FileAudio className="w-6 h-6" />}>
              <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                <Image src="https://placehold.co/400x225.png?text=Pitch+Curve" alt="Pitch Curve Placeholder" width={400} height={225} className="object-cover rounded-md" data-ai-hint="audio pitch" />
              </div>
            </FeatureCard>
          </div>

          <FeatureCard title="A/B Comparison" icon={<GitCompareArrows className="w-6 h-6" />}>
            <div className="p-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline"><Upload className="mr-2 h-4 w-4" /> Load Recording A</Button>
                <Button variant="outline"><Upload className="mr-2 h-4 w-4" /> Load Recording B</Button>
              </div>
              <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Synced visualization placeholder</p>
              </div>
            </div>
          </FeatureCard>
        </div>

        {/* Analysis & Export Column */}
        <div className="space-y-6">
          <FeatureCard title="AI Analysis" icon={<Wand2 className="w-6 h-6 />}>
            <div className="p-2 space-y-4">
              <Textarea 
                placeholder="Optional: Provide details about your goals or preferences for this recording (e.g., 'Practicing for a public speech', 'Trying to sound more confident')."
                value={userDetailsForAnalysis}
                onChange={(e) => setUserDetailsForAnalysis(e.target.value)}
                rows={3}
              />
              <Button onClick={handleAnalyze} disabled={isLoadingAnalysis || !recordingDataUri} className="w-full">
                {isLoadingAnalysis ? "Analyzing..." : "Analyze with AI"}
              </Button>
              {analysisResult && (
                <div className="mt-4 space-y-3 text-sm border p-3 rounded-md bg-muted/50">
                  <h4 className="font-semibold mb-2">Analysis Results:</h4>
                  
                  <div className="space-y-1">
                    <p><strong>Clarity:</strong> {analysisResult.clarityScore}/10</p>
                    <p className="text-xs text-muted-foreground pl-4">{analysisResult.clarity}</p>
                  </div>
                  <div className="space-y-1">
                    <p><strong>Emotion:</strong> {analysisResult.emotionScore}/10</p>
                    <p className="text-xs text-muted-foreground pl-4">{analysisResult.emotion}</p>
                  </div>
                  <div className="space-y-1">
                    <p><strong>Expressiveness:</strong> {analysisResult.expressivenessScore}/10</p>
                    <p className="text-xs text-muted-foreground pl-4">{analysisResult.expressiveness}</p>
                  </div>
                  <div className="space-y-1">
                    <p><strong>Prosody:</strong> {analysisResult.prosodyScore}/10</p>
                    <p className="text-xs text-muted-foreground pl-4">{analysisResult.prosody}</p>
                  </div>
                  <div className="space-y-1">
                    <p><strong>Fluency:</strong> {analysisResult.fluencyScore}/10</p>
                    <p className="text-xs text-muted-foreground pl-4">{analysisResult.fluency}</p>
                  </div>
                   <div className="space-y-1 pt-2">
                    <p><strong>Overall Technical Score:</strong> {analysisResult.technicalScore}/10</p>
                  </div>
                  <div className="space-y-1 pt-2">
                    <p><strong>Overall Feedback:</strong></p>
                    <p className="text-xs text-muted-foreground pl-4">{analysisResult.overallFeedback}</p>
                  </div>
                </div>
              )}
            </div>
          </FeatureCard>

          <FeatureCard title="Export" icon={<Download className="w-6 h-6" />}>
            <div className="p-2 space-y-3">
              <Button className="w-full" disabled={!recordingDataUri}>
                <Download className="mr-2 h-4 w-4" /> Export Audio ({selectedFormat.toUpperCase()})
              </Button>
              <Button variant="secondary" className="w-full" disabled={!recordingDataUri}>
                Export Audiovisual (Video + Audio + Subs)
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                More export options coming soon.
              </p>
            </div>
          </FeatureCard>
        </div>
      </div>
    </PageContainer>
  );
}

