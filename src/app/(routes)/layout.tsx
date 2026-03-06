// app/layout.tsx
import "@/app/globals.css";
import TrpcProvider from "../api/trpc/TrpcProvider"; // Ajuste o caminho conforme necessário
import { ToastTemplate } from "../components/ui/components/ToastTemplate";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body id="root">
        <TrpcProvider>{children}</TrpcProvider>
        <ToastTemplate />
      </body>
    </html>
  );
}
