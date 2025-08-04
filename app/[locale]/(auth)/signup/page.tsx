import { Button } from "@/components/ui/button"
import RegisterForm from "@/containers/auth/register-form"
import { Link } from "@/i18n/routing"
import { User } from "lucide-react"

const SignUp = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 rounded-xl flex items-center justify-center mb-4">
            <User className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Бүртгэл үүсгэх
          </h1>

        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl p-8 shadow-2xl shadow-purple-500/10 dark:shadow-blue-500/10">
          <RegisterForm />
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Бүртгэлтэй юу?{" "}
            <Button
              variant="link"
              className="font-semibold p-0 h-auto text-sm bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 bg-clip-text text-transparent hover:from-slate-900 hover:to-slate-700"
              asChild
            >
              <Link href="/login">Нэвтрэх</Link>
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
