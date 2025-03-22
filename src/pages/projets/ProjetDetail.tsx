import Icon from '@/components/Icon';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { TProject } from '@/models/types';
import { getProjectBySlug } from '@/utils/projects';
import { motion } from 'framer-motion';
import { CheckSquare, ChevronLeft, Code, HelpCircle, Image, Link2 } from 'lucide-react';
import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';

const SidebarContent = ({ project }: { project: TProject }) => (
  <>
    <div>
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <span className="w-6 h-6 min-w-6 min-h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-2 text-xs">
          <Code size={14} className="min-w-[14px] min-h-[14px]" />
        </span>
        Technologies
      </h2>
      <div className="flex flex-wrap gap-0">
        {project.techs.map((tech) => (
          <Badge key={tech} tech={tech} />
        ))}
      </div>
    </div>

    {project.links.length > 0 && (
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <span className="w-6 h-6 min-w-6 min-h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mr-2 text-xs">
            <Link2 size={14} className="min-w-[14px] min-h-[14px]" />
          </span>
          Liens
        </h2>
        <div className="flex flex-col gap-3">
          {project.links.map((link) => (
            <motion.a
              key={link.name}
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between bg-white dark:bg-neutral-800 rounded-lg py-3 px-4 text-sm font-medium transition-all hover:translate-x-1 border border-neutral-200 dark:border-neutral-700 shadow-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}>
              <span>{link.name}</span>
              <Icon
                name={link.iconName}
                size={14}
                className="opacity-70 group-hover:scale-110 transition-all duration-300 shrink-0"
              />
            </motion.a>
          ))}
        </div>
      </div>
    )}
  </>
);

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug as string);
  const sidebarRef = useRef<HTMLDivElement>(null);

  if (!project) {
    return <div>Projet non trouvé</div>;
  }

  const carouselItems = project.images ? project.images : [project.image];

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-neutral-100/80 dark:from-neutral-900/80 to-transparent -z-10 opacity-70 backdrop-blur-sm"></div>

      <Link
        to="/projets"
        className="flex items-center text-sm font-medium mb-10 hover:underline group">
        <ChevronLeft size={16} className="mr-1 transition-transform group-hover:-translate-x-1" />
        Retour aux projets
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="md:col-span-2">
          <div className="flex items-center mb-6">
            {project.icon && (
              <motion.img
                src={project.icon}
                alt=""
                className="w-12 h-12 mr-4 shadow-md rounded-lg ring-2 ring-white dark:ring-neutral-800"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              />
            )}
            <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-950 to-neutral-600 dark:from-white dark:to-neutral-400 leading-normal md:leading-tight">
              {project.title}
              {project.wip && (
                <span className="ml-3 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 py-1 px-3 rounded-full inline-flex items-center">
                  En cours
                </span>
              )}
            </h1>
          </div>

          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed">
            {project.description}
          </p>

          {project.why && (
            <motion.div
              className="mb-8 p-6 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <span className="w-8 h-8 min-w-8 min-h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mr-3">
                  <HelpCircle size={16} className="min-w-[16px] min-h-[16px]" />
                </span>
                Pourquoi ce projet ?
              </h2>
              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: project.why }}
              />
            </motion.div>
          )}

          {project.features.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <span className="w-8 h-8 min-w-8 min-h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mr-3">
                  <CheckSquare size={16} className="min-w-[16px] min-h-[16px]" />
                </span>
                Fonctionnalités
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start p-4 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]">
                    <span className="text-green-500 mr-2 flex-shrink-0 mt-0.5">✓</span>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>

        {/* Version desktop de la sidebar */}
        <div className="relative md:block hidden">
          <motion.div
            className="flex flex-col gap-8 sticky top-20 p-6 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm"
            ref={sidebarRef}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}>
            <SidebarContent project={project} />
          </motion.div>
        </div>

        {/* Version mobile de la sidebar */}
        <motion.div
          className="md:hidden flex flex-col gap-8 p-6 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}>
          <SidebarContent project={project} />
        </motion.div>
      </div>

      {carouselItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full">
          <div className="flex items-center mb-6">
            <span className="w-8 h-8 min-w-8 min-h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mr-3">
              <Image size={16} className="min-w-[16px] min-h-[16px]" />
            </span>
            <h2 className="text-2xl font-bold">Images du projet</h2>
          </div>

          <div className="max-w-5xl mx-auto p-1 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <Carousel className="w-full" opts={{ loop: true }}>
              <CarouselContent>
                {carouselItems.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1 h-[500px] relative overflow-hidden rounded-xl">
                      <img
                        src={image}
                        alt={`${project.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover rounded-xl shadow-lg transition-transform hover:scale-105 overflow-hidden"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white text-xs font-medium">
                        {project.title} - Image {index + 1}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 bg-white/80 dark:bg-black/50 backdrop-blur-sm hover:bg-white dark:hover:bg-black/70" />
              <CarouselNext className="right-4 bg-white/80 dark:bg-black/50 backdrop-blur-sm hover:bg-white dark:hover:bg-black/70" />
            </Carousel>
          </div>
        </motion.div>
      )}
    </div>
  );
}
