import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { AuthProvider } from "./AuthProvider";
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <header>
            <nav>
              <div></div>
            </nav>
          </header>
          <main>{children}</main>
        </body>
      </html>
    </AuthProvider>
  );
}
