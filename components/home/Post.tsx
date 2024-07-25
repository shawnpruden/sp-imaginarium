import { PostWithExtras } from '@/lib/types';
import UserAvatar from '../shared/UserAvatar';
import PostOptions from './PostOptions';
import Timestamp from './Timestamp';
import { auth } from '@/auth';

export default async function Post({ post }: { post: PostWithExtras }) {
  const session = await auth();
  const userId = session?.user.id;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-3 sm:px-0">
        <div className="flex gap-x-3 items-center">
          <UserAvatar user={post.user} />

          <div className="text-sm">
            <p className="space-x-1">
              <span className="font-bold">{post.user.username}</span>
              <span className="text_secondary">･</span>

              <Timestamp createdAt={post.createdAt} />
            </p>

            <p className="text-xs text-black dark:text-white font-medium opacity-80">
              Vancouver, Canada
            </p>
          </div>
        </div>

        <PostOptions post={post} isPostOwner={post.userId === userId} />
      </div>
    </div>
  );
}
