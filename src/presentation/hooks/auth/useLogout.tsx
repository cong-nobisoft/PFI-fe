import { useRepository } from '@/di/RepositoriesProvider';
import { useAuthStore } from '@/presentation/stores/useAuthStore';

export const useLogout = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const { authRepository } = useRepository();
  const { mutate: logout, ...rest } = authRepository.logout();

  return {
    logout: (onSettled?: () => void) => {
      logout(
        {},
        {
          onSettled: () => {
            clearAuth();
            onSettled?.();
          },
        },
      );
    },
    ...rest,
  };
};
