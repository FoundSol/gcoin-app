import { Inter } from "next/font/google";
import { Footer } from "./Footer";
import Nav from "./Nav";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <div className="flex flex-col items-center">
          <main className="flex flex-col min-h-screen w-full sm:max-w-screen-xl sm:p-4 xl:p-8">
            <Nav />

            <section className="flex p-4 sm:p-8">{children}</section>
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
