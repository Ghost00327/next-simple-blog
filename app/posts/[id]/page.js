import fs from 'fs';
import path from 'path';

export async function getData(id) {
  const filePath = path.join(process.cwd(), 'data', 'posts.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const posts = JSON.parse(jsonData);

  return posts.find((post) => post.id === id);
}

export default async function Post({ params }) {
  const {id} = await params;
  const post = await getData(id); // Fetch the post based on the dynamic `id`

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      <div>{post.content}</div>
    </div>
  );
}
