import { Sidebar, MobileHeader } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, Bell, Shield, Instagram, Linkedin, Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Settings() {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <MobileHeader />
        
        <main className="p-4 md:p-8 lg:p-12 max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences and integrations.</p>
          </div>

          <Tabs defaultValue="account" className="space-y-6">
            <TabsList className="bg-muted/50 p-1 rounded-xl h-12 w-full sm:w-auto flex justify-start">
              <TabsTrigger value="account" className="rounded-lg px-6 h-10 data-[state=active]:bg-white data-[state=active]:shadow-sm">Account</TabsTrigger>
              <TabsTrigger value="integrations" className="rounded-lg px-6 h-10 data-[state=active]:bg-white data-[state=active]:shadow-sm">Integrations</TabsTrigger>
              <TabsTrigger value="notifications" className="rounded-lg px-6 h-10 data-[state=active]:bg-white data-[state=active]:shadow-sm">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>Update your personal details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input defaultValue="Gaurav" />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input defaultValue="Sharma" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input defaultValue="gaurav.work@gmail.com" type="email" />
                  </div>
                  <div className="pt-4">
                    <Button className="btn-primary">
                      <Save className="w-4 h-4 mr-2" /> Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integrations">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Connected Accounts
                  </CardTitle>
                  <CardDescription>Manage your social media connections.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-pink-50 text-pink-600 rounded-xl">
                        <Instagram className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Instagram</h4>
                        <p className="text-sm text-muted-foreground">Connected as @alex_designs</p>
                      </div>
                    </div>
                    <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100">Disconnect</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                        <Linkedin className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold">LinkedIn</h4>
                        <p className="text-sm text-muted-foreground">Connected as Alex Morgan</p>
                      </div>
                    </div>
                    <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100">Disconnect</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    Notifications
                  </CardTitle>
                  <CardDescription>Choose how you want to be notified.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive digest emails about your scheduled posts.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Post Failures</Label>
                      <p className="text-sm text-muted-foreground">Get notified immediately if a post fails to publish.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Successful Publications</Label>
                      <p className="text-sm text-muted-foreground">Get notified when posts go live.</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
