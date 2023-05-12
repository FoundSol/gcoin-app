import "@rainbow-me/rainbowkit/styles.css";
import classNames from "classnames";
import { Cousine, Rubik } from "next/font/google";
import { Footer } from "../components/Footer";
import Nav from "../components/nav/Nav";
import "./globals.css";
import Providers from "./providers";

const rubik = Rubik({ subsets: ["latin"] });
const cousine = Cousine({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Cogito Protocol",
  description: "App for interacting with the Cogito Protocol",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={classNames(
          rubik.className,
          "bg-zinc-100 dark:bg-zinc-950 text-black dark:text-gray-100"
        )}
      >
        <Providers>
          <div className="flex flex-col items-center">
            <main className="flex flex-col min-h-screen w-full sm:max-w-screen-xl sm:p-4 xl:p-8">
              <Nav />

              <section className="flex flex-col items-center p-4 sm:p-8">
                {children}
              </section>
            </main>

            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
