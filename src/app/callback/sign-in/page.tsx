import { onSignInUser } from "@/actions/auth"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const CompleteSigIn = async () => {
  const user = await currentUser()
  if (!user) return redirect("/sign-in")

  const authenticated = await onSignInUser(user.id, user.firstName as string)

  if (authenticated.status === 200) {
    return redirect(`/group/create`)
  }

  if (authenticated.status === 207) {
    return redirect(
      `/group/${authenticated.groupId}/channel/${authenticated.channelId}`,
    )
  }

  return redirect("/group/create")
}

export default CompleteSigIn
