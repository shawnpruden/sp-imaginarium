import { Avatar } from '@/components/ui/avatar';
import { AvatarProps } from '@radix-ui/react-avatar';
import { User } from 'next-auth';
import Image from 'next/image';

type UserAvatarProps = Partial<AvatarProps> & { user: User };

export default function UserAvatar({ user, ...avatarProps }: UserAvatarProps) {
  return (
    <Avatar className="relative h-8 w-8" {...avatarProps}>
      <Image
        priority
        src={user?.image || '/images/no-avatar.jpg'}
        fill
        sizes="100%"
        alt={`${user?.name}'s profile picture`}
        className="rounded-full object-cover"
      />
    </Avatar>
  );
}
