import { useSelector } from 'react-redux';

export default function useUserStore() {
  return useSelector(state => state.user);
}
