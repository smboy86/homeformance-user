import { useSelector } from 'react-redux';

export default function useAppStore() {
  return useSelector(state => state.app);
}
