import React from 'react';
import { notFound } from 'next/navigation';
import { fetchJobById } from '@/lib/data-store';
import AdminJobForm from '@/components/admin/AdminJobForm';

interface EditJobPageProps {
  params: {
    id: string;
  };
}

export default async function EditJobPage({ params }: EditJobPageProps) {
  const job = await fetchJobById(params.id);

  if (!job) {
    notFound();
  }

  return <AdminJobForm initialJob={job} isEdit={true} />;
}
