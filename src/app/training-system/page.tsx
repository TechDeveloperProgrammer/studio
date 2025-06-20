
"use client";

import { useState } from "react";
import { PageContainer } from "@/components/page-container";
import { PageHeader } from "@/components/page-header";
import { FeatureCard } from "@/components/feature-card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Zap, CalendarDays, TrendingUp, Star, ShieldQuestion, Award, Palette } from "lucide-react"; // Added Award, Palette
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const routines = [
  { id: "fem", name: "Voice Feminization", description: "Techniques for a higher, more feminine pitch and resonance.", progress: 60, icon: <Palette className="w-5 h-5 text-pink-500" /> }, // Changed icon
  { id: "sing", name: "Singing Fundamentals", description: "Improve pitch accuracy, breath control, and vocal range.", progress: 35, icon: <Star className="w-5 h-5 text-yellow-500" /> },
  { id: "proj", name: "Projection Power", description: "Learn to project your voice clearly and confidently.", progress: 80, icon: <Zap className="w-5 h-5 text-blue-500" /> },
  { id: "neut", name: "Voice Neutralization", description: "Techniques for a more androgynous vocal quality.", progress: 15, icon: <ShieldQuestion className="w-5 h-5 text-purple-500" /> },
];

const challenges = [
  { id: "c1", name: "Pitch Glide Challenge", points: 50, completed: true },
  { id: "c2", name: "Sustained Note Challenge", points: 75, completed: false },
  { id: "c3", name: "Resonance Exploration", points: 100, completed: false },
  { id: "c4", name: "Clarity Articulation Drill", points: 60, completed: false },
];

export default function TrainingSystemPage() {
  const [xp, setXp] = useState(650);
  const level = Math.floor(xp / 1000) + 1;
  const xpForNextLevel = (level * 1000) - xp;
  const currentLevelProgress = ((xp % 1000) / 1000) * 100;


  return (
    <PageContainer>
      <PageHeader
        title="Vocal Training System"
        description="Personalized routines, challenges, and progress tracking to master your voice."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Progression Section */}
        <FeatureCard title="Your Vocal Journey" icon={<TrendingUp className="w-6 h-6" />} className="lg:col-span-3">
          <div className="space-y-3 p-4">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">Level {level} - Vocal Novice</p>
              <p className="text-xs text-muted-foreground">{xp} XP / {level * 1000} XP</p>
            </div>
            <Progress value={currentLevelProgress} className="w-full h-3" />
            <p className="text-xs text-muted-foreground text-right">{xpForNextLevel > 0 ? `${xpForNextLevel} XP to next level` : "Max level reached for now!"}</p>
            <div className="mt-3 pt-3 border-t">
              <h4 className="font-semibold text-sm mb-2">Unlocked Tools & Features:</h4>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                <li>Basic Pitch Control</li>
                <li>Formant Shifter Basics</li>
                {level >= 1 && <li>Standard Recording Suite</li>}
                {level >= 2 && <li>Advanced Timbre Adjustments</li>}
                {level >= 3 && <li>AI Emotion Detector (Basic)</li>}
              </ul>
            </div>
          </div>
        </FeatureCard>

        {/* Personalized Routines Section */}
        <FeatureCard title="Personalized Routines" icon={<Zap className="w-6 h-6" />} className="md:col-span-2">
           <Accordion type="single" collapsible className="w-full px-2">
            {routines.map((routine) => (
              <AccordionItem value={`routine-${routine.id}`} key={routine.id}>
                <AccordionTrigger className="font-medium hover:no-underline py-3">
                  <div className="flex items-center gap-3">
                    {routine.icon}
                    <span className="text-base">{routine.name}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <p className="text-sm text-muted-foreground mb-3">{routine.description}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <Progress value={routine.progress} className="w-full h-2" />
                    <span className="text-xs text-muted-foreground">{routine.progress}%</span>
                  </div>
                  <Button size="sm" className="w-full">
                    {routine.progress > 0 && routine.progress < 100 ? "Continue Routine" : routine.progress === 100 ? "Review Routine" : "Start Routine"}
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FeatureCard>

        {/* Daily Schedule Section */}
        <FeatureCard title="Daily Focus" icon={<CalendarDays className="w-6 h-6" />}>
          <div className="p-4 space-y-3">
            <p className="text-sm text-muted-foreground">
              Your intelligent schedule will suggest daily tasks and reminders here.
            </p>
            <div className="aspect-video bg-muted rounded-md flex flex-col items-center justify-center p-4 text-center">
              <CalendarDays className="w-12 h-12 text-muted-foreground opacity-50 mb-2" />
              <p className="text-sm font-medium">Today's Suggestion:</p>
              <p className="text-xs text-muted-foreground">"Practice 'Pitch Glide Challenge' for 10 mins."</p>
            </div>
            <Button variant="outline" className="w-full">View Full Calendar (Soon)</Button>
          </div>
        </FeatureCard>

        {/* Micro-Challenges Section */}
        <FeatureCard title="Micro-Challenges" icon={<Award className="w-6 h-6" />} className="md:col-span-2 lg:col-span-3">
          <div className="space-y-3 p-4">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="flex items-center justify-between p-3 border rounded-md hover:bg-accent/10 transition-colors"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{challenge.name}</h4>
                  <p className="text-xs text-muted-foreground">+{challenge.points} XP</p>
                </div>
                <Button 
                  variant={challenge.completed ? "secondary" : "default"} 
                  size="sm" 
                  disabled={challenge.completed}
                  onClick={() => {
                    // Placeholder for attempting challenge
                    if (!challenge.completed) {
                      // setXp(xp + challenge.points); // This would update XP
                      // Mark challenge as completed in a real app
                      alert(`Attempting ${challenge.name}! (Actual logic not implemented)`);
                    }
                  }}
                >
                  {challenge.completed ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <Star className="mr-2 h-4 w-4" />}
                  {challenge.completed ? "Completed" : "Attempt"}
                </Button>
              </div>
            ))}
             <Button variant="link" className="w-full mt-2">View All Challenges</Button>
          </div>
        </FeatureCard>
      </div>
    </PageContainer>
  );
}

