import Image from "next/image";
import Link from "next/link";
import ActiveLink from "../common/ActiveLink";
import ConnectButton from "./ConnectButton";
import Dropdown from "./Dropdown";
import { NAV_LINKS } from "./links";

const logo = (
  <Link href="/">
    <Image
      src="/logo-light.svg"
      alt="Cogito Protocol"
      className="dark:hidden cursor-pointer"
      width={150}
      height={80}
      priority
    />
    <Image
      src="/logo-dark.svg"
      alt="Cogito Protocol"
      className="hidden dark:block cursor-pointer"
      width={150}
      height={80}
      priority
    />
  </Link>
);

export default function Nav() {
  return (
    <nav className="pt-2 sm:p-4 sm:flex sm:flex-row sm:justify-between sm:gap-8">
      <div className="hidden sm:flex flex-col sm:flex-row sm:justify-between">
        <div className="flex-none px-2">{logo}</div>
      </div>

      <ul className="hidden sm:flex items-center dark:bg-zinc-900 sm:dark:bg-transparent p-4 gap-8 dark:text-gray-50">
        {NAV_LINKS.map(({ label, href }) => (
          <li key={href}>
            <ActiveLink href={href}>{label}</ActiveLink>
          </li>
        ))}
      </ul>

      <div className="sm:flex sm:gap-4 sm:items-center">
        <div className="flex justify-between items-center pl-4 pr-16 sm:p-0">
          <div className="sm:hidden">{logo}</div>

          <ConnectButton />
        </div>

        <Dropdown />
      </div>
    </nav>
  );
}
