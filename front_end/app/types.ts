import type React from "react";

export type SanityImageValue =
  | {
      asset?: {
        _ref?: string;
        _type?: string;
        url?: string;
      };
      [key: string]: unknown;
    }
  | string;

export interface Work {
  _id?: string;
  tags?: string[];
  imgUrl?: SanityImageValue;
  name?: string;
  projectLink?: string;
  codeLink?: string;
  title: string;
  description: string;
}

export interface WorkExperienceItem {
  _key?: string;
  name: string;
  company: string;
  desc: string;
}

export interface Experience {
  _id?: string;
  year: string | number;
  works: WorkExperienceItem[];
}

// Backward-compatible alias
export type Experimenting = Experience;

export interface Skill {
  _id?: string;
  name: string;
  bgColor?: string;
  icon?: React.ReactNode | string;
  imgUrl?: SanityImageValue;
}

// Backward-compatible alias
export type skills = Skill;

export interface Brand {
  _id: string;
  name: string;
  imgUrl?: SanityImageValue;
}

// Backward-compatible alias
export type barnds = Brand;

export interface Testimonial {
  _id?: string;
  name: string;
  imgurl?: SanityImageValue;
  company: string;
  feedback: string;
}

// Backward-compatible alias
export type testimonials = Testimonial;