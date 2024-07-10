import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="flex items-center gap-x-2 text-neutral-600 dark:text-neutral-400 bg-zinc-100 dark:bg-neutral-800 rounded-md px-3.5 py-1.5">
      <Search className="w-4 h-4" />

      <input
        type="text"
        placeholder="Search"
        className="bg-transparent placeholder:text-neutral-600 dark:placeholder:text-neutral-400 outline-none w-full"
      />
    </div>
  );
}
