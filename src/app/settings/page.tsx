"use client";

import { PageContainer } from "@/components/page-container";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Palette, ShieldCheck, Languages, HardDrive, Paintbrush, Settings2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
              <Label htmlFor="dark-mode">Dark Mode (System)</Label>
              <Switch id="dark-mode" onCheckedChange={(checked) => {
                if (checked) document.documentElement.classList.add('dark');
                else document.documentElement.classList.remove('dark');
              }} />
            </div>
            <div>
              <Label htmlFor="theme-select" className="flex items-center gap-2 mb-1"><Paintbrush className="w-4 h-4" /> Application Theme</Label>
              <Select defaultValue="default" onValueChange={(value) => {
                document.documentElement.classList.remove('theme-trans-affirming', 'theme-serene-focus', 'dark');
                if (value === 'dark') {
                  document.documentElement.classList.add('dark');
                } else if (value !== 'default') {
                  document.documentElement.classList.add(value);
                }
              }}>
                <SelectTrigger id="theme-select">
                  <SelectValue placeholder="Select Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default (Lavender)</SelectItem>
                  <SelectItem value="dark">Dark Mode (Manual)</SelectItem>
                  <SelectItem value="theme-trans-affirming">Trans-Affirming</SelectItem>
                  <SelectItem value="theme-serene-focus">Serene Focus</SelectItem>
                </SelectContent>
              </Select>
               <p className="text-xs text-muted-foreground mt-1">Select 'Dark Mode (System)' for OS-based dark theme.</p>
            </div>
             <div className="flex items-center justify-between pt-2">
              <Label htmlFor="simplified-mode" className="flex flex-col">
                <span>Simplified Mode (Beta)</span>
                <span className="text-xs text-muted-foreground">A calmer, less distracting experience.</span>
              </Label>
              <Switch id="simplified-mode" />
            </div>
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
            <Button variant="outline" className="w-full">Manage Data & Privacy</Button>
            <Button variant="destructive" className="w-full">Delete Account</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Languages className="w-5 h-5" /> Language & Region</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
                <Label htmlFor="language-select-app">Application Language</Label>
                <Select defaultValue="en-US">
                    <SelectTrigger id="language-select-app" className="mt-1">
                        <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="es-ES" disabled>Español (Próximamente)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <p className="text-sm text-muted-foreground">More languages will be supported soon.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><HardDrive className="w-5 h-5" /> Data & Storage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Manage offline data, cache, and storage settings.</p>
            <Button variant="outline" className="w-full" disabled>Manage Local Cache (Soon)</Button>
            <Button variant="outline" className="w-full">Export All My Data</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Settings2 className="w-5 h-5" /> Advanced Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Configure advanced application behaviors.</p>
            <div className="flex items-center justify-between">
              <Label htmlFor="dev-mode">Developer Mode</Label>
              <Switch id="dev-mode" />
            </div>
            <Button variant="outline" className="w-full" disabled>Reset All Settings</Button>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
