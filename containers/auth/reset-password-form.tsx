"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useResetPassword } from "@/sdk/mutations/auth"
import { LoadingIcon } from "@/components/ui/loading"
import { CheckCircle2Icon, ArrowLeft, Eye, EyeOff } from "lucide-react"
import { Link } from "@/i18n/routing"

const formSchema = z.object({
  password: z.string().min(6, { message: "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Нууц үг таарахгүй байна",
  path: ["confirmPassword"],
})

const ResetPasswordForm = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const { loading, resetPassword, success } = useResetPassword()

  useEffect(() => {
    if (!token) {
      router.push("/login")
    }
  }, [token, router])

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!token) return

    resetPassword({
      variables: {
        newPassword: values.password,
        token
      },
    })
  }

  if (success) {
    return (
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <CheckCircle2Icon className="h-16 w-16 text-green-500" />
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Нууц үг амжилттай солигдлоо
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-300">
              Таны нууц үг амжилттай шинэчлэгдлээ. Одоо шинэ нууц үгээрээ нэвтэрч орно уу.
            </p>
          </div>

          <div className="pt-4">
            <Button
              asChild
              className="w-full h-12 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 text-white font-semibold rounded-xl"
            >
              <Link href="/login">
                Нэвтрэх
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!token) {
    return (
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Буруу холбоос
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-300">
              Нууц үг сэргээх холбоос буруу эсвэл хугацаа дууссан байна.
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <Button
              asChild
              className="w-full h-12 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 text-white font-semibold rounded-xl"
            >
              <Link href="/forgot">
                Дахин оролдох
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              className="w-full h-12 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Link href="/login">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Нэвтрэх рүү буцах
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8">
      <Form {...form}>
        <form
          className="space-y-6 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-2 text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Нууц үг сэргээх
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Шинэ нууц үгээ оруулж баталгаажуулна уу.
            </p>
          </div>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Шинэ нууц үг
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Шинэ нууц үгээ оруулна уу"
                      {...field}
                      className="pr-12 h-12 bg-gray-50/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 text-base"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-12 px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Нууц үг баталгаажуулах
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Нууц үгээ дахин оруулна уу"
                      {...field}
                      className="pr-12 h-12 bg-gray-50/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 text-base"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-12 px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-base"
              disabled={loading}
            >
              {loading && <LoadingIcon className="mr-2 h-5 w-5" />}
              {loading ? "Шинэчилж байна..." : "Нууц үг шинэчлэх"}
            </Button>

            <Button
              asChild
              variant="ghost"
              className="w-full h-12 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Link href="/login">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Нэвтрэх рүү буцах
              </Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ResetPasswordForm