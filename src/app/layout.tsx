import "./globals.css";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth/next";
import { AuthSessionProvider } from "./providers";
import { authOptions } from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Linkify",
  description: "Easily share where you are at on the web.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  console.log({ session });

  return (
    <AuthSessionProvider session={session}>
      <html
        lang="en"
        className="h-full bg-zinc-100 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-100"
      >
        <body className={`${inter.className} h-full relative`}>{children}</body>
      </html>
    </AuthSessionProvider>
  );
}
