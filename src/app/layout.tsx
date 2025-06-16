import "./globals.css";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { AuthProvider } from "./AuthProvider";

export const metadata = {
  title: "Kinde Auth",
  description: "Kinde with NextJS App Router",
};

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
            <nav className="">
              <h1 className="">Application name</h1>
              <div>
                {!(await isAuthenticated()) ? (
                  <>
                    <LoginLink className="">Sign in</LoginLink>
                    <RegisterLink className="">Sign up</RegisterLink>
                  </>
                ) : (
                  <div className="">
                    {user?.picture ? (
                      "hi"
                    ) : (
                      <div className="">
                        {user?.given_name?.[0]}
                        {user?.family_name?.[0]}
                      </div>
                    )}
                    <div>
                      <p className="">
                        {user?.given_name} {user?.family_name}
                      </p>

                      <LogoutLink className="">Log out</LogoutLink>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </header>
          <main>{children}</main>
        </body>
      </html>
    </AuthProvider>
  );
}
