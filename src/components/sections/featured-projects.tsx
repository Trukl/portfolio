import { ProjectShowcase } from '@/components/ui/project-showcase';
import { getHighlightedProjects } from '@/utils/projects';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function FeaturedProjects() {
  const highlightedProjects = getHighlightedProjects();

  const projectItems = highlightedProjects.map((project) => ({
    title: project.title,
    description: project.description,
    link: `/projets/${project.slug}`,
    icon: project.icon,
    image: project.image,
    techs: project.techs,
    wip: project.wip,
  }));

  return (
    <section className="relative pt-5 mb-10 md:mb-20 md:pt-10">
      <div className="container max-w-6xl mx-auto relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
            <span className="px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-sm font-medium inline-block mb-4">
              Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl md:leading-tight font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400">
              Mes Projets
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
              Découvrez une sélection de mes travaux récents. Chaque projet représente un défi
              unique que j&apos;ai relevé.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-8">
          <ProjectShowcase items={projectItems} />
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}>
          <Link
            to="/projets"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium transition-all shadow-md hover:shadow-lg">
            <span>Voir tous les projets</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
