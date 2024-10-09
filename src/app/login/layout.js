import React from "react";

export const metadata = {
  title: "login",
  description: "login page",
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
