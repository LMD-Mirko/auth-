import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './features/auth/context/AuthContext.jsx';
import { ToastProvider } from './components/ui/ToastProvider.jsx';
import { router } from './router.jsx';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
