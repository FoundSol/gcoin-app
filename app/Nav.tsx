import Image from "next/image";
import Link from "next/link";
import ActiveLink from "./ActiveLink";

export default function Nav() {
  return (
    <nav className="sm:p-4 flex flex-col sm:flex-row sm:justify-between sm:gap-8">
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <div className="flex-none p-2">
          <Link href="/">
            <Image
              src="/logo-light.svg"
              alt="Cogito Protocol"
              className="dark:hidden cursor-pointer"
              width={150}
              height={80}
              priority
            />
          </Link>
          <Link href="/">
            <Image
              src="/logo-dark.svg"
              alt="Cogito Protocol"
              className="hidden dark:block cursor-pointer"
              width={150}
              height={80}
              priority
            />
          </Link>
        </div>
      </div>

      <ul className="flex flex-1 items-center bg-zinc-900 sm:bg-transparent p-4 gap-4">
        <li>
          <ActiveLink href="/mint">Mint</ActiveLink>
        </li>
        {/* <li>
          <ActiveLink href="/stats">Stats</ActiveLink>
        </li> */}
      </ul>
    </nav>
  );
}
