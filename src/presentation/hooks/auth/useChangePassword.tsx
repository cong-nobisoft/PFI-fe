import { useRepository } from '@/di/RepositoriesProvider';
import { type ChangePasswordRequest } from '@/domain/models/Auth';
import { useAuthStore } from '@/presentation/stores/useAuthStore';
import { useRouter } from '@tanstack/react-router';

export const useChangePassword = () => {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const { authRepository } = useRepository();
  const { mutate: changePassword, ...rest } = authRepository.changePassword();

  return {
    changePassword: (requestData: ChangePasswordRequest) => {
      changePassword(requestData, {
        onSuccess: () => {
          clearAuth();
          router.navigate({ to: '/' }); // Redirect sau khi login
        },
      });
    },
    ...rest,
  };
};
