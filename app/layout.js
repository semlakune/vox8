import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import StyledComponentsRegistry from "@/lib/registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vox8",
  description: "Search for your favorite movie and TV shows.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning style={{scrollBehavior:'smooth'}}>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}
