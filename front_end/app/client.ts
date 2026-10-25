import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Public client for client-side and server-side read-only queries
const clientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'k21eb9nx',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-05-07',
  useCdn: process.env.NODE_ENV === 'production',
};

// Create the public Sanity client instance
const client = createClient(clientConfig);

// Function to generate the image URL safely supporting both Sanity sources and local image paths
const urlFor = (source: SanityImageSource | string | any | undefined): string => {
  if (!source) {
    return '';
  }

  if (typeof source === 'string') {
    return source;
  }

  if (typeof source === 'object' && 'src' in source && typeof source.src === 'string') {
    return source.src;
  }

  try {
    const builder = imageUrlBuilder(client);
    return builder.image(source).auto('format').fit('max').url() || '';
  } catch (error) {
    console.error('Error generating image URL:', error);
    return '';
  }
};

export { client, urlFor };
