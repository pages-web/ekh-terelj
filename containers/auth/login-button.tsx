"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "@/i18n/routing"

const LoginButton = () => {
  const router = useRouter()
  return (
    <Button onClick={() => router.push("/login")} size={"lg"}>
      Нэвтрэх
    </Button>
  )
}
export default LoginButton
