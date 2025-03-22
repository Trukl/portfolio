import { FeaturedProjects } from '@/components/sections/featured-projects';
import { Hero } from '@/components/sections/hero';

const Home = () => {
  return (
    <div className="min-h-screen">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 via-white to-white dark:from-indigo-950/20 dark:via-neutral-950 dark:to-neutral-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[100%] rounded-full bg-gradient-to-tr from-blue-50 to-indigo-100 opacity-60 blur-3xl filter dark:from-blue-900/10 dark:to-indigo-900/10" />
      </div>
      <Hero />
      <FeaturedProjects />
    </div>
  );
};

export default Home;
