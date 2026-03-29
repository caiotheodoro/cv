import { Client } from '@notionhq/client';

if (!import.meta.env.NOTION_TOKEN) {
  throw new Error('NOTION_TOKEN environment variable is required');
}

export const notion = new Client({
  auth: import.meta.env.NOTION_TOKEN,
  fetch: globalThis.fetch,
});
