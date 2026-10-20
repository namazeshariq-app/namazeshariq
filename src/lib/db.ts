import { INITIAL_CATEGORIES, INITIAL_POSTS, InitialPost } from './articles-data';
import { hashPassword } from './auth';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category_id: string;
  categorySlug?: string;
  categoryName?: string;
  status: 'published' | 'draft';
  featured_image: string;
  image_alt: string;
  focus_keyword: string;
  meta_title: string;
  meta_description: string;
  canonical_url: string;
  keywords: string;
  schema_type: string;
  author_name: string;
  views: number;
  reading_time: number;
  faqs: string; // JSON string
  published_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  username: string;
  password_hash: string;
  salt: string;
  name: string;
  role: string;
  created_at: string;
}

// In-memory / local storage cache
interface LocalState {
  users: User[];
  categories: Category[];
  posts: Post[];
  settings: Record<string, string>;
  initialized: boolean;
}

const globalForDb = globalThis as unknown as {
  __LOCAL_DB__?: LocalState;
};

function getLocalState(): LocalState {
  if (!globalForDb.__LOCAL_DB__) {
    globalForDb.__LOCAL_DB__ = {
      users: [],
      categories: [...INITIAL_CATEGORIES],
      posts: INITIAL_POSTS.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        content: p.content,
        excerpt: p.excerpt,
        category_id: p.categorySlug === 'prayer-guides' ? 'cat-prayer-guides' :
                     p.categorySlug === 'namaz-timings' ? 'cat-timings-calculation' :
                     p.categorySlug === 'city-schedules' ? 'cat-city-schedules' : 'cat-spiritual-reflections',
        categorySlug: p.categorySlug,
        categoryName: p.categoryName,
        status: p.status,
        featured_image: p.featuredImage,
        image_alt: p.imageAlt,
        focus_keyword: p.focusKeyword,
        meta_title: p.metaTitle,
        meta_description: p.metaDescription,
        canonical_url: p.canonicalUrl,
        keywords: p.keywords,
        schema_type: p.schemaType,
        author_name: p.authorName,
        views: p.views,
        reading_time: p.readingTime,
        faqs: JSON.stringify(p.faqs),
        published_at: p.publishedAt,
        updated_at: p.publishedAt,
      })),
      settings: {
        site_name: 'Namaz-e-Shariq',
        site_description: 'Modern Islamic Prayer Times, Detailed Namaz Rakats Guides, and Waqt Timetables for Global Cities.',
        contact_email: 'contact@namazeshariq.com',
        site_url: 'https://namazeshariq.com',
      },
      initialized: false,
    };
  }
  return globalForDb.__LOCAL_DB__;
}

// Helper to get Cloudflare D1 database if running in Cloudflare Pages/Workers environment
function getCloudflareD1(): any | null {
  if (typeof (globalThis as any).DB !== 'undefined') {
    return (globalThis as any).DB;
  }
  if (typeof (process.env as any).DB !== 'undefined') {
    return (process.env as any).DB;
  }
  return null;
}

/**
 * Initialize default admin user and state
 */
export async function initDb(): Promise<void> {
  const state = getLocalState();
  if (state.initialized) return;

  const d1 = getCloudflareD1();
  if (d1) {
    try {
      // Ensure D1 tables exist
      await d1.prepare(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          username TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          salt TEXT NOT NULL,
          name TEXT NOT NULL,
          role TEXT DEFAULT 'admin',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `).run();
    } catch (e) {
      console.warn('D1 auto-init notice:', e);
    }
  }

  // Pre-seed default admin user if not present (fetched from environment variables)
  if (state.users.length === 0) {
    const defaultUsername = (process.env.ADMIN_USERNAME || 'admin').trim();
    const defaultPassword = (process.env.ADMIN_PASSWORD || 'AdminPassword2026!').trim();
    const { hash, salt } = await hashPassword(defaultPassword);
    state.users.push({
      id: 'usr-admin-01',
      username: defaultUsername,
      password_hash: hash,
      salt: salt,
      name: 'Chief Editor',
      role: 'admin',
      created_at: new Date().toISOString(),
    });
  }

  state.initialized = true;
}

// Ensure init is queued
initDb().catch(console.error);

// ----------------- POSTS REPOSITORY -----------------

export async function getPosts(options?: {
  categorySlug?: string;
  status?: 'published' | 'draft' | 'all';
  search?: string;
  limit?: number;
}): Promise<Post[]> {
  await initDb();
  const d1 = getCloudflareD1();
  if (d1) {
    try {
      let query = `
        SELECT p.*, c.name as categoryName, c.slug as categorySlug
        FROM posts p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE 1=1
      `;
      const params: any[] = [];

      if (options?.status && options.status !== 'all') {
        query += ` AND p.status = ?`;
        params.push(options.status);
      }
      if (options?.categorySlug) {
        query += ` AND c.slug = ?`;
        params.push(options.categorySlug);
      }
      if (options?.search) {
        query += ` AND (p.title LIKE ? OR p.content LIKE ? OR p.focus_keyword LIKE ?)`;
        const s = `%${options.search}%`;
        params.push(s, s, s);
      }
      query += ` ORDER BY p.published_at DESC`;
      if (options?.limit) {
        query += ` LIMIT ?`;
        params.push(options.limit);
      }
      const stmt = d1.prepare(query);
      const res = await (params.length ? stmt.bind(...params).all() : stmt.all());
      return res.results || [];
    } catch (err) {
      console.error('D1 getPosts error, falling back to local state:', err);
    }
  }

  // Fallback to local store
  const state = getLocalState();
  let list = [...state.posts];

  if (options?.status && options.status !== 'all') {
    list = list.filter((p) => p.status === options.status);
  }
  if (options?.categorySlug) {
    list = list.filter((p) => p.categorySlug === options.categorySlug);
  }
  if (options?.search) {
    const q = options.search.toLowerCase();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.focus_keyword.toLowerCase().includes(q)
    );
  }

  list.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());

  if (options?.limit) {
    list = list.slice(0, options.limit);
  }

  return list;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  await initDb();
  const d1 = getCloudflareD1();
  if (d1) {
    try {
      const row = await d1
        .prepare(`
          SELECT p.*, c.name as categoryName, c.slug as categorySlug
          FROM posts p
          LEFT JOIN categories c ON p.category_id = c.id
          WHERE p.slug = ?
          LIMIT 1
        `)
        .bind(slug)
        .first();
      if (row) return row;
    } catch (err) {
      console.error('D1 getPostBySlug error:', err);
    }
  }

  const state = getLocalState();
  const found = state.posts.find((p) => p.slug === slug);
  return found || null;
}

export async function getPostById(id: string): Promise<Post | null> {
  await initDb();
  const d1 = getCloudflareD1();
  if (d1) {
    try {
      const row = await d1.prepare(`SELECT * FROM posts WHERE id = ? LIMIT 1`).bind(id).first();
      if (row) return row;
    } catch (err) {
      console.error('D1 getPostById error:', err);
    }
  }
  const state = getLocalState();
  return state.posts.find((p) => p.id === id) || null;
}

export async function createPost(data: Partial<Post>): Promise<Post> {
  await initDb();
  const id = `post-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();

  const state = getLocalState();
  const cat = state.categories.find((c) => c.id === data.category_id) || state.categories[0];

  const newPost: Post = {
    id,
    title: data.title || 'Untitled Post',
    slug: data.slug || `post-${Date.now()}`,
    content: data.content || '',
    excerpt: data.excerpt || (data.content ? data.content.slice(0, 160) : ''),
    category_id: data.category_id || cat.id,
    categorySlug: cat.slug,
    categoryName: cat.name,
    status: data.status || 'published',
    featured_image: data.featured_image || 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80',
    image_alt: data.image_alt || data.title || '',
    focus_keyword: data.focus_keyword || '',
    meta_title: data.meta_title || data.title || '',
    meta_description: data.meta_description || data.excerpt || '',
    canonical_url: data.canonical_url || `https://namazeshariq.com/blog/${data.slug}`,
    keywords: data.keywords || '',
    schema_type: data.schema_type || 'Article',
    author_name: data.author_name || 'Mufti & Editorial Board',
    views: 0,
    reading_time: data.reading_time || Math.max(1, Math.round((data.content || '').split(/\\s+/).length / 200)),
    faqs: typeof data.faqs === 'string' ? data.faqs : JSON.stringify(data.faqs || []),
    published_at: data.published_at || now,
    updated_at: now,
  };

  const d1 = getCloudflareD1();
  if (d1) {
    try {
      await d1.prepare(`
        INSERT INTO posts (
          id, title, slug, content, excerpt, category_id, status,
          featured_image, image_alt, focus_keyword, meta_title,
          meta_description, canonical_url, keywords, schema_type,
          author_name, views, reading_time, faqs, published_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        newPost.id, newPost.title, newPost.slug, newPost.content, newPost.excerpt, newPost.category_id, newPost.status,
        newPost.featured_image, newPost.image_alt, newPost.focus_keyword, newPost.meta_title,
        newPost.meta_description, newPost.canonical_url, newPost.keywords, newPost.schema_type,
        newPost.author_name, newPost.views, newPost.reading_time, newPost.faqs, newPost.published_at, newPost.updated_at
      ).run();
    } catch (e) {
      console.error('D1 createPost error:', e);
    }
  }

  state.posts.unshift(newPost);
  return newPost;
}

export async function updatePost(id: string, data: Partial<Post>): Promise<Post | null> {
  await initDb();
  const state = getLocalState();
  const index = state.posts.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const current = state.posts[index];
  const cat = state.categories.find((c) => c.id === (data.category_id || current.category_id)) || state.categories[0];

  const updated: Post = {
    ...current,
    ...data,
    category_id: data.category_id || current.category_id,
    categorySlug: cat.slug,
    categoryName: cat.name,
    updated_at: new Date().toISOString(),
  };

  if (typeof updated.faqs !== 'string') {
    updated.faqs = JSON.stringify(updated.faqs || []);
  }

  const d1 = getCloudflareD1();
  if (d1) {
    try {
      await d1.prepare(`
        UPDATE posts SET
          title = ?, slug = ?, content = ?, excerpt = ?, category_id = ?, status = ?,
          featured_image = ?, image_alt = ?, focus_keyword = ?, meta_title = ?,
          meta_description = ?, canonical_url = ?, keywords = ?, schema_type = ?,
          author_name = ?, reading_time = ?, faqs = ?, updated_at = ?
        WHERE id = ?
      `).bind(
        updated.title, updated.slug, updated.content, updated.excerpt, updated.category_id, updated.status,
        updated.featured_image, updated.image_alt, updated.focus_keyword, updated.meta_title,
        updated.meta_description, updated.canonical_url, updated.keywords, updated.schema_type,
        updated.author_name, updated.reading_time, updated.faqs, updated.updated_at,
        id
      ).run();
    } catch (e) {
      console.error('D1 updatePost error:', e);
    }
  }

  state.posts[index] = updated;
  return updated;
}

export async function deletePost(id: string): Promise<boolean> {
  await initDb();
  const state = getLocalState();
  const initialLen = state.posts.length;
  state.posts = state.posts.filter((p) => p.id !== id);

  const d1 = getCloudflareD1();
  if (d1) {
    try {
      await d1.prepare(`DELETE FROM posts WHERE id = ?`).bind(id).run();
    } catch (e) {
      console.error('D1 deletePost error:', e);
    }
  }

  return state.posts.length < initialLen;
}

export async function incrementPostViews(slug: string): Promise<void> {
  const state = getLocalState();
  const post = state.posts.find((p) => p.slug === slug);
  if (post) {
    post.views += 1;
  }
  const d1 = getCloudflareD1();
  if (d1) {
    try {
      await d1.prepare(`UPDATE posts SET views = views + 1 WHERE slug = ?`).bind(slug).run();
    } catch {}
  }
}

// ----------------- CATEGORIES REPOSITORY -----------------

export async function getCategories(): Promise<Category[]> {
  await initDb();
  const d1 = getCloudflareD1();
  if (d1) {
    try {
      const res = await d1.prepare(`SELECT * FROM categories ORDER BY name ASC`).all();
      if (res.results && res.results.length > 0) {
        return res.results;
      }
    } catch {}
  }
  return getLocalState().categories;
}

// ----------------- USERS REPOSITORY -----------------

export async function getUserByUsername(username: string): Promise<User | null> {
  await initDb();
  const d1 = getCloudflareD1();
  if (d1) {
    try {
      const row = await d1.prepare(`SELECT * FROM users WHERE username = ? LIMIT 1`).bind(username).first();
      if (row) return row;
    } catch {}
  }
  const state = getLocalState();
  return state.users.find((u) => u.username.toLowerCase() === username.toLowerCase()) || null;
}

// ----------------- DASHBOARD STATS -----------------

export async function getDashboardStats() {
  await initDb();
  const posts = await getPosts({ status: 'all' });
  const published = posts.filter((p) => p.status === 'published');
  const drafts = posts.filter((p) => p.status === 'draft');
  const totalViews = posts.reduce((acc, curr) => acc + (curr.views || 0), 0);
  const categories = await getCategories();

  return {
    totalPosts: posts.length,
    publishedCount: published.length,
    draftCount: drafts.length,
    totalViews,
    categoriesCount: categories.length,
    recentPosts: posts.slice(0, 5),
  };
}
