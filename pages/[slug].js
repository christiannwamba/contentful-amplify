import Image from 'next/image';
import {createClient} from 'contentful';
import ReactMarkdown from 'react-markdown';
import { richTextFromMarkdown } from '@contentful/rich-text-from-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Link from 'next/link';

export async function getStaticProps(context) {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const slug = context.params.slug;
  const id = slug.split('___')[1];
  const entry = await client.getEntry(id);

  const md = await richTextFromMarkdown(entry.fields.postBody);

  return {
    props: { post: { ...entry, md }, slug },
  };
}
export async function getStaticPaths() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const entries = await client.getEntries();
  const paths = entries.items.map((p) => ({
    params: { slug: p.fields.slug + '___' + p.sys.id },
  }));
  return {
    paths,
    fallback: false,
  };
}

function SinglePost({ post }) {
  return (
    <div className="py-16">
      <h1 className="text-4xl text-center font-bold leading-tight">
        {post.fields.title}
      </h1>
      <p className="text-center pt-4">
        <Link href="/" className="text-base text-indigo-600 hover:text-indigo-500">
          Home
        </Link>
      </p>
      <div className="relative h-80 my-10">
        <Image
          src={'https://' + post.fields.postImage.fields.file.url}
          alt="post-img"
          fill
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col max-w-6xl">
          <section className="prose prose-lg prose-indigo">
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  // console.log(className)
                  const match = className && className.startsWith('language-');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={atomOneDark}
                      customStyle={{
                        backgroundColor: 'transparent',
                      }}
                      language={className.split('-')[1]}
                      PreTag="div"
                      {...props}
                    >
                      {children}
                    </SyntaxHighlighter>
                  ) : (
                    <code
                      {...props}
                      className="before:content-[''] after:content-[''] bg-indigo-50 py-0.5 px-2 rounded"
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {post.fields.postBody}
            </ReactMarkdown>
          </section>
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
