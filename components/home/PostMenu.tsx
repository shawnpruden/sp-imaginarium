'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useOptimisticSubmit, useToast } from '@/hooks';
import { deletePost } from '@/lib/actions';
import { PostWithExtras } from '@/lib/types';
import { cn } from '@/lib/utils';
import { DialogTitle } from '@radix-ui/react-dialog';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

type PostOptionsProps = {
  post: PostWithExtras;
  isPostOwner?: boolean;
  className?: string;
};

export default function PostMenu({
  post,
  isPostOwner,
  className,
}: PostOptionsProps) {
  const { isPending, handleAction } = useOptimisticSubmit();
  const { handleToast } = useToast();

  function handleDeletePost(formData: FormData) {
    handleAction(() => {
      deletePost(formData).then((message) => handleToast(message));
    });
  }

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

      <DialogContent
        hideCloseButton
        aria-describedby=""
        className="dialog_content"
      >
        <DialogTitle hidden />

        {isPostOwner && (
          <form action={(formData) => handleDeletePost(formData)}>
            <input type="hidden" name="id" value={post.id} />
            <button
              type="submit"
              className="post_option text-red-500 font-bold focus:invisible"
              disabled={isPending}
            >
              Delete post
            </button>
          </form>
        )}

        <form action="">
          <button
            className="post_option text-red-500 font-bold"
            disabled={isPending}
          >
            Unfollow
          </button>
        </form>

        {isPostOwner && (
          <Link
            scroll={false}
            href={`/dashboard/p/${post.id}/edit`}
            className={cn('post_option', isPending && 'pointer-events-none')}
          >
            Edit
          </Link>
        )}

        <form action="">
          <button className="post_option" disabled={isPending}>
            Add to favorites
          </button>
        </form>

        <DialogClose asChild>
          <button className="post_option border-none" disabled={isPending}>
            Cancel
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
