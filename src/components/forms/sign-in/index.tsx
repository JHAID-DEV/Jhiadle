"use client"

import { FormGenerator } from "@/components/global/form-generator"
import { Loader } from "@/components/global/loader"
import { Button } from "@/components/ui/button"
import { Jhiadle_CONSTANTS } from "@/constants"
import { useAuthSignIn } from "@/hooks/authentication"
import Link from "next/link"

const SignInForm = () => {
  const { isPending, onAuthenticateUser, register, errors } = useAuthSignIn()

  return (
    <form className="flex flex-col gap-3 mt-10" onSubmit={onAuthenticateUser}>
      {Jhiadle_CONSTANTS.signInForm.map((field) => (
        <FormGenerator
          {...field}
          key={field.id}
          register={register}
          errors={errors}
        />
      ))}
      <Button type="submit" className="rounded-2xl">
        <Loader loading={isPending}>Sign In with Email</Loader>
      </Button>
    </form>
  )
}

export default SignInForm
