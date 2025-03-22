import Layout from '@/components/Layout';
import { Outlet, ScrollRestoration } from 'react-router-dom';

const Root = () => {
  return (
    <Layout>
      <ScrollRestoration />
      <Outlet />
    </Layout>
  );
};

export default Root;
