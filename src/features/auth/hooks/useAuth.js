import { useAuth as useAuthContext } from '../context/AuthContext.jsx';

// Hook personalizado que re-exporta el hook del contexto
export const useAuth = useAuthContext;
