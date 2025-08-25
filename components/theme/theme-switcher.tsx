'use client';

import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

const ThemeSwitcher = (): React.ReactElement => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <></>;

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      type="button"
      className="cursor-pointer rounded bg-zinc-200 px-4 py-2 transition-colors hover:bg-zinc-300 dark:bg-zinc-600 dark:hover:bg-zinc-600"
    >
      <p className="dark:text-zinc-300">{isDark ? '🌞 Light Mode' : '🌙 Dark Mode'}</p>
    </button>
  );
};

export default ThemeSwitcher;
