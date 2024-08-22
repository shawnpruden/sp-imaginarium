import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function MessageButton({ postId }: { postId: string }) {
  return (
    <Link
      href={`/dashboard/p/${postId}`}
      className="hover:opacity-65 transition-all duration-300 h-fit"
    >
      <MessageCircle className="h-6 w-6 -rotate-90" />
    </Link>
  );
}
