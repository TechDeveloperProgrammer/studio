
"use client";

import { PageContainer } from "@/components/page-container";
import { PageHeader } from "@/components/page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { User, Edit3, Mail, Calendar, BarChartHorizontalBig, ShieldCheck, Star, Zap, Mic, Smile, MessageSquareText } from "lucide-react"; // Added Smile, MessageSquareText
import Image from "next/image";

export default function ProfilePage() {
  return (
    <PageContainer>
      <PageHeader
        title="Perfil de Usuario"
        description="Gestiona los detalles de tu cuenta y sigue tu viaje vocal."
      />
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="items-center text-center">
              <Avatar className="w-24 h-24 mb-4 ring-2 ring-primary ring-offset-2 ring-offset-background">
                <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="person portrait" />
                <AvatarFallback>VE</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">VocalExplorer</CardTitle>
              <CardDescription>Se unió: Enero 1, 2024</CardDescription>
              <Button size="sm" variant="outline" className="mt-2">
                <Edit3 className="mr-2 h-4 w-4" /> Editar Perfil
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>explorer@nexusvocality.app</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>Última actividad: Hoy</span>
              </div>
               <div className="flex items-center gap-2 text-sm">
                <ShieldCheck className="w-4 h-4 text-muted-foreground" />
                <span>Estado de cuenta: Verificado</span>
              </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><User className="w-5 h-5"/> Biografía</CardTitle>
            </CardHeader>
            <CardContent>
                <Textarea defaultValue="Apasionado/a por el entrenamiento vocal y la exploración de nuevos paisajes sonoros. ¡Usando Nexus Vocality para encontrar mi verdadera voz!" rows={4} />
                 <Button size="sm" className="mt-3 w-full">Guardar Biografía</Button>
            </CardContent>
           </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BarChartHorizontalBig className="w-5 h-5" /> Resumen de Progreso Vocal</CardTitle>
              <CardDescription>Un resumen de tus logros y estadísticas de entrenamiento.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="flex items-center gap-1">Progreso General de Feminización de Voz <ShieldCheck className="w-4 h-4 text-pink-500" /></Label>
                <Progress value={60} className="h-3 mt-1" />
              </div>
              <div>
                <Label className="flex items-center gap-1">Precisión en Canto <Star className="w-4 h-4 text-yellow-500" /></Label>
                <Progress value={35} className="h-3 mt-1" />
              </div>
              <div>
                <Label className="flex items-center gap-1">Potencia de Proyección <Zap className="w-4 h-4 text-blue-500" /></Label>
                <Progress value={80} className="h-3 mt-1" />
              </div>
              <div>
                <Label className="flex items-center gap-1">Claridad Vocal <MessageSquareText className="w-4 h-4 text-green-500" /></Label>
                <Progress value={70} className="h-3 mt-1" />
              </div>
              <div>
                <Label className="flex items-center gap-1">Naturalidad del Habla <Smile className="w-4 h-4 text-teal-500" /></Label>
                <Progress value={55} className="h-3 mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-center pt-4">
                <div>
                    <p className="text-2xl font-bold">15</p>
                    <p className="text-sm text-muted-foreground">Rutinas Completadas</p>
                </div>
                 <div>
                    <p className="text-2xl font-bold">120</p>
                    <p className="text-sm text-muted-foreground">Horas Entrenadas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente (Placeholder)</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="p-3 border rounded-md hover:bg-muted/50">Completado 'Desafío de Deslizamiento de Tono'. +50XP</li>
                <li className="p-3 border rounded-md hover:bg-muted/50">Practicado 'Feminización de Voz - Módulo 3'.</li>
                <li className="p-3 border rounded-md hover:bg-muted/50">Nueva grabación 'Mi Idea de Canción' analizada.</li>
              </ul>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
                <CardTitle>Logros (Placeholder)</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="flex flex-col items-center p-3 border rounded-md text-center">
                    <Star className="w-8 h-8 text-yellow-400 mb-1"/>
                    <p className="text-sm font-medium">Primeros Pasos</p>
                    <p className="text-xs text-muted-foreground">Completada 1ª rutina.</p>
                </div>
                 <div className="flex flex-col items-center p-3 border rounded-md text-center">
                    <Zap className="w-8 h-8 text-blue-400 mb-1"/>
                    <p className="text-sm font-medium">Explorador Vocal</p>
                    <p className="text-xs text-muted-foreground">10 horas entrenadas.</p>
                </div>
                 <div className="flex flex-col items-center p-3 border rounded-md text-center opacity-50">
                    <Mic className="w-8 h-8 text-gray-400 mb-1"/>
                    <p className="text-sm font-medium">Pro de Grabación</p>
                    <p className="text-xs text-muted-foreground">10 grabaciones analizadas.</p>
                </div>
            </CardContent>
           </Card>
        </div>
      </div>
    </PageContainer>
  );
}

    