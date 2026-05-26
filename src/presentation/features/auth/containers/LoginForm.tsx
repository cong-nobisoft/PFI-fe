import { useLogin } from '@/presentation/hooks/auth/useLogin';
import { Link, useRouter, useSearch } from '@tanstack/react-router';
import { useState } from 'react';
import { KeyIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { ButtonCommon } from '@/presentation/components/ui/button/ButtonCommon';
import { InputCommon } from '@/presentation/components/ui/input/InputCommon';
import { Form } from 'antd';

export function LoginForm() {
  const router = useRouter();
  const search = useSearch({ from: '/auth/login' });
  const { login, isPending } = useLogin();
  const [form] = Form.useForm();
  
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (values: any) => {
    const result = await login({ email: values.email, password: values.password });
    if (!result) return;
    await router.invalidate();
    if (search.redirectTo) {
      router.history.push(search.redirectTo);
      return;
    }
    await router.navigate({ to: '/dashboard' });
  };

  return (
    <div className="mx-auto flex w-full max-w-[500px] flex-col items-center gap-8 overflow-hidden rounded-[20px] bg-[var(--color-white-100)] p-8 shadow-[0px_16px_32px_-12px_rgba(88,92,95,0.1)]">
      <div className="flex w-full flex-col items-center gap-2">
        <div
          className="relative flex h-[88px] w-[88px] items-center justify-center rounded-[96px]"
          style={{
            background: 'linear-gradient(180deg, rgba(228,229,231,0.48) 0%, rgba(247,248,248,0) 100%)',
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-[96px]"
            style={{
              background: 'linear-gradient(90deg, #fd1ce3 0%, #dee50e 50%, #30ebd6 100%)',
              padding: '1px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />
          <div
            className="relative z-10 flex h-[56px] w-[56px] items-center justify-center rounded-[96px] border border-solid shadow-[0px_2px_4px_rgba(27,28,29,0.04)]"
            style={{
              borderColor: 'var(--color-grey-100)',
              backgroundColor: 'var(--color-white-100)',
            }}
          >
            <KeyIcon className="h-[28px] w-[28px] text-[var(--color-grey-400)]" strokeWidth={2} />
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-[6px]">
          <h1
            className="w-full text-center font-semibold text-[var(--color-black-90)]"
            style={{
              fontSize: 'var(--font-h5-size)',
              lineHeight: 'var(--font-h5-line-height)',
            }}
          >
            Login to your account
          </h1>
          <p
            className="w-full text-center font-normal text-[var(--color-grey-500)]"
            style={{
              fontSize: 'var(--font-b1-size)',
              lineHeight: 'var(--font-b1-line-height)',
            }}
          >
            Access your account securely
          </p>
        </div>
      </div>

      <Form form={form} layout="vertical" className="flex w-full flex-col gap-0" onFinish={handleLogin}>
        
        <Form.Item
          name="email"
          label={<span className="font-medium text-[var(--color-primary-700)]" style={{ fontSize: 'var(--font-b4-size)', lineHeight: 'var(--font-b4-line-height)' }}>Username</span>}
          rules={[{ required: true, message: 'Please enter your username' }]}
          className="w-full mb-4"
        >
          <InputCommon
            style={{ fontSize: 'var(--font-b1-size)', lineHeight: 'var(--font-b1-line-height)' }}
            placeholder="Enter your username"
            type="text"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={<span className="font-medium text-[var(--color-primary-700)]" style={{ fontSize: 'var(--font-b4-size)', lineHeight: 'var(--font-b4-line-height)' }}>Password</span>}
          rules={[{ required: true, message: 'Please enter your password' }]}
          className="w-full mb-4"
        >
          <InputCommon
            style={{ fontSize: 'var(--font-b1-size)', lineHeight: 'var(--font-b1-line-height)' }}
            placeholder="••••••••"
            type={showPassword ? 'text' : 'password'}
            suffix={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 flex h-5 w-5 cursor-pointer flex-none items-center justify-center text-[var(--color-primary-500)] outline-none transition-colors hover:text-[var(--color-primary-700)]"
              >
                {showPassword ? (
                  <EyeIcon className="h-5 w-5" strokeWidth={1.5} />
                ) : (
                  <EyeSlashIcon className="h-5 w-5" strokeWidth={1.5} />
                )}
              </button>
            }
          />
        </Form.Item>

        <div className="flex w-full items-center justify-between gap-3 mb-6">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 cursor-pointer rounded accent-[var(--color-primary-900)] outline-none"
              style={{ borderColor: 'var(--color-grey-300)' }}
            />
            <span
              className="font-normal text-[var(--color-black-90)]"
              style={{
                fontSize: 'var(--font-b3-size)',
                lineHeight: 'var(--font-b3-line-height)',
              }}
            >
              Remember Me
            </span>
          </label>
          <a
            href="#"
            className="cursor-pointer font-normal text-[var(--color-blue-500)] transition-opacity hover:opacity-80"
            style={{
              fontSize: 'var(--font-b3-size)',
              lineHeight: 'var(--font-b3-line-height)',
            }}
          >
            Forgot Password?
          </a>
        </div>

        <div className="flex w-full flex-col items-center gap-6 pt-2">
          <ButtonCommon
            htmlType="submit"
            disabled={isPending}
            variant="primary"
            className="!flex !h-12 !w-full cursor-pointer items-center justify-center !rounded-lg !bg-[var(--color-primary-900)] font-medium !text-[var(--color-white-100)] transition-all hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:!bg-[var(--color-primary-400)] !border-none !shadow-none"
            style={{
              fontSize: 'var(--font-b2-size)',
              lineHeight: 'var(--font-b2-line-height)',
            }}
          >
            {isPending ? 'Logging in...' : 'Login'}
          </ButtonCommon>

          <p
            className="w-full text-center font-normal text-[var(--color-black-90)]"
            style={{
              fontSize: 'var(--font-b1-size)',
              lineHeight: 'var(--font-b1-line-height)',
            }}
          >
            Don't have an account?{' '}
            <Link
              to="/auth/register"
              className="cursor-pointer text-[var(--color-blue-500)] transition-opacity hover:opacity-80"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
}
