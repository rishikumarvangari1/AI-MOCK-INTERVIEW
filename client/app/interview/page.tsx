"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import InterviewWorkspace from "@/components/InterviewWorkspace";

export default function InterviewPage() {
  return (
    <ProtectedRoute>
      <InterviewWorkspace />
    </ProtectedRoute>
  );
}
