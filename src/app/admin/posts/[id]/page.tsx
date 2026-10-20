import React from 'react';
import { redirect, notFound } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getCategories, getPostById } from '@/lib/db';
import AdminLayout from '@/components/AdminLayout';
import PostEditor from '@/components/PostEditor';

interface EditPostProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostProps) {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/admin/login');
  }

  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  const categories = await getCategories();

  return (
    <AdminLayout user={user}>
      <PostEditor initialPost={post} categories={categories} isNew={false} />
    </AdminLayout>
  );
}
