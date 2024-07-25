'use client';

import { cn } from '@/lib/utils';
import ReactTimeago from 'react-timeago';

type TimestampProps = {
  createdAt: Date;
  className?: string;
};

export default function Timestamp({ createdAt, className }: TimestampProps) {
  return (
    <ReactTimeago
      className={cn('text_secondary', className)}
      date={createdAt}
      formatter={(value, unit, suffix, epochMiliseconds, nextFormatter) => {
        switch (unit) {
          case 'second':
          case 'minute':
          case 'hour':
          case 'day':
          case 'week':
          case 'month':
          case 'year':
            return `${value}${unit[0]}`;
          default:
            return nextFormatter?.(value, unit, suffix, epochMiliseconds);
        }
      }}
    />
  );
}
