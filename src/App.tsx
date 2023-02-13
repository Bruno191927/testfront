import { QueryClientProvider, QueryClient } from 'react-query';
import Home from './views/Home/Home';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}

export default App;
