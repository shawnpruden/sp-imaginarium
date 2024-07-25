import Posts from '@/components/home/Posts';
import { Suspense } from 'react';

export default function DashboardPage() {
  return (
    <main className="flex w-full grow">
      <div className="flex flex-col flex-1 gap-y-8 max-w-md mx-auto mb-20">
        <Suspense>
          <Posts />
        </Suspense>
      </div>
    </main>
  );
}
