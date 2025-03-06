import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout/Layout.tsx';
import Toastify from './components/Toastify/Toastify.tsx';
import ScrollToTop from 'react-scroll-to-top';
import { FaChevronUp } from 'react-icons/fa';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/own-shop/">
        <Layout>
          <ScrollToTop />
          <Toastify />
          <ReactQueryDevtools />
          <App />
          <ScrollToTop smooth component={<FaChevronUp className="text-lg mt-1" />} />;
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
