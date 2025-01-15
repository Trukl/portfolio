import { cn } from '@/lib/utils';
import React, { PropsWithChildren } from 'react';

type SectionProps = PropsWithChildren<{
  className?: string;
}>;

export default function Section(props: SectionProps) {
  return (
    <section className={cn('py-8 max-w-2xl md:max-w-3xl mx-auto px-4 sm:px-6', props.className)}>
      {props.children}
    </section>
  );
}
