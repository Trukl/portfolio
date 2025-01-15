import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type TTooltipItemProps = {
  trigger: React.ReactNode;
  content: React.ReactNode;
};

export default function TooltipItem({ trigger, content }: TTooltipItemProps) {
  return (
    <Tooltip>
      <TooltipTrigger>{trigger}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
}
