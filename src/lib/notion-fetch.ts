import { notion } from './notion';
import { NotionToMarkdown } from 'notion-to-md';
import { marked } from 'marked';

/**
 * Notion database IDs in .env may include the page name as a prefix
 * e.g. "Blog-332d5a1940e5808d8cf4c54ecf63792d" → "332d5a1940e5808d8cf4c54ecf63792d"
 */
function parseDbId(raw: string): string {
  // Extract the last 32-character hex segment (the actual UUID without dashes)
  const match = /([0-9a-f]{32})$/i.exec(raw);
  return match ? match[1]! : raw;
}
import readingTime from 'reading-time';
import type {
  AboutData,
  JourneyEntry,
  Project,
  Notebook,
  Certification,
  BlogPost,
  BlogPostWithContent,
  Experience,
  Bullet,
} from '@/types/index';
import type {
  PageObjectResponse,
  PartialPageObjectResponse,
  DatabaseObjectResponse,
  PartialDatabaseObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

type NotionPage = PageObjectResponse | PartialPageObjectResponse | DatabaseObjectResponse | PartialDatabaseObjectResponse;

const n2m = new NotionToMarkdown({ notionClient: notion });

// ─── Property helpers ────────────────────────────────────────────────────────

function getProp(page: PageObjectResponse, key: string) {
  return (page.properties as Record<string, unknown>)[key];
}

function richText(prop: unknown): string {
  if (!prop || typeof prop !== 'object') return '';
  const p = prop as { type: string; rich_text: { plain_text: string }[] };
  if (p.type !== 'rich_text') return '';
  return p.rich_text.map((t) => t.plain_text).join('');
}

function richTextHtml(prop: unknown): string {
  if (!prop || typeof prop !== 'object') return '';
  const p = prop as { type: string; rich_text: { plain_text: string; href: string | null; annotations: { bold: boolean; italic: boolean; code: boolean } }[] };
  if (p.type !== 'rich_text') return '';
  return p.rich_text
    .map((t) => {
      let text = t.plain_text;
      if (t.annotations.code) text = `<code>${text}</code>`;
      if (t.annotations.bold) text = `<strong>${text}</strong>`;
      if (t.annotations.italic) text = `<em>${text}</em>`;
      if (t.href) text = `<a href="${t.href}" target="_blank" rel="noopener">${text}</a>`;
      return text;
    })
    .join('');
}

function title(prop: unknown): string {
  if (!prop || typeof prop !== 'object') return '';
  const p = prop as { type: string; title: { plain_text: string }[] };
  if (p.type !== 'title') return '';
  return p.title.map((t) => t.plain_text).join('');
}

function number(prop: unknown): number {
  if (!prop || typeof prop !== 'object') return 0;
  const p = prop as { type: string; number: number | null };
  if (p.type !== 'number') return 0;
  return p.number ?? 0;
}

function checkbox(prop: unknown): boolean {
  if (!prop || typeof prop !== 'object') return false;
  const p = prop as { type: string; checkbox: boolean };
  if (p.type !== 'checkbox') return false;
  return p.checkbox;
}

function url(prop: unknown): string | undefined {
  if (!prop || typeof prop !== 'object') return undefined;
  const p = prop as { type: string; url: string | null };
  if (p.type !== 'url') return undefined;
  return p.url ?? undefined;
}

function date(prop: unknown): Date | undefined {
  if (!prop || typeof prop !== 'object') return undefined;
  const p = prop as { type: string; date: { start: string } | null };
  if (p.type !== 'date') return undefined;
  return p.date ? new Date(p.date.start) : undefined;
}

function select(prop: unknown): string {
  if (!prop || typeof prop !== 'object') return '';
  const p = prop as { type: string; select: { name: string } | null };
  if (p.type !== 'select') return '';
  return p.select?.name ?? '';
}

function multiSelect(prop: unknown): string[] {
  if (!prop || typeof prop !== 'object') return [];
  const p = prop as { type: string; multi_select: { name: string }[] };
  if (p.type !== 'multi_select') return [];
  return p.multi_select.map((s) => s.name);
}

function files(prop: unknown): string | undefined {
  if (!prop || typeof prop !== 'object') return undefined;
  const p = prop as { type: string; files: { type: string; file?: { url: string }; external?: { url: string } }[] };
  if (p.type !== 'files' || !p.files.length) return undefined;
  const first = p.files[0];
  if (!first) return undefined;
  return first.type === 'file' ? first.file?.url : first.external?.url;
}

function isFullPage(page: NotionPage): page is PageObjectResponse {
  return 'properties' in page;
}

// ─── About ────────────────────────────────────────────────────────────────────

export async function getAbout(): Promise<AboutData> {
  const dbId = parseDbId(import.meta.env.NOTION_ABOUT_DB_ID);
  const res = await notion.databases.query({ database_id: dbId, page_size: 1 });
  const page = res.results[0];
  if (!page || !isFullPage(page)) throw new Error('About page not found');

  const workSinceDate = date(getProp(page, 'WorkSince'));

  return {
    title: title(getProp(page, 'Title')),
    description: richText(getProp(page, 'Description')),
    subdescription: richText(getProp(page, 'Subdescription')),
    age: number(getProp(page, 'Age')),
    degree: richText(getProp(page, 'Degree')),
    workSince: workSinceDate?.toISOString() ?? new Date('2019-01-01').toISOString(),
    workingAt: richText(getProp(page, 'WorkingAt')),
    hobbies: richText(getProp(page, 'Hobbies')),
  };
}

// ─── Journey ─────────────────────────────────────────────────────────────────

export async function getJourneyEntries(): Promise<JourneyEntry[]> {
  const dbId = parseDbId(import.meta.env.NOTION_JOURNEY_DB_ID);
  const res = await notion.databases.query({
    database_id: dbId,
    sorts: [{ property: 'Year', direction: 'descending' }, { property: 'Order', direction: 'ascending' }],
  });

  return res.results.filter(isFullPage).map((page) => ({
    id: page.id,
    title: title(getProp(page, 'Title')),
    year: number(getProp(page, 'Year')),
    description: richTextHtml(getProp(page, 'Description')),
    imageUrl: files(getProp(page, 'Image')),
    order: number(getProp(page, 'Order')),
  }));
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  const dbId = parseDbId(import.meta.env.NOTION_PROJECTS_DB_ID);
  const res = await notion.databases.query({ database_id: dbId });

  return res.results.filter(isFullPage).map((page) => ({
    id: page.id,
    name: title(getProp(page, 'Name')),
    description: richText(getProp(page, 'Description')),
    tags: multiSelect(getProp(page, 'Tags')),
    link: url(getProp(page, 'Link')),
    github: url(getProp(page, 'GitHub')),
    featured: checkbox(getProp(page, 'Featured')),
  }));
}

// ─── Notebooks ────────────────────────────────────────────────────────────────

export async function getNotebooks(): Promise<Notebook[]> {
  const dbId = parseDbId(import.meta.env.NOTION_NOTEBOOKS_DB_ID);
  const res = await notion.databases.query({ database_id: dbId });

  return res.results.filter(isFullPage).map((page) => ({
    id: page.id,
    name: title(getProp(page, 'Name')),
    description: richText(getProp(page, 'Description')),
    link: url(getProp(page, 'Link')) ?? '',
  }));
}

// ─── Certifications ───────────────────────────────────────────────────────────

export async function getCertifications(): Promise<Certification[]> {
  const dbId = parseDbId(import.meta.env.NOTION_CERTIFICATIONS_DB_ID);
  const res = await notion.databases.query({ database_id: dbId });

  return res.results.filter(isFullPage).map((page) => ({
    id: page.id,
    name: title(getProp(page, 'Name')),
    issuer: select(getProp(page, 'Issuer')) as Certification['issuer'],
    logoUrl: files(getProp(page, 'Logo')),
    link: url(getProp(page, 'Link')),
    issuedDate: date(getProp(page, 'IssuedDate'))?.toISOString(),
    credentialId: richText(getProp(page, 'CredentialID')),
  }));
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

export async function getBlogPosts(includeDrafts = false): Promise<BlogPost[]> {
  const dbId = parseDbId(import.meta.env.NOTION_BLOG_DB_ID);
  const queryParams = {
    database_id: dbId,
    sorts: [{ property: 'PublishDate', direction: 'descending' as const }],
    ...(includeDrafts ? {} : { filter: { property: 'Draft', checkbox: { equals: false } } }),
  };
  const res = await notion.databases.query(queryParams);

  return res.results.filter(isFullPage).map((page) => ({
    id: page.id,
    title: title(getProp(page, 'Title')),
    slug: richText(getProp(page, 'Slug')),
    description: richText(getProp(page, 'Description')),
    publishDate: date(getProp(page, 'PublishDate')) ?? new Date(),
    updatedDate: date(getProp(page, 'UpdatedDate')),
    tags: multiSelect(getProp(page, 'Tags')),
    draft: checkbox(getProp(page, 'Draft')),
    readingTime: undefined,
  }));
}

export async function getBlogPost(slug: string): Promise<BlogPostWithContent> {
  const posts = await getBlogPosts(true);
  const post = posts.find((p) => p.slug === slug);
  if (!post) throw new Error(`Blog post not found: ${slug}`);

  const mdBlocks = await n2m.pageToMarkdown(post.id);
  const markdown = n2m.toMarkdownString(mdBlocks).parent ?? '';
  const content = await marked(markdown, { async: true });
  const stats = readingTime(markdown);

  return {
    ...post,
    content,
    readingTime: stats.text,
  };
}

// ─── Experiences ──────────────────────────────────────────────────────────────

function parseBullets(bulletsText: string): Bullet[] {
  if (!bulletsText.trim()) return [];
  return bulletsText.split('\n').filter(line => line.trim()).map(line => {
    const [titlePart, ...textParts] = line.split(':');
    return {
      title: titlePart.trim(),
      text: textParts.join(':').trim(),
    };
  });
}

function calculateDuration(startDate: Date, endDate?: Date): string {
  const end = endDate || new Date();
  let months = (end.getFullYear() - startDate.getFullYear()) * 12 + (end.getMonth() - startDate.getMonth());

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return remainingMonths === 1 ? '1 mo' : `${remainingMonths} mos`;
  }
  if (remainingMonths === 0) {
    return years === 1 ? '1 yr' : `${years} yrs`;
  }

  const yearStr = years === 1 ? '1 yr' : `${years} yrs`;
  const monthStr = remainingMonths === 1 ? '1 mo' : `${remainingMonths} mos`;
  return `${yearStr} ${monthStr}`;
}

export async function getExperiences(): Promise<Experience[]> {
  const dbId = parseDbId(import.meta.env.NOTION_EXPERIENCES_DB_ID);
  const res = await notion.databases.query({
    database_id: dbId,
    sorts: [{ property: 'Start Date', direction: 'descending' }],
  });

  return res.results.filter(isFullPage).map((page) => {
    const startDate = date(getProp(page, 'Start Date')) ?? new Date();
    const endDate = date(getProp(page, 'End Date'));

    return {
      id: page.id,
      company: title(getProp(page, 'Company')),
      title: richText(getProp(page, 'Position')),
      type: select(getProp(page, 'Type')),
      startDate,
      endDate,
      duration: calculateDuration(startDate, endDate),
      location: richText(getProp(page, 'Location')),
      intro: richText(getProp(page, 'Intro')),
      bullets: parseBullets(richText(getProp(page, 'Bullets'))),
      skills: multiSelect(getProp(page, 'Skills')),
      logo: url(getProp(page, 'Logo URL')),
      notes: richText(getProp(page, 'Notes')),
    };
  });
}
