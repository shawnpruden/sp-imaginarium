'use client';

import { useOptimisticSubmit, useToast } from '@/hooks';
import { likePost } from '@/lib/actions';
import { PostWithExtras } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Like } from '@prisma/client';
import { Heart } from 'lucide-react';
import { useOptimistic } from 'react';

export default function LikeButton({
  post,
  userId,
}: {
  post: PostWithExtras;
  userId?: string;
}) {
  const { isPending, handleAction } = useOptimisticSubmit();
  const { handleToast } = useToast();

  const isLikedByCurrentUser = (like: Like) =>
    like.userId === userId && like.postId === post.id;
  const [optimisticLikes, addOptimisticLike] = useOptimistic<Like[]>(
    post.likes,
    // @ts-ignore
    (state: Like[], newLike: Like) =>
      state.some(isLikedByCurrentUser)
        ? state.filter((like) => like.userId !== userId)
        : [...state, newLike]
  );

  function handleLike(formData: FormData) {
    const postId = formData.get('postId');
    addOptimisticLike({ postId, userId });

    handleAction(() =>
      likePost(formData).then((message) => handleToast(message))
    );
  }

  const isLiked = optimisticLikes.some(isLikedByCurrentUser);

  return (
    <div className="flex flex-col">
      <form action={(formData: FormData) => handleLike(formData)}>
        <input type="hidden" name="postId" value={post.id} />

        <button
          type="submit"
          className={cn(
            !isLiked && 'hover:opacity-65 transition-all duration-300'
          )}
          disabled={isPending}
        >
          <Heart
            className={cn('h-6 w-6', isLiked && 'text-red-500 fill-red-500')}
          />
        </button>
      </form>

      {optimisticLikes.length > 0 && (
        <p className="text-sm font-bold dark:text-white">
          {optimisticLikes.length}
          &nbsp;
          {optimisticLikes.length === 1 ? 'like' : 'likes'}
        </p>
      )}
    </div>
  );
}
