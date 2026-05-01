import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import ProjetDetail from './pages/projets/ProjetDetail';
import Projets from './pages/projets/Projets';
import Root from './pages/Root';

const WorldRoot = lazy(() => import('./world/WorldRoot'));

function WorldLoader() {
  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center bg-neutral-950 text-white">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white" />
        <p className="font-medium">Chargement du monde…</p>
        <p className="mt-1 text-sm text-neutral-400">Quelques secondes pour générer la map.</p>
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/projets',
        element: <Projets />,
      },
      {
        path: '/projets/:slug',
        element: <ProjetDetail />,
      },
    ],
  },
  {
    path: '/monde',
    element: (
      <Suspense fallback={<WorldLoader />}>
        <WorldRoot />
      </Suspense>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
