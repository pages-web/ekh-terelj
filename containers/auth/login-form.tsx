"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { Password } from "@/components/ui/password"
import { Link } from "@/i18n/routing"
import { useLogin } from "@/sdk/mutations/auth"
import { LoadingIcon } from "@/components/ui/loading"

const formSchema = z.object({
  login: z
    .string()
    .min(1, { message: "Нэвтрэх нэрээ оруулна уу" })
    .regex(
      /^[^\s@]+@[^\s@]+\.[^\s@]+|[0-9]{6,}$/,
      "Буруу утас эсвэл цахим хаяг"
    ),
  password: z.string().min(1, { message: "Нууц үгээ оруулна уу" }),
})

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  })

  const { login, loading, clientPortalId } = useLogin()

  function onSubmit(values: z.infer<typeof formSchema>) {
    login({
      variables: { ...values, clientPortalId },
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Имэйл эсвэл утасны дугаар
              </FormLabel>
              <FormControl>
                <div className="relative">

                  <Input
                    placeholder="Имэйл эсвэл утсаа оруулна уу"
                    {...field}
                    autoComplete="off"
                    className="pl-12 h-12 bg-gray-50/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-base"
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between mb-2">
                <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Нууц үг
                </FormLabel>
                <Button
                  asChild
                  variant="link"
                  className="py-0 h-auto font-medium px-0 text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  tabIndex={-1}
                >
                  <Link href="/forgot">Нууц үгээ мартсан уу?</Link>
                </Button>
              </div>
              <FormControl>
                <div className="relative group">
                  <Password
                    {...field}
                    autoComplete="off"
                    containerClassName="bg-gray-50/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all duration-200"
                    className="pl-12 h-12 text-base bg-transparent border-none focus-visible:ring-0"
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full h-12 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-base"
          disabled={loading}
        >
          {loading && <LoadingIcon className="mr-2 h-5 w-5" />}
          {loading ? "Нэвтэрч байна..." : "Нэвтрэх"}
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm
