import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getCategories } from '@/lib/db';
import AdminLayout from '@/components/AdminLayout';
import PostEditor from '@/components/PostEditor';

export default async function NewPostPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/admin/login');
  }

  const categories = await getCategories();

  return (
    <AdminLayout user={user}>
      <PostEditor categories={categories} isNew={true} />
    </AdminLayout>
  );
}
