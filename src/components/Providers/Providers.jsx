import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { RouterProvider } from 'react-router-dom';
import router from '../../routes/router';

const queryClient = new QueryClient();

const Providers = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>{children}</RouterProvider>
    </QueryClientProvider>
  );
};

Providers.propTypes = {
  children: PropTypes.element,
};

export default Providers;
