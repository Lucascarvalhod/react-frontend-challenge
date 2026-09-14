import * as React from 'react';
import { cn } from '@/lib/utils';

function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return <table className={cn('w-full border-collapse text-left text-[13px]', className)} {...props} />;
}

function TableContainer({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('overflow-auto rounded-[13px] border border-border bg-card', className)} {...props} />;
}

export { Table, TableContainer };