import { Inter } from "next/font/google";

import NavBar from "./components/nav-bar";

import ThemeStyle from "./theme/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Deslocamento App",
  description: "Aplicativo de gerenciamento de veículos"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <ThemeStyle>
        <body className={inter.className}>
          <NavBar />
          {children}
        </body>
      </ThemeStyle>
    </html>
  );
}
