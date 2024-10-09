import Navbar from "@/components/NavBar";
import OverlayLoading from '@/components/common/loading';

export const metadata = {
  title: "questionMaster | Home",
  description: "questionMaster home page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <footer className="bg-gray-900 text-white py-2">
        <div className="container mx-auto px-1 text-center">
          <p>&copy; 2024 QuestionMaster. All rights reserved.</p>
        </div>
      </footer>
      </body>
    </html>
  );
}
