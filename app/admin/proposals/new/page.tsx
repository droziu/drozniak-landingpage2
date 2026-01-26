'use client';

import ProposalEditorPage from '../[id]/page';

export default function NewProposalPage() {
  return <ProposalEditorPage params={Promise.resolve({ id: 'new' })} />;
}
