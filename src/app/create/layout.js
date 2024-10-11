import Navbar from "@/components/NavBar";

export const metadata = {
  title: "create teacher",
  description: "questionMaster home page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
