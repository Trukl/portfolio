import { ProjectCard } from '@/components/ui/project-card';
import { getVisibleProjects } from '@/utils/projects';
import { motion } from 'framer-motion';

const Projets = () => {
  const projects = getVisibleProjects();

  return (
    <div className="container mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl md:leading-tight font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400">
          Mes Projets
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300">
          Découvrez les différents projets sur lesquels j&apos;ai travaillé
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}>
            <ProjectCard
              title={project.title}
              description={project.description}
              link={`/projets/${project.slug}`}
              icon={project.icon}
              image={project.image}
              techs={project.techs}
              wip={project.wip}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projets;
