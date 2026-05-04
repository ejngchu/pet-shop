/**
 * Auth layout - wraps authentication pages (login, register, etc.)
 * Minimal layout without header/footer
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {children}
    </div>
  );
}