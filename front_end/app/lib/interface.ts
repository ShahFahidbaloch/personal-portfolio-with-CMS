import type { TypedObject } from "@portabletext/types";

export interface Post {
  title: string;
  overview: string;
  content: TypedObject | TypedObject[];
  _id: string;
  slug: {
    current: string;
  };
  _createdAt: string;
}