import { AuthLayout } from '@/presentation/layouts/auth/auth-layout';
import { RegisterForm } from './containers/RegisterForm';

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
