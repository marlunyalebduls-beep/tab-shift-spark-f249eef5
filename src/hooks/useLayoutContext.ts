import { useOutletContext } from 'react-router-dom';
import { User } from '@/types/navigation';

interface LayoutContext {
  user: User | null;
  onOpenAuth: () => void;
}

export function useLayoutContext() {
  return useOutletContext<LayoutContext>();
}
