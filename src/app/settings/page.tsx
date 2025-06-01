"use client";

import { PageContainer } from "@/components/page-container";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Palette, ShieldCheck, Languages, HardDrive } from "lucide-react";

export default function SettingsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Settings"
        description="Configure your Nexus Vocality experience."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bell className="w-5 h-5" /> Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="training-reminders">Training Reminders</Label>
              <Switch id="training-reminders" defaultChecked />
            </div>
            <Button variant="outline" className="w-full">Manage Notification Preferences</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Palette className="w-5 h-5" /> Appearance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <Switch id="dark-mode" />
            </div>
            <p className="text-sm text-muted-foreground">Theme selection and visual adjustments will be available here.</p>
            <Button variant="outline" className="w-full">Customize Theme (Soon)</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> Account & Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="VocalExplorer" />
            </div>
            <Button variant="outline" className="w-full">Change Password</Button>
            <Button variant="destructive" className="w-full">Delete Account</Button>
             <p className="text-xs text-muted-foreground">Manage your data and privacy settings.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Languages className="w-5 h-5" /> Language & Region</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Label htmlFor="language-select">Application Language</Label>
            <Input id="language-select" defaultValue="English (US)" disabled />
            <p className="text-sm text-muted-foreground">More languages will be supported soon.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><HardDrive className="w-5 h-5" /> Data & Storage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Manage offline data, cache, and storage settings.</p>
            <Button variant="outline" className="w-full">Manage Local Storage (Soon)</Button>
            <Button variant="outline" className="w-full">Export All My Data</Button>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
