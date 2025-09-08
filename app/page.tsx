import type { JSX } from 'react';

import { ThemeSwitcher } from '@/components';

const Landing = (): JSX.Element => (
  <div className="grid min-h-screen place-items-center p-8">
    <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-700">
      <ThemeSwitcher />
      <p className="mt-4">Use the button above to toggle between light and dark modes.</p>
    </div>
  </div>
);

export default Landing;
