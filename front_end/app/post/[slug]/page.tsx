import { client, urlFor } from "@/app/client";
import { Post } from "@/app/lib/interface";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface SlugPageProps {
  params: { slug: string };
}

async function getPostData(slug: string): Promise<Post | null> {
  if (!slug || typeof slug !== "string") {
    return null;
  }

  // Parameterized GROQ query preventing injection vulnerabilities
  const query = `*[_type == "post" && slug.current == $slug][0]`;

  try {
    const data = await client.fetch<Post | null>(query, { slug });
    return data;
  } catch (error) {
    console.error(`[Sanity GROQ Error] Failed to fetch post for slug "${slug}":`, error);
    return null;
  }
}

export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const post = await getPostData(params.slug);
  if (!post) {
    return {
      title: "Post Not Found | Shah Fahid",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | Shah Fahid Blog`,
    description: post.overview || `Read ${post.title} on Shah Fahid's blog.`,
    openGraph: {
      title: post.title,
      description: post.overview,
      type: "article",
      publishedTime: post._createdAt,
    },
  };
}

export default async function SlugPage({ params }: SlugPageProps) {
  const data = await getPostData(params.slug);

  if (!data) {
    notFound();
  }

  const PortableTextComponent = {
    types: {
      image: ({ value }: { value: { asset?: { _ref?: string }; alt?: string } }) => {
        const imageUrl = urlFor(value);
        if (!imageUrl) return null;
        return (
          <div className="my-6">
            <Image
              src={imageUrl}
              alt={value?.alt || data.title || "Blog image"}
              className="rounded-lg w-full h-auto"
              width={800}
              height={500}
            />
          </div>
        );
      },
    },
  };

  const formattedDate = data._createdAt
    ? new Date(data._createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <Link
          href="/"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
        >
          ← Back to Portfolio
        </Link>
      </div>

      <header className="pt-4 pb-8 border-b border-gray-200 dark:border-gray-700">
        <div className="space-y-3 text-center">
          {formattedDate && (
            <p className="text-sm font-semibold tracking-wide uppercase text-teal-600 dark:text-teal-400">
              {formattedDate}
            </p>
          )}

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
            {data.title}
          </h1>

          {data.overview && (
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto pt-2">
              {data.overview}
            </p>
          )}
        </div>
      </header>

      <article className="py-8 prose max-w-none dark:prose-invert prose-lg text-gray-800 dark:text-gray-200">
        {data.content ? (
          <PortableText value={data.content} components={PortableTextComponent} />
        ) : (
          <p className="text-gray-500 italic">No content available for this post.</p>
        )}
      </article>
    </div>
  );
}