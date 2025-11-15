import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LandingNavbar } from "@/components/layout/landing-navbar";
import { PixelArtPlaceholder } from "@/components/ui/pixel-art-placeholder";
import { Logo } from "@/components/ui/logo";
import {
  Camera,
  Activity,
  TrendingUp,
  Shield,
  Github,
  Twitter,
  Linkedin,
  Play,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <LandingNavbar />

      {/* Hero Section - GIC Style */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Atmospheric Background */}
        <div className="absolute inset-0">
          <PixelArtPlaceholder variant="cityscape" className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(0,0,0,0.3)_100%)]" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-6xl md:text-7xl font-light tracking-tight text-white mb-6 max-w-4xl">
              AI-powered posture biomarkers for healthier work.
        </h1>
            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed mb-8">
              Align uses computer vision and biomechanics research to detect
              posture, spinal loading, and fatigue from any webcam — turning
              daily posture into a digital musculoskeletal biomarker.
            </p>
            <Button
              asChild
              className="rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg px-8"
              size="lg"
            >
              <Link href="/signup">
                Get Started
                <Play className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Second Section - V7.ai Style */}
      <section id="about" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            {/* Pixel Art Illustration */}
            <div className="h-96">
              <PixelArtPlaceholder variant="flower" className="h-full w-full" />
            </div>

            {/* Text Block */}
            <div className="space-y-6">
              <div className="text-sm font-medium text-emerald-600 uppercase tracking-wider">
                Our Vision
              </div>
              <h2 className="text-4xl font-medium text-slate-900 leading-tight">
                Where improving workplace health is effortless.
              </h2>
              <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
                <p>
                  Align transforms your laptop webcam into a continuous
                  musculoskeletal health monitor. Using MediaPipe pose estimation
                  and biomechanical models, we track spinal alignment, forward
                  head posture, and fatigue biomarkers in real-time.
                </p>
                <p>
                  Unlike timer-based reminders that interrupt focused work, Align
                  only nudges you when your posture actually degrades — creating
                  a digital biomarker that adapts to your individual fatigue
                  patterns.
                </p>
                <p>
                  For employers, this means reduced musculoskeletal claims,
                  better ergonomics for remote teams, and data-driven insights
                  into workforce health trends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Cards */}
      <section className="py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-medium text-slate-900 mb-4">
                Built for modern work
              </h2>
              <p className="text-xl text-slate-600 max-w-xl mx-auto">
                Three core capabilities that make Align the leading posture
                biomarker platform
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="rounded-2xl border border-slate-200 bg-white hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100">
                    <Camera className="h-7 w-7 text-emerald-600" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Webcam-only Posture AI
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    No wearables, no calibration. Works with any laptop webcam
                    using MediaPipe pose estimation and real-time computer
                    vision.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="rounded-2xl border border-slate-200 bg-white hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100">
                    <Activity className="h-7 w-7 text-emerald-600" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Fatigue & Slouch Biomarker
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Continuous calculation of spinal alignment angles and
                    fatigue decay models, creating a digital biomarker for
                    musculoskeletal health.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="rounded-2xl border border-slate-200 bg-white hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100">
                    <TrendingUp className="h-7 w-7 text-emerald-600" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Enterprise Ergonomics
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Organization-wide insights, leaderboards, and automated
                    Slack nudges to improve team ergonomics and reduce
                    musculoskeletal claims.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-center text-sm font-medium text-slate-500 uppercase tracking-wider mb-12">
              Trusted by teams and institutions like
            </p>
            <div className="relative">
              <div className="flex animate-scroll gap-16 opacity-60 grayscale">
                {[
                  "OpenAI",
                  "Amazon",
                  "Apple",
                  "Microsoft",
                  "Google",
                  "Meta",
                  "Netflix",
                  "Tesla",
                  "IBM",
                  "Oracle",
                  "Salesforce",
                  "Palantir",
                  "McKinsey",
                  "BCG",
                  "Deloitte",
                  "Accenture",
                ].map((company, idx) => (
                  <div
                    key={`${company}-${idx}`}
                    className="text-2xl font-semibold text-slate-400 whitespace-nowrap flex-shrink-0"
                  >
                    {company}
                  </div>
                ))}
                {/* Duplicate for seamless loop */}
                {[
                  "OpenAI",
                  "Amazon",
                  "Apple",
                  "Microsoft",
                  "Google",
                  "Meta",
                  "Netflix",
                  "Tesla",
                  "IBM",
                  "Oracle",
                  "Salesforce",
                  "Palantir",
                  "McKinsey",
                  "BCG",
                  "Deloitte",
                  "Accenture",
                ].map((company, idx) => (
                  <div
                    key={`${company}-dup-${idx}`}
                    className="text-2xl font-semibold text-slate-400 whitespace-nowrap flex-shrink-0"
                  >
                    {company}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Science Section */}
      <section id="science" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-medium text-slate-900 mb-4">
                The Science Behind Align
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Combining computer vision, biomechanics research, and digital
                biomarker modeling
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="rounded-2xl border border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    Posture Landmarks (MediaPipe)
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Real-time detection of 33 body landmarks including
                    shoulders, spine, and head position using Google&apos;s
                    MediaPipe pose estimation.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="rounded-2xl border border-slate-200 bg-white">
            <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    Spinal Alignment Angles
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Calculation of cervical, thoracic, and lumbar angles from
                    landmark positions, tracking deviations from neutral
                    posture.
              </CardDescription>
            </CardHeader>
          </Card>

              <Card className="rounded-2xl border border-slate-200 bg-white">
            <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    Forward-Head Posture
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Measurement of head position relative to cervical spine,
                    identifying forward head posture patterns linked to neck
                    pain and fatigue.
              </CardDescription>
            </CardHeader>
          </Card>

              <Card className="rounded-2xl border border-slate-200 bg-white">
            <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    Fatigue Decay Models
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Time-series analysis of posture degradation patterns,
                    modeling fatigue accumulation and recovery cycles throughout
                    the workday.
              </CardDescription>
            </CardHeader>
          </Card>
            </div>

            {/* Diagram Placeholder */}
            <div className="h-64 rounded-2xl overflow-hidden">
              <PixelArtPlaceholder variant="diagram" className="h-full w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Logo & Copyright */}
            <div className="space-y-4">
              <Logo showText={true} />
              <p className="text-sm text-slate-600">© 2025 Align</p>
              <p className="text-xs text-slate-500">
                Built for hackathon demonstration
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#about"
                    className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="#science"
                    className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Science
                  </Link>
                </li>
              </ul>
            </div>

            {/* Team & Links */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">
                Team
              </h3>
              <ul className="space-y-2 mb-6">
                <li className="text-sm text-slate-600">Long Nguyen</li>
                <li className="text-sm text-slate-600">Camille Dannenberg</li>
                <li className="text-sm text-slate-600">Abhinav Piyush</li>
                <li className="text-sm text-slate-600">Tanya Bansal</li>
              </ul>
              <div className="flex items-center gap-4">
                <Link
                  href="https://github.com"
                  className="text-slate-600 hover:text-emerald-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href="https://twitter.com"
                  className="text-slate-600 hover:text-emerald-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href="https://linkedin.com"
                  className="text-slate-600 hover:text-emerald-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
