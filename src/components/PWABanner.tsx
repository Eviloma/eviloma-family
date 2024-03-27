'use client';

import { Affix, Button } from '@mantine/core';
import { MonitorDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>();

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      setDeferredPrompt(e);
    });
  });

  return (
    <Affix position={{ bottom: 20, right: 20 }} hidden={window.matchMedia('(display-mode: standalone)').matches}>
      <Button
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
