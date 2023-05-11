import classNames from "classnames";

export default function Section({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={classNames(
        className,
        "bg-gradient-to-bl from-violet-800 via-purple-900 to-purple-950 bg-opacity-10 rounded-lg p-8 flex flex-col items-center gap-4 text-white"
      )}
      {...props}
    >
      {children}
    </section>
  );
}
