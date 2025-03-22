import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { TTechType } from '@/models/types';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export type ProjectCardProps = {
  title: string;
  description: string;
  link: string;
  icon?: string;
  image?: string;
  techs?: TTechType[];
  wip?: boolean;
  className?: string;
  imageClassName?: string;
  contentClassName?: string;
};

export function ProjectCard({
  title,
  description,
  link,
  icon,
  image,
  techs,
  wip,
  className,
  imageClassName,
  contentClassName,
}: ProjectCardProps) {
  return (
    <div className={cn('h-full w-full block', className)}>
      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
        <Link to={link} className="block">
          <div
            className={cn(
              'h-48 w-full relative bg-indigo-100 dark:bg-indigo-900/30 overflow-hidden cursor-pointer',
              imageClassName
            )}>
            {image ? (
              <div className="w-full h-full relative">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full w-full text-5xl text-indigo-500 dark:text-indigo-400">
                {icon && <img src={icon} alt="" className="w-12 h-12" />}
              </div>
            )}
          </div>
        </Link>
        <div className={cn('p-6 flex-grow flex flex-col', contentClassName)}>
          <div className="flex items-center mb-3">
            {icon && !image && <img src={icon} alt="" className="w-6 h-6 mr-2" />}
            <h3 className="text-xl font-bold text-neutral-800 dark:text-white">
              {title}
              {wip && (
                <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 py-0.5 px-2 rounded-full">
                  En cours
                </span>
              )}
            </h3>
          </div>
          <p className="text-neutral-600 dark:text-neutral-300 mb-4">{description}</p>
          {techs && techs.length > 0 && (
            <div className="flex flex-wrap mb-4">
              {techs.map((tech) => (
                <Badge key={tech} tech={tech} />
              ))}
            </div>
          )}
          <div className="mt-auto pt-2">
            <Link to={link} className="inline-block">
              <div className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 group cursor-pointer">
                En savoir plus
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
