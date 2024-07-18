import "./globals.css";
import {Titillium_Web} from "next/font/google";
import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import CustomScrollbar from "@/components/CustomScrollbar";
import Providers from "@/app/providers";

const titillium = Titillium_Web({ subsets: ["latin"], weight: ["400", "700"]});
export const runtime = 'edge'
export const metadata = {
  title: "Vox8",
  description: "Movies and TV shows database powered by TMDB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-overlayscrollbars-initialize={true}>
      <body className={titillium.className} data-overlayscrollbars-initialize={true}>
      <Providers>
        <CustomScrollbar />
        <Navbar />
        <div className={"pt-16 mx-auto"}>
          {children}
        </div>
        {/*<Footer />*/}
      </Providers>
      </body>
    </html>
  );
}
