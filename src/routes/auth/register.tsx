import RegisterPage from '@/presentation/features/auth/register';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/register')({
  component: RegisterPage,
});
