export function Footer() {
  return (
    <footer className="py-8 flex items-center justify-between border-t border-gray-200 dark:border-gray-800">
      <div className="text-xs text-gray-500">
        © {new Date().getFullYear()} Cogito Protocol
      </div>
    </footer>
  );
}
