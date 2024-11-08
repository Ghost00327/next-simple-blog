// app/page.js
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

// Fetch data on the server-side using 'getServerSideProps' equivalent
export async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'posts.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
}

export default async function Home() {
  const posts = await getData(); // Fetch the posts
  return (
    <div>
      <h1>Welcome to My Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
                <h2>{post.title}</h2>
                <p>{post.date}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
