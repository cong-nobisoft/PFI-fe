import logoWhite from '@/assets/images/logo-white.svg';
import authBg from '@/assets/images/auth-bg.png';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[var(--color-grey-900)]">

      {/*
       * Background decorative image — rotated, positioned top-right as per Figma.
       * Uses inline px only because this is a purely decorative, non-layout element
       * with precise transform positioning that cannot be expressed responsively.
       */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: '2081px',
          height: '1363px',
          right: '-554px',
          top: '-419px',
          transform: 'rotate(115.48deg)',
          transformOrigin: 'center center',
        }}
      >
        <img
          alt=""
          src={authBg}
          className="block h-full w-full object-cover opacity-50"
        />
      </div>

      {/* ── Header — Logo ── */}
      <header className="relative z-10 flex w-full items-center px-10 py-8">
        <img
          alt="Press Forward Integrations"
          src={logoWhite}
          className="h-[36px] w-[112px] object-contain"
        />
      </header>

      {/* ── Main Content ── */}
      <main className="relative z-10 flex flex-1 items-center justify-center p-6">
        {children}
      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 flex w-full items-center justify-between px-10 py-8">
        <p
          className="font-normal text-[var(--color-white-100)]"
          style={{
            fontSize: 'var(--font-b3-size)',
            lineHeight: 'var(--font-b3-line-height)',
          }}
        >
          © 2026 Press Forward Integrations
        </p>
        <button className="flex items-center gap-1.5 text-[var(--color-white-80)] transition hover:text-[var(--color-white-100)]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <span
            className="font-normal"
            style={{
              fontSize: 'var(--font-b3-size)',
              lineHeight: 'var(--font-b3-line-height)',
            }}
          >
            Terms of Service
          </span>
        </button>
      </footer>
    </div>
  );
}
