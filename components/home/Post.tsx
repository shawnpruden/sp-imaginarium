// todo: get current location and display
// todo: loader for images

import { auth } from '@/auth';
import { Card } from '@/components/ui/card';
import { PostWithExtras } from '@/lib/types';
import { BadgeCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import UserAvatar from '../shared/UserAvatar';
import PostMenu from './PostMenu';
import Timestamp from './Timestamp';

export default async function Post({ post }: { post: PostWithExtras }) {
  const session = await auth();
  const userId = session?.user.id;

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-center justify-between px-3 sm:px-0">
        <div className="flex gap-x-3 items-center">
          <UserAvatar user={post.user} />

          <div className="text-sm">
            <p className="flex items-center gap-x-1">
              <span className="font-bold">{post.user.username}</span>
              <BadgeCheck className="w-4 h-4 text-blue-600" />
              <span className="text_secondary">･</span>

              <Timestamp createdAt={post.createdAt} />
            </p>

            <p className="text-xs text-black dark:text-white font-medium opacity-80">
              Vancouver, Canada
            </p>
          </div>
        </div>

        <PostMenu post={post} isPostOwner={post.userId === userId} />
      </div>

      <Card className="relative h-[582px] w-full rounded-none sm:rounded-md">
        <Image
          src={post.fileUrl}
          alt="post image"
          fill
          sizes="100%"
          className="object-cover"
        />
      </Card>

      {post.caption && (
        <div className="text-sm leading-none flex items-center gap-x-2 font-medium px-3 sm:px-0">
          <Link
            href={`/dashboard/${post.user.username}`}
            className="font-bold flex items-center gap-x-1"
          >
            {post.user.username}

            <BadgeCheck className="w-4 h-4 text-blue-600" />
          </Link>
          <p>{post.caption}</p>
        </div>
      )}
    </div>
  );
}
