'use client';

import { Link, Share2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ShareButton({ postId }: { postId: string }) {
  return (
    <button
      className="flex"
      onClick={() => {
        navigator.clipboard.writeText(
          `${location.origin}/dashboard/p/${postId}`
        );
        toast('Link copied to clipboard.', {
          icon: <Link className="h-5 w-5" />,
        });
      }}
    >
      <Share2 className="h-6 w-6" />
    </button>
  );
}
