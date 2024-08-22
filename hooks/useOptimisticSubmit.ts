import { useTransition } from 'react';

export default function useOptimisticSubmit() {
  const [isPending, startTransition] = useTransition();

  function handleAction(onSubmit: () => void) {
    startTransition(onSubmit);
  }

  return { isPending, handleAction };
}
