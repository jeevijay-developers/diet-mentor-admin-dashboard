"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Bell, Lock, User, Globe } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-foreground/60 mt-1">Manage your clinic preferences and configurations</p>
      </div>

      {/* Account Settings */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Update your account information</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Clinic Name</label>
            <Input defaultValue="DietMentor Clinic" className="mt-1 bg-background border-border" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Admin Email</label>
            <Input type="email" defaultValue="admin@dietmentor.com" className="mt-1 bg-background border-border" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Phone Number</label>
            <Input defaultValue="+1 (555) 123-4567" className="mt-1 bg-background border-border" />
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Save Changes</Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your security preferences</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Current Password</label>
            <Input type="password" className="mt-1 bg-background border-border" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">New Password</label>
            <Input type="password" className="mt-1 bg-background border-border" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Confirm Password</label>
            <Input type="password" className="mt-1 bg-background border-border" />
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Update Password</Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configure your notification preferences</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Email Notifications</p>
              <p className="text-sm text-foreground/60">Receive email alerts for new patients</p>
            </div>
            <Checkbox defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Plan Completions</p>
              <p className="text-sm text-foreground/60">Get notified when patients complete plans</p>
            </div>
            <Checkbox defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Weekly Reports</p>
              <p className="text-sm text-foreground/60">Receive weekly performance summaries</p>
            </div>
            <Checkbox defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>System Preferences</CardTitle>
              <CardDescription>Configure system-wide settings</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Currency</label>
            <select className="mt-1 w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground">
              <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>GBP (£)</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Timezone</label>
            <select className="mt-1 w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground">
              <option>Eastern (EST/EDT)</option>
              <option>Central (CST/CDT)</option>
              <option>Mountain (MST/MDT)</option>
              <option>Pacific (PST/PDT)</option>
            </select>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Save Preferences</Button>
        </CardContent>
      </Card>
    </div>
  )
}
