import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jajanan SignIn Page | TailAdmin - Next.js Dashboard Template",
  description: "This is the Jajanan Signin Page TailAdmin Dashboard Template",
};

export default function SignIn() {
  return <SignInForm />;
}
