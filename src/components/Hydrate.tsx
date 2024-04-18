"use client";

import { HydrationBoundary, type HydrationBoundaryProps } from "@tanstack/react-query";

export default function Hydrate(props: HydrationBoundaryProps) {
  return <HydrationBoundary {...props} />;
}
