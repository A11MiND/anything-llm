import React, { useEffect, useMemo, useState } from "react";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import paths from "@/utils/paths";
import Workspace from "@/models/workspace";
import WorkspaceThread from "@/models/workspaceThread";
import { resourceLinks } from "./configs";
import {
  ArrowCircleUpRight,
  Lightbulb,
  BookOpen,
  ClockCounterClockwise,
  ChatsCircle,
  GraduationCap,
  ArrowsOut,
} from "@phosphor-icons/react";

export default function HKDSEHub() {
  return (
    <div
      style={{ height: isMobile ? "100%" : "calc(100% - 32px)" }}
      className="relative md:ml-[2px] md:mr-[16px] md:my-[16px] md:rounded-[20px] bg-gradient-to-br from-theme-bg-container via-theme-bg-container/95 to-theme-bg-container/90 backdrop-blur-sm w-full h-full overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0YzEuMSAwIDItLjkgMi0ycy0uOS0yLTItMi0yIC45LTIgMiAuOSAyIDIgMnptLTItMmMwLTEuMS45LTIgMi0yczIgLjkgMiAyLS45IDItMiAyLTItLjktMi0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>

      <div className="w-full h-full flex flex-col items-center overflow-y-auto no-scroll">
        <div className="w-full max-w-[1200px] flex flex-col gap-y-[32px] p-6 pt-20 md:p-12 md:pt-14 relative z-10">
          {/* Header */}
          <Header />

          {/* Main grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 flex flex-col gap-6">
              <InstructionCard />
              <StudyTipsCard />
            </div>

            <div className="md:col-span-4 flex flex-col gap-6">
              <ReturnToLastChat />
              <ResourcesSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-theme-bg-secondary/80 to-theme-bg-secondary/40 border border-white/15 p-6 md:p-8 backdrop-blur-sm shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-theme-accent/10 rounded-full">
          <GraduationCap
            size={28}
            weight="duotone"
            className="text-theme-accent"
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-theme-text-primary">
          Home Page
        </h1>
      </div>
      <p className="text-base md:text-lg text-theme-text-secondary leading-relaxed">
        Welcome to AnythingLLM. Practice smarter with focused questions, review
        key concepts, and build exam-ready habits. You&apos;ll use a shared workspace
        provided by your school — just jump in and keep learning.
      </p>
    </div>
  );
}

function InstructionCard() {
  return (
    <div className="rounded-2xl bg-theme-bg-secondary/70 border border-white/10 p-6 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-500/10 rounded-full">
          <BookOpen size={24} weight="duotone" className="text-blue-400" />
        </div>
        <h2 className="text-xl font-semibold text-theme-text-primary">
          How to Use AnythingLLM
        </h2>
      </div>
      <ol className="space-y-3">
        {[
          "Open the shared workspace provided by your teacher (you don't need to create one).",
          "Start a new chat or resume your last chat to continue where you left off.",
          "Ask an ICT question or choose a topic (e.g., Databases, Networking, Programming).",
          "Write your own answer first when a practice question appears.",
          "Then ask for feedback, hints, or model points to compare with your answer.",
          "Save key explanations or answers in the same chat for quick revision.",
        ].map((item, index) => (
          <li key={index} className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-theme-accent/10 text-theme-accent text-xs font-bold rounded-full mt-0.5">
              {index + 1}
            </div>
            <span className="text-theme-text-secondary text-sm leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function StudyTipsCard() {
  return (
    <div className="rounded-2xl bg-theme-bg-secondary/70 border border-white/10 p-6 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-amber-500/10 rounded-full">
          <Lightbulb size={24} weight="duotone" className="text-amber-400" />
        </div>
        <h2 className="text-xl font-semibold text-theme-text-primary">
          Study Tips
        </h2>
      </div>
      <ul className="space-y-3">
        {[
          "Paper 1: Aim for 60–75 seconds per MCQ. Skip and return if unsure.",
          "Paper 2: Plan briefly (inputs, process, outputs, edge cases) before writing.",
          "Use syllabus language: define terms precisely (e.g., 1NF/2NF/3NF, checksum, DNS).",
          "Practice past-paper style steps: show reasoning, not just final answers.",
          "Debug code methodically: reproduce, isolate, fix, re-test, and comment your changes.",
          "Revise weak topics weekly; mix short quizzes with 1–2 longer questions.",
        ].map((item, index) => (
          <li key={index} className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-amber-500/10 text-amber-400 text-xs font-bold rounded-full mt-0.5">
              •
            </div>
            <span className="text-theme-text-secondary text-sm leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ReturnToLastChat() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Utility to parse a date-like field safely
  const toTime = (v) => {
    if (!v) return 0;
    const t = new Date(v).getTime();
    return Number.isFinite(t) ? t : 0;
  };

  const handleResume = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      // 1) Get all workspaces
      const workspaces = await Workspace.all();
      if (!Array.isArray(workspaces) || workspaces.length === 0) {
        setErrorMsg("No workspace found. Please contact your teacher.");
        return;
      }

      // 2) Gather all threads across all workspaces
      const allThreads = [];
      for (const ws of workspaces) {
        try {
          const { threads } = await WorkspaceThread.all(ws.slug);
          if (Array.isArray(threads)) {
            for (const th of threads) {
              allThreads.push({
                ...th,
                __workspaceSlug: ws.slug,
              });
            }
          }
        } catch {
          // Ignore per-workspace errors to continue scanning others
        }
      }

      // 3) If any thread exists, pick the most recently updated
      if (allThreads.length > 0) {
        allThreads.sort((a, b) => {
          const ta = Math.max(
            toTime(a.updatedAt),
            toTime(a.updated_at),
            toTime(a.createdAt),
            toTime(a.created_at)
          );
          const tb = Math.max(
            toTime(b.updatedAt),
            toTime(b.updated_at),
            toTime(b.createdAt),
            toTime(b.created_at)
          );
          return tb - ta;
        });
        const latest = allThreads[0];
        return navigate(
          paths.workspace.thread(latest.__workspaceSlug, latest.slug)
        );
      }

      // 4) No threads anywhere: pick a "best" workspace to start a new chat
      // Choose the most recently updated workspace if the model provides timestamps, else first one
      const sortedWorkspaces = [...workspaces].sort((a, b) => {
        const ta = Math.max(
          toTime(a.updatedAt),
          toTime(a.updated_at),
          toTime(a.createdAt),
          toTime(a.created_at)
        );
        const tb = Math.max(
          toTime(b.updatedAt),
          toTime(b.updated_at),
          toTime(b.createdAt),
          toTime(b.created_at)
        );
        return tb - ta;
      });

      const targetWs = sortedWorkspaces[0] ?? workspaces[0];
      return navigate(paths.workspace.chat(targetWs.slug));
    } catch (e) {
      setErrorMsg(
        "Could not open your last chat. Please try again or contact your teacher."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-b from-theme-accent/10 to-theme-accent/5 border border-theme-accent/20 p-6 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 h-fit">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-theme-accent/20 rounded-full">
          <ClockCounterClockwise
            size={24}
            weight="duotone"
            className="text-theme-accent"
          />
        </div>
        <h2 className="text-xl font-semibold text-theme-text-primary">
          Continue Studying
        </h2>
      </div>
      <p className="text-sm text-theme-text-secondary mb-5 leading-relaxed">
        Jump back into your most recent study session across all shared
        workspaces.
      </p>
      <button
        className="w-full border-none px-4 py-3 rounded-xl bg-theme-accent hover:bg-theme-accent/90 transition-all text-sm font-medium text-white flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        onClick={handleResume}
        disabled={loading}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Opening...
          </>
        ) : (
          <>
            <ChatsCircle size={18} weight="fill" />
            Resume Last Chat
          </>
        )}
      </button>
      {errorMsg && (
        <p className="mt-3 text-xs text-red-300 bg-red-400/10 p-2 rounded-lg">
          {errorMsg}
        </p>
      )}
    </div>
  );
}

function ResourcesSection() {
  const links = useMemo(() => {
    const collected = Object.values(resourceLinks).flat();
    return [
      ...collected,
      {
        label: "Assessment Framework",
        href: "https://www.hkeaa.edu.hk/en/hkdse/assessment/",
      },
    ];
  }, []);

  return (
    <div className="rounded-2xl bg-theme-bg-secondary/70 border border-white/10 p-6 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-500/10 rounded-full">
          <ArrowsOut size={24} weight="duotone" className="text-purple-400" />
        </div>
        <h2 className="text-xl font-semibold text-theme-text-primary">
          External Resources
        </h2>
      </div>
      <div className="flex flex-col gap-3">
        {links.map((l, i) => (
          <a
            key={`${l.label}-${i}`}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className="text-theme-text-primary text-sm flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 group"
          >
            <span>{l.label}</span>
            <ArrowCircleUpRight
              weight="fill"
              size={16}
              className="opacity-60 group-hover:opacity-100 transition-opacity"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
