/**
 * Marketing layout - wraps marketing pages (home, about, contact, etc.)
 * Includes Header and Footer components
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header will be added in Task 9 */}
      <header className="border-b">
        {/* Header/Footer will be added in Task 9 */}
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer will be added in Task 9 */}
      <footer className="border-t">
        {/* Header/Footer will be added in Task 9 */}
      </footer>
    </div>
  );
}