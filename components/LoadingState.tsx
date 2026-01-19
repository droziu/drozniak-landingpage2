import React from 'react';

type Variant = 'fullscreen' | 'block' | 'inline';
type SkeletonType = 'cards' | 'rows' | 'table';

interface LoadingStateProps {
  variant?: Variant;
  label?: string;
  skeleton?: SkeletonType;
}

const Spinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const s = size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-10 h-10' : 'w-8 h-8';
  return (
    <div
      className={`${s} rounded-full border-2 border-white/15 border-t-[#fee715] animate-spin`}
      role="status"
      aria-label="Ładowanie"
    />
  );
};

const SkeletonBar: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`h-3 bg-white/10 rounded animate-pulse ${className}`} />
);

const SkeletonCard: React.FC = () => (
  <div className="bg-white/5 rounded-xl p-5 border border-white/10 animate-pulse">
    <div className="flex justify-between mb-4">
      <SkeletonBar className="h-4 w-32" />
      <SkeletonBar className="h-5 w-16 rounded-lg" />
    </div>
    <SkeletonBar className="w-3/4 mb-2" />
    <SkeletonBar className="w-1/2 mb-4" />
    <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
      <SkeletonBar className="h-8 flex-1 rounded-lg" />
      <SkeletonBar className="h-8 w-20 rounded-lg" />
    </div>
  </div>
);

const CardsSkeleton: React.FC = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

const RowsSkeleton: React.FC = () => (
  <div className="space-y-3">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="flex items-center gap-4 py-3">
        <SkeletonBar className="h-4 flex-1 max-w-[200px]" />
        <SkeletonBar className="h-4 flex-1 max-w-[120px]" />
        <SkeletonBar className="h-4 w-24" />
      </div>
    ))}
  </div>
);

const TableSkeleton: React.FC = () => (
  <div className="border border-white/10 rounded-lg overflow-hidden">
    <div className="flex gap-4 px-3 py-2.5 bg-white/5 border-b border-white/10">
      <SkeletonBar className="h-3.5 w-24" />
      <SkeletonBar className="h-3.5 w-20" />
      <SkeletonBar className="h-3.5 flex-1" />
      <SkeletonBar className="h-3.5 w-14" />
    </div>
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="flex gap-4 px-3 py-2.5 border-b border-white/5">
        <SkeletonBar className="h-4 flex-1 max-w-[180px]" />
        <SkeletonBar className="h-4 flex-1 max-w-[100px]" />
        <SkeletonBar className="h-4 flex-1" />
        <SkeletonBar className="h-4 w-12" />
      </div>
    ))}
  </div>
);

export const LoadingState: React.FC<LoadingStateProps> = ({
  variant = 'block',
  label = 'Ładowanie…',
  skeleton,
}) => {
  if (skeleton && variant === 'block') {
    return (
      <div className="py-4">
        {skeleton === 'cards' && <CardsSkeleton />}
        {skeleton === 'rows' && <RowsSkeleton />}
        {skeleton === 'table' && <TableSkeleton />}
      </div>
    );
  }

  if (variant === 'fullscreen') {
    return (
      <div className="min-h-screen bg-[#101820] flex flex-col items-center justify-center gap-4 px-4">
        <Spinner size="lg" />
        <p className="text-sm text-gray-400">{label}</p>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="flex items-center justify-center gap-2 py-4">
        <Spinner size="sm" />
        <span className="text-sm text-gray-400">{label}</span>
      </div>
    );
  }

  // block
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <Spinner size="md" />
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  );
};
