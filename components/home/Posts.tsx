import { fetchPosts } from '@/lib/data';
import Post from './Post';

export default async function Posts() {
  const posts = await fetchPosts();

  return (
    <>
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
}
