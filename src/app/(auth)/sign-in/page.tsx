import SignInForm from "@/components/forms/sign-in"
import { GoogleAuthButton } from "@/components/global/google-oauth-button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

const SignInPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md space-y-6 p-8">
        <h5 className="font-bold text-2xl text-themeTextWhite text-center">
          Log in
        </h5>
        <p className="text-themeTextGray leading-tight text-center">
          {"Colide"} with people around the world, join groups, create group,
          watch courses and become the best of yourself.
        </p>
        <SignInForm />
        <div className="my-10 w-full relative">
          <div className="bg-black p-3 absolute text-themeTextGray text-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            OR CONTINUE WITH
          </div>
          <Separator orientation="horizontal" className="bg-themeGray" />
        </div>
        <GoogleAuthButton method="signin" />
        <p className="text-sm text-center text-themeTextGray mt-4">
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-themeTextWhite hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignInPage
