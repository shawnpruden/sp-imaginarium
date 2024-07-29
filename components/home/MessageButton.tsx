import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function MessageButton() {
  return (
    <Link href={`/dashboard/p/${post.id}`}>
      <ActionIcon>
        <MessageCircle className="h-6 w-6 -rotate-90" />
      </ActionIcon>
    </Link>
  );
}
