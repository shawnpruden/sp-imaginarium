import { ReactNode } from 'react';

export default function FormWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="w-svw sm:w-full h-svh sm:h-fit px-16 sm:px-28 py-28 sm:py-12">
      {children}
    </div>
  );
}
