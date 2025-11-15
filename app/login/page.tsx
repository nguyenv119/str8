"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/ui/logo";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-slate-50 px-4 py-12">
      <div className="mb-12">
        <Logo />
      </div>
      <Card className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-lg">
        <CardHeader className="space-y-2 pb-6">
          <CardTitle className="text-3xl font-light text-slate-900">
            Welcome back
          </CardTitle>
          <CardDescription className="text-slate-600">
            Enter your credentials to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-slate-900">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                className="rounded-xl"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-slate-900">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="rounded-xl"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm"
              size="lg"
            >
              Continue
            </Button>
            <div className="text-center text-sm text-slate-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

