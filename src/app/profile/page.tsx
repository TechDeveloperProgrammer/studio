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
import { User, Edit3, Mail, Calendar, BarChartHorizontalBig, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  return (
    <PageContainer>
      <PageHeader
        title="User Profile"
        description="Manage your account details and track your vocal journey."
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
              <CardDescription>Joined: January 1, 2024</CardDescription>
              <Button size="sm" variant="outline" className="mt-2">
                <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>explorer@nexusvocality.app</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>Last active: Today</span>
              </div>
               <div className="flex items-center gap-2 text-sm">
                <ShieldCheck className="w-4 h-4 text-muted-foreground" />
                <span>Account Status: Verified</span>
              </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><User className="w-5 h-5"/> Bio</CardTitle>
            </CardHeader>
            <CardContent>
                <Textarea defaultValue="Passionate about vocal training and exploring new soundscapes. Using Nexus Vocality to find my true voice!" rows={4} />
                 <Button size="sm" className="mt-3 w-full">Save Bio</Button>
            </CardContent>
           </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BarChartHorizontalBig className="w-5 h-5" /> Vocal Progress Overview</CardTitle>
              <CardDescription>A summary of your achievements and training statistics.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Overall Voice Feminization Progress</Label>
                <Progress value={60} className="h-3 mt-1" />
              </div>
              <div>
                <Label>Singing Accuracy</Label>
                <Progress value={35} className="h-3 mt-1" />
              </div>
              <div>
                <Label>Projection Power Score</Label>
                <Progress value={80} className="h-3 mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-center pt-4">
                <div>
                    <p className="text-2xl font-bold">15</p>
                    <p className="text-sm text-muted-foreground">Routines Completed</p>
                </div>
                 <div>
                    <p className="text-2xl font-bold">120</p>
                    <p className="text-sm text-muted-foreground">Hours Trained</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity (Placeholder)</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="p-3 border rounded-md hover:bg-muted/50">Completed 'Pitch Glide Challenge'. +50XP</li>
                <li className="p-3 border rounded-md hover:bg-muted/50">Practiced 'Voice Feminization - Module 3'.</li>
                <li className="p-3 border rounded-md hover:bg-muted/50">New recording 'My Song Idea' analyzed.</li>
              </ul>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
                <CardTitle>Achievements (Placeholder)</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="flex flex-col items-center p-3 border rounded-md text-center">
                    <Star className="w-8 h-8 text-yellow-400 mb-1"/>
                    <p className="text-sm font-medium">First Steps</p>
                    <p className="text-xs text-muted-foreground">Completed 1st routine.</p>
                </div>
                 <div className="flex flex-col items-center p-3 border rounded-md text-center">
                    <Zap className="w-8 h-8 text-blue-400 mb-1"/>
                    <p className="text-sm font-medium">Vocal Explorer</p>
                    <p className="text-xs text-muted-foreground">10 hours trained.</p>
                </div>
                 <div className="flex flex-col items-center p-3 border rounded-md text-center opacity-50">
                    <Mic className="w-8 h-8 text-gray-400 mb-1"/>
                    <p className="text-sm font-medium">Recording Pro</p>
                    <p className="text-xs text-muted-foreground">10 recordings analyzed.</p>
                </div>
            </CardContent>
           </Card>
        </div>
      </div>
    </PageContainer>
  );
}
