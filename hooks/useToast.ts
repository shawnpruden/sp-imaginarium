import { toast } from 'sonner';

export default function useToast() {
  function handleToast(message?: { success?: string; error?: string }) {
    if (!message) return;

    const { success, error } = message;
    if (success) toast.success(success);

    if (error) toast.error(error);
  }
  return { handleToast };
}
