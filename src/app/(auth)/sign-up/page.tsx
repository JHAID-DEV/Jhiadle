import SignUpForm from "@/components/forms/sign-up"
import { GoogleAuthButton } from "@/components/global/google-oauth-button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

const SignUpPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md space-y-6 p-8">
        <h5 className="font-bold text-2xl text-themeTextWhite text-center">
          Sign up
        </h5>
        <p className="text-themeTextGray leading-tight">
          {"Colide"} with people around the world, join groups, create group,
          watch courses and become the best of yourself.
        </p>
        <SignUpForm />
        <div className="my-10 w-full relative">
          <div className="bg-black p-3 absolute text-themeTextGray text-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            OR CONTINUE WITH
          </div>
          <Separator orientation="horizontal" className="bg-themeGray" />
        </div>
        <GoogleAuthButton method="signup" />
        <p className="text-sm text-center text-themeTextGray mt-4">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-themeTextWhite hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUpPage
