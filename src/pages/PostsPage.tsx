import { useEffect, useState } from "react";
import { Dialog } from "radix-ui";

type Post = {
  id: number;
  title: string;
  body: string;
};

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts?_limit=10";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    let ignore = false;

    fetch(POSTS_URL)
      .then((res) => res.json())
      .then((data: Post[]) => {
        if (!ignore) setPosts(data);
      })
      .catch(() => {
        if (!ignore) setError("Failed to load posts.");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="p-6 md:p-8">
      <p className="font-mono text-xs uppercase text-accent">Route content</p>
      <h2 className="mt-2 text-2xl font-semibold">Posts</h2>
      
      {loading && (
        <p className="mt-6 text-sm text-muted-foreground">Loading posts…</p>
      )}

      {!loading && error && (
        <p className="mt-6 text-sm text-accent">{error}</p>
      )}

      {!loading && !error && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <button
              key={post.id}
              type="button"
              onClick={() => setSelectedPost(post)}
              className="rounded-lg border border-border p-4 text-left transition-colors hover:border-accent hover:bg-secondary"
            >
              <h3 className="line-clamp-2 text-sm font-semibold capitalize">
                {post.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                {post.body}
              </p>
            </button>
          ))}
        </div>
      )}

      <Dialog.Root
        open={selectedPost !== null}
        onOpenChange={(open) => !open && setSelectedPost(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/20" />
          <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-background p-6 shadow-lg">
            <Dialog.Title className="text-lg font-semibold capitalize">
              {selectedPost?.title}
            </Dialog.Title>
            <Dialog.Description className="mt-3 text-sm text-muted-foreground">
              {selectedPost?.body}
            </Dialog.Description>
            <Dialog.Close className="mt-6 rounded-md border border-border px-3 py-1 text-sm hover:bg-secondary">
              Close
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}