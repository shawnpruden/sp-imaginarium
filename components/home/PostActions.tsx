import { PostWithExtras } from '@/lib/types';
import { cn } from '@/lib/utils';
import BookmarkButton from './BookmarkButton';
import LikeButton from './LikeButton';
import MessageButton from './MessageButton';
import ShareButton from './ShareButton';

type PostActionsProps = {
  post: PostWithExtras;
  userId?: string;
  className?: string;
};

export default function PostActions({
  post,
  userId,
  className,
}: PostActionsProps) {
  return (
    <div className={cn('flex gap-x-4', className)}>
      <LikeButton post={post} userId={userId} />

      <MessageButton postId={post.id} />

      <ShareButton postId={post.id} />

      <BookmarkButton post={post} userId={userId} />
    </div>
  );
}
