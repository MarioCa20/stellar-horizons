import { useAppSelector } from "./useStore";

export const useAuth = (): boolean => {
  return useAppSelector((state) => state.auth.isAuthenticated);
};
