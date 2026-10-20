import { NextRequest, NextResponse } from 'next/server';
import { getPosts, createPost } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') as 'published' | 'draft' | 'all' | null;
    const search = searchParams.get('search') || undefined;

    const posts = await getPosts({
      status: status || 'all',
      search,
    });

    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    if (!body.title || !body.slug) {
      return NextResponse.json(
        { error: 'Title and slug are required fields' },
        { status: 400 }
      );
    }

    const post = await createPost({
      ...body,
      author_name: body.author_name || user.name,
    });

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
