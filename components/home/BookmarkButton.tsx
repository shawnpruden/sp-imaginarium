'use client';

import { useOptimisticSubmit, useToast } from '@/hooks';
import { bookmarkPost } from '@/lib/actions';
import { PostWithExtras } from '@/lib/types';
import { cn } from '@/lib/utils';
import { SavedPost } from '@prisma/client';
import { Bookmark } from 'lucide-react';
import { useOptimistic } from 'react';

export default function BookmarkButton({
  post,
  userId,
}: {
  post: PostWithExtras;
  userId?: string;
}) {
  const { isPending, handleAction } = useOptimisticSubmit();
  const { handleToast } = useToast();

  const isSavedByCurrentUser = (bookmark: SavedPost) =>
    bookmark.userId === userId && bookmark.postId === post.id;
  const [optimisticBookmarks, addOptimisticBookmark] = useOptimistic<
    SavedPost[]
  >(
    post.savedBy,
    // @ts-ignore
    (state: SavedPost[], newBookmark: SavedPost) =>
      state.some(isSavedByCurrentUser)
        ? state.filter((bookmark) => bookmark.userId !== userId)
        : [...state, newBookmark]
  );

  function handleBookmark(formData: FormData) {
    const postId = formData.get('postId');
    addOptimisticBookmark({ postId, userId });

    handleAction(() =>
      bookmarkPost(formData).then((message) => handleToast(message))
    );
  }

  const isSaved = optimisticBookmarks.some(isSavedByCurrentUser);

  return (
    <form
      action={(formData: FormData) => handleBookmark(formData)}
      className="ml-auto"
    >
      <input type="hidden" name="postId" value={post.id} />

      <button
        type="submit"
        className={cn(
          !isSaved && 'hover:opacity-65 transition-all duration-300'
        )}
        disabled={isPending}
      >
        <Bookmark
          className={cn('h-6 w-6', isSaved && 'dark:fill-white fill-black')}
        />
      </button>
    </form>
  );
}
