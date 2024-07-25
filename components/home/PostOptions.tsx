'use client';

import { PostWithExtras } from '@/lib/types';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import Link from 'next/link';
import { useTransition } from 'react';

type PostOptionsProps = {
  post: PostWithExtras;
  isPostOwner?: boolean;
  className?: string;
};

export default function PostOptions({
  post,
  isPostOwner,
  className,
}: PostOptionsProps) {
  console.log(post);

  const [isPending, startTransition] = useTransition();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <MoreHorizontal
          className={cn(
            'h-5 w-5 cursor-pointer dark:text-neutral-400',
            className
          )}
        />
      </DialogTrigger>

      <DialogContent hideCloseButton className="dialog_content">
        {isPostOwner && (
          <form>
            <input type="hidden" name="id" value={post.id} />
            <button
              type="submit"
              className="post_option text-red-500 font-bold focus:invisible"
            >
              Delete post
            </button>
          </form>
        )}

        <form action="">
          <button className="post_option text-red-500 font-bold">
            Unfollow
          </button>
        </form>

        {isPostOwner && (
          <Link
            scroll={false}
            href={`/dashboard/p/${post.id}/edit`}
            className="post_option"
          >
            Edit
          </Link>
        )}

        <form action="">
          <button className="post_option">Add to favorites</button>
        </form>

        <DialogClose asChild>
          <button className="post_option border-none">Cancel</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
