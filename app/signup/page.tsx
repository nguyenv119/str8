"use client";

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

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-slate-50 px-4 py-12">
      <div className="mb-12">
        <Logo />
      </div>
      <Card className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-lg">
        <CardHeader className="space-y-2 pb-6">
          <CardTitle className="text-3xl font-light text-slate-900">
            Create your account
          </CardTitle>
          <CardDescription className="text-slate-600">
            Get started with Align in just a few steps
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-slate-900">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                className="rounded-xl"
                required
              />
            </div>
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
            <div className="space-y-2">
              <Label htmlFor="organization" className="text-sm font-medium text-slate-900">
                Organization{" "}
                <span className="text-slate-500 font-normal">(optional)</span>
              </Label>
              <Input
                id="organization"
                type="text"
                placeholder="Your company name"
                className="rounded-xl"
              />
            </div>
            <Button
              type="submit"
              className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm"
              size="lg"
            >
              Create Account
            </Button>
            <div className="text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                Log in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

