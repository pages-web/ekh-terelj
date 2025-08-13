import { Button } from "@/components/ui/button"
import ForgotForm from "@/containers/auth/forgot-form"
import { Link } from "@/i18n/routing"
import { Suspense } from "react"
import { KeyRound } from "lucide-react"

const Forgot = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">

      <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mx-auto h-12 w-12 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 rounded-xl flex items-center justify-center mb-4">
              <KeyRound className="h-6 w-6 text-white" />
            </div>

          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl p-8 shadow-2xl shadow-green-500/10 dark:shadow-blue-500/10">
            <Suspense fallback={
              <div className="animate-pulse space-y-6">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                  <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                </div>
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
              </div>
            }>
              <ForgotForm />
            </Suspense>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Нууц үгээ санаж байна уу?{" "}{" "}
              <Button
                variant="link"
                className="font-semibold p-0 h-auto text-sm bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 bg-clip-text text-transparent hover:from-slate-700 hover:to-slate-700"
                asChild
              >
                <Link href="/login">Нэвтрэх хуудас руу буцах</Link>
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Forgot
