// src/app/page.tsx
import HeroSection from "./components/HeroSection";
import LatestQuestions from "./components/LatestQuestions";
import TopContributers from "./components/TopContriButors";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <section className="container mx-auto px-4 pt-10">
        <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-6 shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.14),transparent_35%)]" />
          <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-orange-300">Join now</p>
              <h2 className="text-2xl font-semibold">Get unstuck faster with the community</h2>
              <p className="text-sm text-gray-300">Ask questions, share answers, and build your reputation.</p>
            </div>
          </div>
        </div>
      </section>
      <div className="container mx-auto grid gap-8 px-4 pb-24 pt-12 lg:grid-cols-[2fr_1fr]">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Latest Questions</h2>
          <LatestQuestions />
        </section>
        <aside className="space-y-4">
          <h2 className="text-2xl font-semibold">Top Contributors</h2>
          <TopContributers />
        </aside>
      </div>
    </main>
  );
}