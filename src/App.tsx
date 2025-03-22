import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import ProjetDetail from './pages/projets/ProjetDetail';
import Projets from './pages/projets/Projets';
import Root from './pages/Root';

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
