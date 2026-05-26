import { useRegister } from '@/presentation/hooks/auth/useRegister';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import type { RegisterRequest } from '@/domain/models/Auth';
import { UserIcon, EyeIcon, EyeSlashIcon, CheckIcon } from '@heroicons/react/24/outline';
import { ButtonCommon } from '@/presentation/components/ui/button/ButtonCommon';
import { InputCommon } from '@/presentation/components/ui/input/InputCommon';
import { Form } from 'antd';

export function RegisterForm() {
  const { register, isPending } = useRegister();
  const [form] = Form.useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const handleRegister = async (values: any) => {
    // Note: The UI contains more fields than RegisterRequest.
    // We send the fields supported by the current API interface.
    register({ 
      firstName: values.firstName, 
      lastName: values.lastName, 
      email: values.email, 
      password: values.password 
    } as RegisterRequest);
  };

  return (
    <div className="mx-auto flex w-full max-w-[500px] flex-col items-center gap-8 overflow-hidden rounded-[20px] bg-[var(--color-white-100)] p-8 shadow-[0px_16px_32px_-12px_rgba(88,92,95,0.1)]">
      {/* ── Header ── */}
      <div className="flex w-full flex-col items-center gap-2">
        {/* Custom Icon — gradient border ring */}
        <div
          className="relative flex h-[88px] w-[88px] items-center justify-center rounded-[96px]"
          style={{
            background: 'linear-gradient(180deg, rgba(228,229,231,0.48) 0%, rgba(247,248,248,0) 100%)',
          }}
        >
          {/* Gradient Border Mask */}
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
            <UserIcon className="h-[28px] w-[28px] text-[var(--color-grey-400)]" strokeWidth={2} />
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
            Register Account
          </h1>
          <p
            className="w-full text-center font-normal text-[var(--color-grey-500)]"
            style={{
              fontSize: 'var(--font-b1-size)',
              lineHeight: 'var(--font-b1-line-height)',
            }}
          >
            Join our platform today
          </p>
        </div>
      </div>

      {/* ── Form Section ── */}
      <Form form={form} layout="vertical" className="flex w-full flex-col gap-0" onFinish={handleRegister} requiredMark={false}>
        {/* Username */}
        <Form.Item
          name="username"
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

        {/* Email Address */}
        <Form.Item
          name="email"
          label={<span className="font-medium text-[var(--color-primary-700)]" style={{ fontSize: 'var(--font-b4-size)', lineHeight: 'var(--font-b4-line-height)' }}>Email address</span>}
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
          className="w-full mb-4"
        >
          <InputCommon
            style={{ fontSize: 'var(--font-b1-size)', lineHeight: 'var(--font-b1-line-height)' }}
            placeholder="johndoe@mail.com"
            type="email"
          />
        </Form.Item>

        {/* Password */}
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

        {/* Password Rules */}
        <div className="mt-[-4px] mb-4 flex w-full flex-col gap-[10px]">
          {[
            'Your password can’t be too similar to your other personal information.',
            'Your password must contain at least 8 characters.',
            'Your password can’t be a commonly used password.',
            'Your password can’t be entirely numeric.',
          ].map((rule, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <CheckIcon className="h-[14px] w-[14px] flex-none text-[var(--color-green-500)]" strokeWidth={2.5} />
              <span className="text-[12px] leading-[16px] text-[var(--color-green-500)]">
                {rule}
              </span>
            </div>
          ))}
        </div>

        {/* Password Confirmation */}
        <Form.Item
          name="passwordConfirmation"
          label={<span className="font-medium text-[var(--color-primary-700)]" style={{ fontSize: 'var(--font-b4-size)', lineHeight: 'var(--font-b4-line-height)' }}>Password confirmation <span className="text-[#ee443f]">*</span></span>}
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match!'));
              },
            }),
          ]}
          className="w-full mb-4"
        >
          <InputCommon
            style={{ fontSize: 'var(--font-b1-size)', lineHeight: 'var(--font-b1-line-height)' }}
            placeholder="••••••••"
            type={showPasswordConfirmation ? 'text' : 'password'}
            suffix={
              <button
                type="button"
                onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                className="ml-2 flex h-5 w-5 cursor-pointer flex-none items-center justify-center text-[var(--color-primary-500)] outline-none transition-colors hover:text-[var(--color-primary-700)]"
              >
                {showPasswordConfirmation ? (
                  <EyeIcon className="h-5 w-5" strokeWidth={1.5} />
                ) : (
                  <EyeSlashIcon className="h-5 w-5" strokeWidth={1.5} />
                )}
              </button>
            }
          />
        </Form.Item>

        <div className="flex w-full gap-4">
          {/* First Name */}
          <Form.Item
            name="firstName"
            label={<span className="font-medium text-[var(--color-primary-700)]" style={{ fontSize: 'var(--font-b4-size)', lineHeight: 'var(--font-b4-line-height)' }}>First name <span className="text-[#ee443f]">*</span></span>}
            rules={[{ required: true, message: 'Please enter your first name' }]}
            className="w-full mb-4"
          >
            <InputCommon
              style={{ fontSize: 'var(--font-b1-size)', lineHeight: 'var(--font-b1-line-height)' }}
              placeholder="John"
              type="text"
            />
          </Form.Item>

          {/* Last Name */}
          <Form.Item
            name="lastName"
            label={<span className="font-medium text-[var(--color-primary-700)]" style={{ fontSize: 'var(--font-b4-size)', lineHeight: 'var(--font-b4-line-height)' }}>Last name <span className="text-[#ee443f]">*</span></span>}
            rules={[{ required: true, message: 'Please enter your last name' }]}
            className="w-full mb-4"
          >
            <InputCommon
              style={{ fontSize: 'var(--font-b1-size)', lineHeight: 'var(--font-b1-line-height)' }}
              placeholder="Doe"
              type="text"
            />
          </Form.Item>
        </div>

        {/* Phone */}
        <Form.Item
          name="phone"
          label={<span className="font-medium text-[var(--color-primary-700)]" style={{ fontSize: 'var(--font-b4-size)', lineHeight: 'var(--font-b4-line-height)' }}>Phone</span>}
          className="w-full mb-4"
        >
          <InputCommon
            style={{ fontSize: 'var(--font-b1-size)', lineHeight: 'var(--font-b1-line-height)' }}
            placeholder="Enter your phone number"
            type="tel"
          />
        </Form.Item>

        {/* Company Name */}
        <Form.Item
          name="companyName"
          label={<span className="font-medium text-[var(--color-primary-700)]" style={{ fontSize: 'var(--font-b4-size)', lineHeight: 'var(--font-b4-line-height)' }}>Company name <span className="text-[#ee443f]">*</span></span>}
          rules={[{ required: true, message: 'Please enter your company name' }]}
          className="w-full mb-4"
        >
          <InputCommon
            style={{ fontSize: 'var(--font-b1-size)', lineHeight: 'var(--font-b1-line-height)' }}
            placeholder="Enter your company name"
            type="text"
          />
        </Form.Item>

        {/* Company Website */}
        <Form.Item
          name="companyWebsite"
          label={<span className="font-medium text-[var(--color-primary-700)]" style={{ fontSize: 'var(--font-b4-size)', lineHeight: 'var(--font-b4-line-height)' }}>Company website</span>}
          className="w-full mb-4"
        >
          <InputCommon
            style={{ fontSize: 'var(--font-b1-size)', lineHeight: 'var(--font-b1-line-height)' }}
            placeholder="Enter your company website"
            type="url"
          />
        </Form.Item>

        <div className="flex w-full items-center justify-between text-[14px]">
          <span className="opacity-0">Term of Service</span>
          <Link to="/auth/forgot-password" className="cursor-pointer text-[var(--color-blue-500)] transition-opacity hover:opacity-80">
            Forgot Password?
          </Link>
        </div>

        {/* Actions */}
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
            {isPending ? 'Registering...' : 'Register Account'}
          </ButtonCommon>

          <p
            className="w-full text-center font-normal text-[var(--color-black-90)]"
            style={{
              fontSize: 'var(--font-b1-size)',
              lineHeight: 'var(--font-b1-line-height)',
            }}
          >
            Already have an account?{' '}
            <Link
              to="/auth/login"
              className="cursor-pointer text-[var(--color-blue-500)] transition-opacity hover:opacity-80"
            >
              Login
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
}
