import * as React from 'react';
import { cn } from '@/lib/utils';

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('rounded-[18px] bg-card shadow-raised', className)} {...props} />;
}

export { Card };