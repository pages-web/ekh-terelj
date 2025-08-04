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
import { useForgotPassword } from "@/sdk/mutations/auth"
import { LoadingIcon } from "@/components/ui/loading"
import { CheckCircle2Icon, Mail, ArrowLeft } from "lucide-react"
import { Link } from "@/i18n/routing"

const formSchema = z.object({
  email: z.string().email({ message: "Зөв имэйл хаяг оруулна уу" }),
})

const ForgotForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  const { loading, forgotPassword, clientPortalId, success } =
    useForgotPassword()

  function onSubmit(values: z.infer<typeof formSchema>) {
    forgotPassword({
      variables: { email: values.email, clientPortalId },
    })
  }

  if (success) {
    return (
      <div className="text-center space-y-6">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 rounded-full flex items-center justify-center">
          <CheckCircle2Icon
            className="text-green-600 dark:text-green-400 h-8 w-8 animate-pulse"
            strokeWidth={1.5}
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Имэйлээ шалгана уу
          </h3>
          <p className="text-base text-gray-600 dark:text-gray-300">
            Нууц үг сэргээх холбоосыг таны имэйл хаяг руу илгээлээ.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Имэйл ирээгүй байна уу? Спам хавтасыг шалгах эсвэл дахин оролдоно уу.
          </p>
        </div>

        <div className="space-y-3 pt-4">
          <Button
            asChild
            className="w-full h-12 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 text-white font-semibold rounded-xl"
          >
            <Link href="/login">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Нэвтрэх рүү буцах
            </Link>
          </Button>

          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="w-full h-12 rounded-xl border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Дахин оролдох
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form
        className="space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Нууц үг сэргээх
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Имэйл хаягаа оруулснаар бид танд нууц үг сэргээх холбоос илгээнэ.
          </p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Имэйл хаяг
              </FormLabel>
              <FormControl>
                <div className="relative group">
                  <Input
                    placeholder="Имэйл хаягаа оруулна уу"
                    {...field}
                    autoComplete="email"
                    className="pl-12 h-12 bg-gray-50/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 text-base"
                  />
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
            {loading ? "Илгээж байна..." : "Холбоос илгээх"}
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
  )
}

export default ForgotForm
