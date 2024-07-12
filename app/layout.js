import "./globals.css";

export const metadata = {
  title: "Pemrograman web",
  description: "Movies Pemrograman Web",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950">{children}</body>
    </html>
  );
}
