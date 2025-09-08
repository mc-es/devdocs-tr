'use client';

import type { ComponentProps, JSX } from 'react';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps): JSX.Element => (
  <NextThemesProvider {...props}>{children}</NextThemesProvider>
);
