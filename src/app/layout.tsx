import "./globals.css";
import Navbar from "@/app/components/Navbar";

export const metadata = {
  title: "CS RIPPERS",
  description: "Hackathon & Competition Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
