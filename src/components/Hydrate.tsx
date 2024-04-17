"use client";

import { HydrationBoundary, type HydrationBoundaryProps } from "@tanstack/react-query";
import React from "react";

export default function Hydrate(props: HydrationBoundaryProps) {
  return <HydrationBoundary {...props} />;
}
