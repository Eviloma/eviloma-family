"use client";

import { Next13ProgressBar } from "next13-progressbar";

export default function NavigationProgress() {
  return (
    <Next13ProgressBar
      height="4px"
      color="var(--mantine-color-violet-5)"
      options={{ showSpinner: true }}
      showOnShallow
    />
  );
}
