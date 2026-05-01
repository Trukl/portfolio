import { AnimatePresence, motion } from 'framer-motion';
import { useWorldStore } from '../state/worldStore';

export function TransitionOverlay() {
  const isTransitioning = useWorldStore((s) => s.isTransitioning);
  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background:
              'radial-gradient(circle at center, rgba(168,107,255,0.85), rgba(40,8,80,0.95))',
          }}
        />
      )}
    </AnimatePresence>
  );
}
