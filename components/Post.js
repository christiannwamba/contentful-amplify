import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { formatDistance } from 'date-fns';

import { renderCode } from './CodeHighlight';

export function PostTitle({ children }) {
  return (
    <h1 className="text-4xl text-center font-bold leading-tight">{children}</h1>
  );
}

export function PostBody({ children }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col max-w-6xl">
        {/* Use Tailwind prose to format the body */}
        <section className="prose prose-lg prose-indigo">
          {/* Use React Markdown to render the markdown content */}
          <ReactMarkdown
            components={{
              renderCode,
            }}
          >
            {children}
          </ReactMarkdown>
        </section>
      </div>
    </div>
  );
}

export function PostCard({ id, title, createdAt, imageUrl, slug }) {
  return (
    <div
      key={id}
      className="overflow-hidden rounded-lg shadow-sm border border-gray-200"
    >
      <div className="h-48 w-full relative">
        <Image
          className="object-cover"
          fill
          src={'https://' + imageUrl}
          alt=""
        />
      </div>

      <div className="px-10 py-10">
        <p className=" text-sm text-gray-500">
          <time dateTime={createdAt}>
            {formatDistance(new Date(createdAt), new Date(), {
              addSuffix: true,
            })}
          </time>
        </p>
        <Link
          href={{
            pathname: '/[slug]',
            query: { slug: slug + '___' + id },
          }}
          className="mt-1 block"
        >
          <p className="text-xl font-semibold text-gray-900">{title}</p>
        </Link>
        <div className="mt-2">
          <Link
            href={{
              pathname: '/[slug]',
              query: { slug: slug + '___' + id },
            }}
            className="text-base font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Read full article
          </Link>
        </div>
      </div>
    </div>
  );
}
