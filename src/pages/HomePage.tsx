import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package } from "lucide-react";
export function HomePage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("employee");
  const [employeeId, setEmployeeId] = useState("EMP001");
  const [employeePassword, setEmployeePassword] = useState("••••••••");
  const [employerId, setEmployerId] = useState("BIZ001");
  const [employerPassword, setEmployerPassword] = useState("••••••••");

  const handleSignIn = () => {
    if (role === "employee") {
      // For demo purposes, check against hardcoded default values
      if (employeeId === "EMP001" && employeePassword) { // Check if password is not empty
        navigate("/dashboard");
      } else {
        alert("Invalid employee credentials.");
      }
    } else {
      // For demo purposes, check against hardcoded default values
      if (employerId === "BIZ001" && employerPassword) { // Check if password is not empty
        navigate("/employer/dashboard");
      } else {
        alert("Invalid employer credentials.");
      }
    }
  };
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),rgba(0,0,0,0))]"></div>
      <div className="z-10 flex flex-col items-center text-center mb-8 animate-fade-in">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 mb-4 shadow-lg">
          <Package className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-5xl font-bold font-display text-gray-900 dark:text-gray-50">
          ProvidentEdge
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Your MPF, simplified.
        </p>
      </div>
      <Card className="w-full max-w-sm z-10 animate-slide-up shadow-lg">
        <Tabs value={role} onValueChange={setRole} className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>
              Select your role and enter your credentials.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="employee">Employee</TabsTrigger>
              <TabsTrigger value="employer">Employer</TabsTrigger>
            </TabsList>
            <TabsContent value="employee" className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="employee-id">Employee ID</Label>
                <Input id="employee-id" type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={employeePassword} onChange={(e) => setEmployeePassword(e.target.value)} required />
              </div>
            </TabsContent>
            <TabsContent value="employer" className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="employer-id">Employer ID</Label>
                <Input id="employer-id" type="text" value={employerId} onChange={(e) => setEmployerId(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password-employer">Password</Label>
                <Input id="password-employer" type="password" value={employerPassword} onChange={(e) => setEmployerPassword(e.target.value)} required />
              </div>
            </TabsContent>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSignIn}>
              Sign In
            </Button>
          </CardFooter>
        </Tabs>
      </Card>
      <footer className="absolute bottom-8 text-center text-muted-foreground/80">
        <p>Built with ❤️ at Cloudflare</p>
      </footer>
    </main>
  );
}