import { AuthLayout } from '@/presentation/layouts/auth/auth-layout';
import { LoginForm } from './containers/LoginForm';

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
