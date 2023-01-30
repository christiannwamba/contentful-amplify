import Link from 'next/link';
import Image from 'next/image';

const contentful = require('contentful');
import { formatDistance } from 'date-fns';

export default function Index({ posts }) {
  return (
    <div className="w-3/4 mx-auto">
      <h2 className="text-4xl font-bold text-center py-16">My Blog Post</h2>
      <div className="grid grid-cols-2 gap-8">
        {posts.map((post) => {
          return (
            <div
              key={post.sys.id}
              className="overflow-hidden rounded-lg shadow-sm border border-gray-200"
            >
              <div className="h-48 w-full relative">
                <Image
                  className="object-cover"
                  fill
                  src={'https://' + post.fields.postImage.fields.file.url}
                  alt=""
                />
              </div>

              <div className="px-10 py-10">
                <p className=" text-sm text-gray-500">
                  <time dateTime={post.sys.createdAt}>
                    {formatDistance(new Date(post.sys.createdAt), new Date(), {
                      addSuffix: true,
                    })}
                  </time>
                </p>
                <Link
                  href={{
                    pathname: '/[slug]',
                    query: { slug: post.fields.slug + '___' + post.sys.id },
                  }}
                  className="mt-1 block"
                >
                  <p className="text-xl font-semibold text-gray-900">
                    {post.fields.title}
                  </p>
                </Link>
                <div className="mt-2">
                  <Link
                    href={{
                      pathname: '/[slug]',
                      query: { slug: post.fields.slug + '___' + post.sys.id },
                    }}
                    className="text-base font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Read full article
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function getStaticProps({ preview = true }) {
  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const entries = await client.getEntries();

  return {
    props: { posts: entries.items },
  };
}
