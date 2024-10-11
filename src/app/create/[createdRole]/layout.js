import Navbar from "@/components/NavBar";
import OverlayLoading from '@/components/common/loading';

export const metadata = {
  title: "create teacher",
  description: "questionMaster home page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
