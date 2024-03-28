'use client';

import { Affix, Button } from '@mantine/core';
import { useElementSize, useViewportSize, useWindowEvent } from '@mantine/hooks';
import { MonitorDown } from 'lucide-react';
import React, { useState } from 'react';

export default function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>();

  const { width } = useViewportSize();
  const { ref, width: widthEl } = useElementSize();
  useWindowEvent('beforeinstallprompt', (e) => {
    setDeferredPrompt(e);
  });

  return (
    <Affix
      position={{ bottom: 20, left: width / 2 - widthEl / 2 }}
      hidden={(typeof window !== 'undefined' && window?.matchMedia('(display-mode: standalone)').matches) ?? true}
    >
      <Button
        ref={ref}
        leftSection={<MonitorDown />}
        size='md'
        radius='xl'
        variant='light'
        onClick={() => {
          deferredPrompt?.prompt();
        }}
      >
        Встановити
      </Button>
    </Affix>
  );
}
