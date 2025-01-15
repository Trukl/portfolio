import { cn } from '@/lib/utils';
import React, { PropsWithChildren } from 'react';

type TCodeProps = PropsWithChildren<{
  className?: string;
}>;

export default function Code(props: TCodeProps) {
  return (
    <span
      className={cn(
        'px-1 mx-0.5 rounded-md text-foreground items-center bg-accent/20 border-accent border py-1 whitespace-nowrap font-medium',
        props.className
      )}>
      {props.children}
    </span>
  );
}
