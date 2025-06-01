
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
import { SlidersHorizontal, ListMusic, Save, PlayCircle, Settings2, Waves, ALargeSmall, Palette, Speaker, Music3, Droplet, MoveVertical } from "lucide-react";
import Image from "next/image";

const initialPresets = [
  { id: "1", name: "Predeterminado Masculino" },
  { id: "2", name: "Predeterminado Femenino" },
  { id: "3", name: "Canto Tenor" },
  { id: "4", name: "Voz de Streamer" },
];

export default function VocalEnginePage() {
  const [pitch, setPitch] = useState([0]);
  const [formants, setFormants] = useState([0]);
  const [timbre, setTimbre] = useState([0]);
  const [ritmo, setRitmo] = useState([0]);
  const [volumen, setVolumen] = useState([100]);
  
  const [eqLow, setEqLow] = useState([0]);
  const [eqMid, setEqMid] = useState([0]);
  const [eqHigh, setEqHigh] = useState([0]);

  const [reverb, setReverb] = useState([0]);
  const [compression, setCompression] = useState([0]);

  const [realtimePreview, setRealtimePreview] = useState(true);
  const [lowLatencyMode, setLowLatencyMode] = useState(false);

  const [presets, setPresets] = useState(initialPresets);
  const [newPresetName, setNewPresetName] = useState("");
  const [isSavePresetDialogOpen, setIsSavePresetDialogOpen] = useState(false);

  const handleSavePreset = () => {
    if (newPresetName.trim() === "") return; 
    setPresets([
      ...presets,
      { id: String(presets.length + 1), name: newPresetName },
    ]);
    setNewPresetName("");
    setIsSavePresetDialogOpen(false);
  };
  
  const handleLoadPreset = (presetName: string) => {
    // Placeholder for actual preset loading logic
    console.log(`Cargando preset: ${presetName}`);
  };


  return (
    <PageContainer>
      <PageHeader
        title="Motor Vocal"
        description="Controla y modula tu voz con precisión en tiempo real."
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <FeatureCard title="Parámetros Vocales" icon={<SlidersHorizontal className="w-6 h-6" />}>
            <div className="space-y-6 p-4">
              <div>
                <Label htmlFor="pitch-slider" className="flex items-center gap-2 mb-2 text-sm font-medium"><Music3 className="w-4 h-4" />Tono (Pitch): {pitch[0]}</Label>
                <Slider id="pitch-slider" defaultValue={pitch} min={-100} max={100} step={1} onValueChange={setPitch} />
              </div>
              <div>
                <Label htmlFor="formants-slider" className="flex items-center gap-2 mb-2 text-sm font-medium"><Waves className="w-4 h-4" />Formantes: {formants[0]}</Label>
                <Slider id="formants-slider" defaultValue={formants} min={-100} max={100} step={1} onValueChange={setFormants} />
              </div>
              <div>
                <Label htmlFor="timbre-slider" className="flex items-center gap-2 mb-2 text-sm font-medium"><Palette className="w-4 h-4" />Timbre: {timbre[0]}</Label>
                <Slider id="timbre-slider" defaultValue={timbre} min={-100} max={100} step={1} onValueChange={setTimbre} />
              </div>
              <div>
                <Label htmlFor="ritmo-slider" className="flex items-center gap-2 mb-2 text-sm font-medium"><ALargeSmall className="w-4 h-4" />Ritmo: {ritmo[0]}</Label>
                <Slider id="ritmo-slider" defaultValue={ritmo} min={-50} max={50} step={1} onValueChange={setRitmo} />
              </div>
              <div>
                <Label htmlFor="volumen-slider" className="flex items-center gap-2 mb-2 text-sm font-medium"><Speaker className="w-4 h-4" />Volumen: {volumen[0]}%</Label>
                <Slider id="volumen-slider" defaultValue={volumen} min={0} max={100} step={1} onValueChange={setVolumen} />
              </div>
            </div>
          </FeatureCard>

          <FeatureCard title="Ecualización" icon={<SlidersHorizontal className="w-6 h-6" />}>
            <div className="space-y-6 p-4">
              <div>
                <Label htmlFor="eq-low-slider" className="block mb-2 text-sm font-medium">Graves: {eqLow[0]} dB</Label>
                <Slider id="eq-low-slider" defaultValue={eqLow} min={-12} max={12} step={1} onValueChange={setEqLow} />
              </div>
              <div>
                <Label htmlFor="eq-mid-slider" className="block mb-2 text-sm font-medium">Medios: {eqMid[0]} dB</Label>
                <Slider id="eq-mid-slider" defaultValue={eqMid} min={-12} max={12} step={1} onValueChange={setEqMid} />
              </div>
              <div>
                <Label htmlFor="eq-high-slider" className="block mb-2 text-sm font-medium">Agudos: {eqHigh[0]} dB</Label>
                <Slider id="eq-high-slider" defaultValue={eqHigh} min={-12} max={12} step={1} onValueChange={setEqHigh} />
              </div>
            </div>
          </FeatureCard>

          <FeatureCard title="Efectos Vocales" icon={<Settings2 className="w-6 h-6" />}>
            <div className="space-y-6 p-4">
              <div>
                <Label htmlFor="reverb-slider" className="flex items-center gap-2 mb-2 text-sm font-medium"><Droplet className="w-4 h-4" />Reverb: {reverb[0]}%</Label>
                <Slider id="reverb-slider" defaultValue={reverb} min={0} max={100} step={1} onValueChange={setReverb} />
              </div>
              <div>
                <Label htmlFor="compression-slider" className="flex items-center gap-2 mb-2 text-sm font-medium"><MoveVertical className="w-4 h-4" />Compresión: {compression[0]}%</Label>
                <Slider id="compression-slider" defaultValue={compression} min={0} max={100} step={1} onValueChange={setCompression} />
              </div>
            </div>
          </FeatureCard>
          
          <FeatureCard title="Visualizador en Tiempo Real" description="Observa la modulación de tu voz en acción.">
             <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                <Image src="https://placehold.co/600x300.png?text=Visualizador+de+Voz" alt="Visualizador de Voz Placeholder" width={600} height={300} className="object-cover rounded-md" data-ai-hint="sound wave frequency" />
             </div>
          </FeatureCard>
        </div>

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
                  <Save className="mr-2 h-4 w-4" /> Guardar Preset Actual
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Guardar Preset</DialogTitle>
                  <DialogDescription>
                    Introduce un nombre para tu configuración vocal actual.
                  </DialogDescription>
                </DialogHeader>
                <Input
                  placeholder="Nombre del preset"
                  value={newPresetName}
                  onChange={(e) => setNewPresetName(e.target.value)}
                  className="my-4"
                />
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsSavePresetDialogOpen(false)}>Cancelar</Button>
                  <Button onClick={handleSavePreset}>Guardar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </FeatureCard>

          <FeatureCard title="Modo en Vivo y Ajustes" icon={<Settings2 className="w-6 h-6" />}>
            <div className="space-y-4 p-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="realtime-preview-switch">Vista Previa en Tiempo Real</Label>
                <Switch
                  id="realtime-preview-switch"
                  checked={realtimePreview}
                  onCheckedChange={setRealtimePreview}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="low-latency-switch">Modo Baja Latencia (Streaming)</Label>
                <Switch
                  id="low-latency-switch"
                  checked={lowLatencyMode}
                  onCheckedChange={setLowLatencyMode}
                />
              </div>
              <Button variant="secondary" className="w-full mt-2">
                <PlayCircle className="mr-2 h-4 w-4" /> Probar Salida
              </Button>
            </div>
          </FeatureCard>
        </div>
      </div>
    </PageContainer>
  );
}
