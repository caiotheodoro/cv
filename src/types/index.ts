export interface AboutData {
  title: string;
  description: string;
  subdescription: string;
  age: number;
  degree: string;
  workSince: string;
  workingAt: string;
  hobbies: string;
}

export interface JourneyEntry {
  id: string;
  title: string;
  year: number;
  description: string; // HTML string
  imageUrl: string | undefined;
  order: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  link: string | undefined;
  github: string | undefined;
  featured: boolean;
}

export interface Notebook {
  id: string;
  name: string;
  description: string;
  link: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: 'AWS' | 'IBM' | 'Google';
  logoUrl: string | undefined;
  link: string | undefined;
  issuedDate: string | undefined;
  credentialId: string | undefined;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  publishDate: Date;
  updatedDate: Date | undefined;
  tags: string[];
  draft: boolean;
  readingTime: string | undefined;
}

export interface BlogPostWithContent extends BlogPost {
  content: string; // Markdown string from notion-to-md
}
