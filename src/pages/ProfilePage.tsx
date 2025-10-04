import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, User, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
const MOCK_USER_DATA = {
  name: "Alex Chan",
  employeeId: "EMP001",
  email: "alex.chan@example.com",
  phone: "+852 1234 5678",
};
export function ProfilePage() {
  const [formData, setFormData] = useState(MOCK_USER_DATA);
  const [isDirty, setIsDirty] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    setIsDirty(true);
  };
  const handleSaveChanges = () => {
    // Mock save action
    toast.success("Profile updated successfully!");
    setIsDirty(false);
    // Here you would typically make an API call
    // MOCK_USER_DATA = { ...formData }; // In a real app, you'd update your source of truth
  };
  const handleDownloadStatement = () => {
    toast.success("Statement download started!", {
      description: "Your mock PDF statement is being generated.",
    });
    // Mock file download
    const statementContent = `
      <h1>MPF Annual Statement</h1>
      <p><strong>Name:</strong> ${MOCK_USER_DATA.name}</p>
      <p><strong>Employee ID:</strong> ${MOCK_USER_DATA.employeeId}</p>
      <p>This is a mock statement document.</p>
    `;
    const blob = new Blob([statementContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'MPF-Annual-Statement.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile & Settings</h1>
        <p className="text-muted-foreground">Manage your personal information and account settings.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="name" value={formData.name} onChange={handleInputChange} className="pl-8" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <Input id="employeeId" value={formData.employeeId} readOnly disabled />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" value={formData.email} onChange={handleInputChange} className="pl-8" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="phone" type="tel" value={formData.phone} onChange={handleInputChange} className="pl-8" />
                </div>
              </div>
            </CardContent>
            <div className="p-6 pt-0">
              <Button onClick={handleSaveChanges} disabled={!isDirty}>Save Changes</Button>
            </div>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Statements</CardTitle>
              <CardDescription>Download your monthly or annual statements.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={handleDownloadStatement}>
                <Download className="mr-2 h-4 w-4" />
                Download Annual Statement
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your account security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full" onClick={() => toast.info("Security feature coming soon!")}>Change Password</Button>
              <Button variant="outline" className="w-full" onClick={() => toast.info("Security feature coming soon!")}>Enable Two-Factor Auth</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}