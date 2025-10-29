import { useState } from "react";
import { useLocation } from "wouter";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useToast } from "../../hooks/use-toast";
import { Lock } from "lucide-react";

// ✅ Use API base from env so it works on Render/Netlify too
const API_BASE = import.meta.env.VITE_API_URL || "";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",                 // ✅ receive/set session cookie
        body: JSON.stringify({ username, password }),
      });

      // Try to read server message (if any)
      let serverMsg = "";
      try {
        const data = await response.clone().json();
        serverMsg = data?.message || "";
      } catch {
        serverMsg = (await response.text()).slice(0, 200);
      }

      if (response.ok) {
        toast({
          title: "Success",
          description: serverMsg || "Logged in successfully",
        });
        setLocation("/admin/dashboard");
      } else {
        toast({
          title: "Error",
          description: serverMsg || "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to login. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-destructive/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Admin Login</h1>
          <p className="text-sm text-muted-foreground">
            Everest Worldwide Consultancy
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              className="mt-2"
              data-testid="input-username"
              autoComplete="username"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="mt-2"
              data-testid="input-password"
              autoComplete="current-password"
            />
          </div>

          <Button
            type="submit"
            className="w-full font-medium"
            disabled={isLoading}
            data-testid="button-login"
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
