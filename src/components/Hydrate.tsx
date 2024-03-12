'use client';

import { HydrationBoundary, HydrationBoundaryProps } from '@tanstack/react-query';
import React from 'react';

function Hydrate(props: HydrationBoundaryProps) {
  return <HydrationBoundary {...props} />;
}

export default Hydrate;
