"use client";

import { useState } from "react";
import { PageContainer } from "@/components/page-container";
import { PageHeader } from "@/components/page-header";
import { FeatureCard } from "@/components/feature-card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SlidersHorizontal, ListMusic, Save, PlayCircle, Settings2 } from "lucide-react";
import Image from "next/image";

const initialPresets = [
  { id: "1", name: "Default Male" },
  { id: "2", name: "Default Female" },
  { id: "3", name: "Singing Tenor" },
  { id: "4", name: "Streamer Voice" },
];

export default function VocalEnginePage() {
  const [pitch, setPitch] = useState([0]);
  const [timbre, setTimbre] = useState([0]);
  const [formants, setFormants] = useState([0]);
  const [harmonization, setHarmonization] = useState([0]);
  const [dynamics, setDynamics] = useState([0]);

  const [realtimePreview, setRealtimePreview] = useState(true);
  const [lowLatencyMode, setLowLatencyMode] = useState(false);

  const [presets, setPresets] = useState(initialPresets);
  const [newPresetName, setNewPresetName] = useState("");
  const [isSavePresetDialogOpen, setIsSavePresetDialogOpen] = useState(false);

  const handleSavePreset = () => {
    if (newPresetName.trim() === "") return; // Basic validation
    setPresets([
      ...presets,
      { id: String(presets.length + 1), name: newPresetName },
    ]);
    setNewPresetName("");
    setIsSavePresetDialogOpen(false);
  };
  
  const handleLoadPreset = (presetName: string) => {
    // Placeholder: In a real app, this would load settings from the preset
    console.log(`Loading preset: ${presetName}`);
    // Example: setPitch([-10]); setTimbre([5]); ...
  };


  return (
    <PageContainer>
      <PageHeader
        title="Vocal Engine"
        description="Precisely control and modulate your voice in real-time."
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-2 space-y-6">
          <FeatureCard title="Voice Parameters" icon={<SlidersHorizontal className="w-6 h-6" />}>
            <div className="space-y-6 p-2">
              <div>
                <Label htmlFor="pitch-slider" className="block mb-2 text-sm font-medium">Pitch: {pitch[0]}</Label>
                <Slider id="pitch-slider" defaultValue={pitch} min={-100} max={100} step={1} onValueChange={setPitch} />
              </div>
              <div>
                <Label htmlFor="timbre-slider" className="block mb-2 text-sm font-medium">Timbre: {timbre[0]}</Label>
                <Slider id="timbre-slider" defaultValue={timbre} min={-100} max={100} step={1} onValueChange={setTimbre} />
              </div>
              <div>
                <Label htmlFor="formants-slider" className="block mb-2 text-sm font-medium">Formants: {formants[0]}</Label>
                <Slider id="formants-slider" defaultValue={formants} min={-100} max={100} step={1} onValueChange={setFormants} />
              </div>
              <div>
                <Label htmlFor="harmonization-slider" className="block mb-2 text-sm font-medium">Harmonization: {harmonization[0]}</Label>
                <Slider id="harmonization-slider" defaultValue={harmonization} min={-100} max={100} step={1} onValueChange={setHarmonization} />
              </div>
              <div>
                <Label htmlFor="dynamics-slider" className="block mb-2 text-sm font-medium">Dynamics: {dynamics[0]}</Label>
                <Slider id="dynamics-slider" defaultValue={dynamics} min={-100} max={100} step={1} onValueChange={setDynamics} />
              </div>
            </div>
          </FeatureCard>

          <FeatureCard title="Real-time Visualizer" description="See your voice modulation in action.">
             <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                <Image src="https://placehold.co/600x300.png?text=Voice+Visualizer" alt="Voice Visualizer Placeholder" width={600} height={300} className="object-cover rounded-md" data-ai-hint="sound wave frequency" />
             </div>
          </FeatureCard>
        </div>

        {/* Sidebar Column (Presets & Settings) */}
        <div className="space-y-6">
          <FeatureCard title="Presets" icon={<ListMusic className="w-6 h-6" />}>
            <ScrollArea className="h-[200px] p-1">
              <div className="space-y-2">
                {presets.map((preset) => (
                  <Button
                    key={preset.id}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleLoadPreset(preset.name)}
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>
            </ScrollArea>
            <Separator className="my-4" />
            <Dialog open={isSavePresetDialogOpen} onOpenChange={setIsSavePresetDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Save className="mr-2 h-4 w-4" /> Save Current Preset
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Save Preset</DialogTitle>
                  <DialogDescription>
                    Enter a name for your current vocal settings.
                  </DialogDescription>
                </DialogHeader>
                <Input
                  placeholder="Preset name"
                  value={newPresetName}
                  onChange={(e) => setNewPresetName(e.target.value)}
                  className="my-4"
                />
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsSavePresetDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleSavePreset}>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </FeatureCard>

          <FeatureCard title="Live Mode & Settings" icon={<Settings2 className="w-6 h-6" />}>
            <div className="space-y-4 p-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="realtime-preview-switch">Real-time Preview</Label>
                <Switch
                  id="realtime-preview-switch"
                  checked={realtimePreview}
                  onCheckedChange={setRealtimePreview}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="low-latency-switch">Low-latency Mode (for Streaming)</Label>
                <Switch
                  id="low-latency-switch"
                  checked={lowLatencyMode}
                  onCheckedChange={setLowLatencyMode}
                />
              </div>
              <Button variant="secondary" className="w-full mt-2">
                <PlayCircle className="mr-2 h-4 w-4" /> Test Output
              </Button>
            </div>
          </FeatureCard>
        </div>
      </div>
    </PageContainer>
  );
}
