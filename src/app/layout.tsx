import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const cinzel = localFont({
  src: "./fonts/Cinzel-Variable.ttf",
  variable: "--font-cinzel",
  weight: "400 900",
  display: "swap",
});

const cormorant = localFont({
  src: "./fonts/CormorantGaramond-Variable.ttf",
  variable: "--font-cormorant",
  weight: "300 700",
  display: "swap",
});

const notoTelugu = localFont({
  src: "./fonts/NotoSerifTelugu-Variable.ttf",
  variable: "--font-noto-telugu",
  weight: "100 900",
  display: "swap",
});

const plusJakarta = localFont({
  src: "./fonts/PlusJakartaSans-Variable.ttf",
  variable: "--font-jakarta",
  weight: "200 800",
  display: "swap",
});

const siteUrl = new URL("https://vardhan-weds-meera.vercel.app");
const coupleImageUrl = new URL("/images/gallery-1.jpeg", siteUrl).toString();
const invitationTitle = "Raja Vardhan Reddy & Meera Devi | Telugu Wedding Invitation";
const invitationDescription =
  "Join us with your family and blessings as we celebrate the traditional Telugu Hindu wedding of Raja Vardhan Reddy and Meera Devi.";
const invitationImageAlt = "Raja Vardhan Reddy and Meera Devi together";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "Raja Vardhan Reddy & Meera Devi — Telugu Wedding Invitation | కల్యాణ వైభోగమే",
  description:
    "We joyfully invite you to celebrate the traditional Telugu Hindu wedding of Raja Vardhan Reddy and Meera Devi. Join us with your family and blessings.",
  openGraph: {
    title: invitationTitle,
    description: invitationDescription,
    url: siteUrl.toString(),
    images: [
      {
        url: coupleImageUrl,
        width: 698,
        height: 1093,
        alt: invitationImageAlt,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: invitationTitle,
    description: invitationDescription,
    images: [{ url: coupleImageUrl, alt: invitationImageAlt }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${cinzel.variable} ${cormorant.variable} ${notoTelugu.variable} ${plusJakarta.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#FFF8E9] text-[#4A0B1A] font-sans selection:bg-[#C9A45C]/30 selection:text-[#6D1429]">
        {children}
      </body>
    </html>
  );
}

