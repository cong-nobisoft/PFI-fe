import { useEffect } from 'react';
import { useMe } from '@/presentation/hooks/auth/useMe';
import { useAuthStore } from '@/presentation/stores/useAuthStore';
import { useQueryClient } from '@tanstack/react-query';

export function AuthSync() {
  const { isAuthenticated, setAuthenticated, clearAuth, setIsLoading } = useAuthStore();
  const queryClient = useQueryClient();

  const meQuery = useMe({
    enabled: isAuthenticated,
    retry: false,
  });

  useEffect(() => {
    setIsLoading(isAuthenticated && meQuery.isFetching);
  }, [isAuthenticated, meQuery.isFetching, setIsLoading]);

  useEffect(() => {
    if (meQuery.isError && isAuthenticated) {
      clearAuth();
      queryClient.clear();
    }
  }, [clearAuth, isAuthenticated, meQuery.isError, queryClient]);

  useEffect(() => {
    if (meQuery.result) {
      setAuthenticated(meQuery.result);
    }
  }, [meQuery.result, setAuthenticated]);

  return null;
}
