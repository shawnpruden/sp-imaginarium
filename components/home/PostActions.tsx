import { PostWithExtras } from '@/lib/types';
import { cn } from '@/lib/utils';
import LikeButton from './LikeButton';
import MessageButton from './MessageButton';

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
    <div className={cn('flex gap-x-2 w-full', className)}>
      <LikeButton post={post} userId={userId} />

      {/* <MessageButton /> */}

      {/* <ShareButton postId={post.id} /> */}

      {/* <BookmarkButton post={post} userId={userId} /> */}
    </div>
  );
}
