import Link from "next/link";

export default function PostNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-5xl">
        404 - Post Not Found
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-md">
        The blog post you are looking for does not exist or may have been moved.
      </p>
      <div className="mt-6">
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
        >
          Return to Portfolio
        </Link>
      </div>
    </div>
  );
}
