"use client"

import { SignUpSchema } from "@/components/forms/sign-up/schema"
import { SignInSchema } from "@/components/forms/sign-in/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useSignUp, useSignIn, useClerk } from "@clerk/nextjs"
import { useState } from "react"
import { onSignInUser } from "@/actions/auth"

export const useAuthSignUp = () => {
  const { signUp } = useSignUp()
  const router = useRouter()

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    mode: "onBlur",
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof SignUpSchema>) => {
      const result = await signUp?.create({
        firstName: data.firstname,
        lastName: data.lastname,
        emailAddress: data.email,
        password: data.password,
      })

      if (result?.status === "complete") {
        await result.createdSessionId
        router.push("/callback/complete")
        return { status: 200 }
      }
      throw new Error("Signup failed")
    },
    onSuccess: () => {
      reset()
      toast("Success", {
        description: "Account created successfully",
      })
    },
    onError: () => {
      toast("Error", {
        description: "Failed to create account",
      })
    },
  })

  const onInitiateUserRegistration = handleSubmit(async (values) =>
    mutate(values),
  )

  return {
    register,
    errors,
    onInitiateUserRegistration,
    isPending,
  }
}

export const useAuthSignIn = () => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    mode: "onBlur",
  })

  const router = useRouter()

  const { mutate: InitiateLoginFlow, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      onSignInUser(email, password),
    onSuccess: (data) => {
      if (data.status === 200 || data.status === 207) {
        reset()
        toast("Success", {
          description: "Welcome back!",
        })
        if (data.status === 207) {
          router.push(`/group/${data.groupId}/channel/${data.channelId}`)
        } else {
          router.push("/group/create")
        }
      } else {
        toast("Error", {
          description: data.message,
        })
      }
    },
  })

  const onAuthenticateUser = handleSubmit(async (values) => {
    InitiateLoginFlow({ email: values.email, password: values.password })
  })

  return {
    onAuthenticateUser,
    isPending,
    register,
    errors,
  }
}

export const useSignOut = () => {
  const { signOut: clerkSignOut } = useClerk()
  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationFn: () => clerkSignOut(),
    onSuccess: () => {
      toast("Success", {
        description: "Signed out successfully",
      })
      router.push("/sign-in")
    },
  })

  return { signOut: mutate, isPending }
}

export const useGoogleAuth = () => {
  const { signIn } = useSignIn()
  const { signUp } = useSignUp()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const signInWith = async () => {
    try {
      setLoading(true)
      await signIn?.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/group/create",
        redirectUrlComplete: "/group/create",
      })
    } catch (error) {
      toast("Error", {
        description: "An error occurred during Google sign-in",
      })
    } finally {
      setLoading(false)
    }
  }

  const signUpWith = async () => {
    try {
      setLoading(true)
      await signUp?.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/group/create",
        redirectUrlComplete: "/group/create",
      })
    } catch (error) {
      toast("Error", {
        description: "An error occurred during Google sign-up",
      })
    } finally {
      setLoading(false)
    }
  }

  return { signInWith, signUpWith, loading }
}
