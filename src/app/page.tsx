"use client";

import { PageContainer } from "@/components/page-container";
import { PageHeader } from "@/components/page-header";
import { FeatureCard } from "@/components/feature-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SlidersHorizontal, Target, AudioWaveform, Brain, Zap, BarChart3, UploadCloud } from "lucide-react";

export default function DashboardPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Welcome to Nexus Vocality"
        description="Your advanced toolkit for vocal transformation and mastery."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          title="Vocal Engine"
          description="Tune your voice in real-time with precise controls."
          icon={<SlidersHorizontal className="w-8 h-8" />}
          footerContent={
            <Link href="/vocal-engine" passHref>
              <Button className="w-full">Open Vocal Engine</Button>
            </Link>
          }
        >
          <p className="text-sm text-muted-foreground">
            Access pitch, timbre, formants, and dynamics settings. Save and load your favorite presets.
          </p>
        </FeatureCard>

        <FeatureCard
          title="Training System"
          description="Personalized routines to achieve your vocal goals."
          icon={<Target className="w-8 h-8" />}
          footerContent={
            <Link href="/training-system" passHref>
              <Button className="w-full">Start Training</Button>
            </Link>
          }
        >
          <p className="text-sm text-muted-foreground">
            Explore routines for voice feminization, singing, projection, and more. Track your progress.
          </p>
        </FeatureCard>

        <FeatureCard
          title="Vocal Studio"
          description="Record, analyze, and compare your vocal performances."
          icon={<AudioWaveform className="w-8 h-8" />}
          footerContent={
            <Link href="/vocal-studio" passHref>
              <Button className="w-full">Go to Studio</Button>
            </Link>
          }
        >
          <p className="text-sm text-muted-foreground">
            Utilize spectrograms, pitch curves, and AI feedback to refine your voice.
          </p>
        </FeatureCard>

        <FeatureCard
          title="Predictive AI"
          description="Leverage AI for voice analysis and personalized suggestions."
          icon={<Brain className="w-8 h-8" />}
          footerContent={
            <Link href="/predictive-ai" passHref>
              <Button className="w-full">Access AI Tools</Button>
            </Link>
          }
        >
          <p className="text-sm text-muted-foreground">
            Get insights on emotion, clarity, and expressiveness. Train AI with your voice.
          </p>
        </FeatureCard>
        
        <FeatureCard
          title="Quick Record & Analyze"
          description="Instantly record a snippet and get quick AI feedback."
          icon={<Zap className="w-8 h-8" />}
          footerContent={
             <Link href="/vocal-studio" passHref>
              <Button className="w-full" variant="secondary">Record Now</Button>
             </Link>
          }
        >
          <p className="text-sm text-muted-foreground">
            Perfect for on-the-fly checks and practice sessions.
          </p>
        </FeatureCard>

        <FeatureCard
          title="View Your Progress"
          description="Track your vocal development statistics over time."
          icon={<BarChart3 className="w-8 h-8" />}
           footerContent={
             <Link href="/profile" passHref>
                <Button className="w-full" variant="outline">See Stats</Button>
             </Link>
          }
        >
          <p className="text-sm text-muted-foreground">
            Monitor improvements and identify areas for further training. (Placeholder)
          </p>
        </FeatureCard>
      </div>
    </PageContainer>
  );
}
