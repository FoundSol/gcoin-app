import Image from "next/image";
import Link from "next/link";
import ActiveLink from "../common/ActiveLink";
import Dropdown from "./Dropdown";
import { NAV_LINKS } from "./links";

export default function Nav() {
  return (
    <nav className="pt-2 sm:p-4 sm:flex sm:flex-row sm:justify-between sm:gap-8">
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <div className="flex-none px-2">
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

      <ul className="hidden sm:flex flex-1 items-center dark:bg-zinc-900 sm:dark:bg-transparent p-4 gap-4 dark:text-gray-50">
        {NAV_LINKS.map(({ label, href }) => (
          <li>
            <ActiveLink href={href}>{label}</ActiveLink>
          </li>
        ))}
      </ul>

      <Dropdown />
    </nav>
  );
}
