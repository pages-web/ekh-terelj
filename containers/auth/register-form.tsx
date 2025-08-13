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
import { useRegister } from "@/sdk/mutations/auth"
import { toast } from "sonner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, User, Mail, Phone, Lock } from "lucide-react"
import { useRouter } from "@/i18n/routing"
import { passwordZod, phoneZod } from "@/lib/zod"
import { LoadingIcon } from "@/components/ui/loading"

const formSchema = z.object({
  firstName: z.string().min(1, { message: "Нэрээ оруулна уу" }),
  lastName: z.string().optional(),
  email: z.string().email({ message: "Зөв имэйл хаяг оруулна уу" }),
  phone: phoneZod,
  password: passwordZod,
})

const RegisterForm = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    },
  })
  const { register, loading, clientPortalId } = useRegister()

  function onSubmit(values: z.infer<typeof formSchema>) {
    register({
      variables: { ...values, clientPortalId },
      onCompleted() {
        toast.success("Бүртгэл амжилттай!", {
          description: "Таны имэйл рүү баталгаажуулах холбоос илгээлээ.",
        })
        router.push("/login")
      },
    })
  }

  return (
    <Form {...form}>
      <form
        className="space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Нэр *
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Input
                      placeholder="Бат"
                      {...field}
                      autoComplete="given-name"
                      className="pl-12 h-12 bg-gray-50/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 text-base"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Овог
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Input
                      placeholder="Дорж"
                      {...field}
                      autoComplete="family-name"
                      className="pl-12 h-12 bg-gray-50/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 text-base"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        {/* Contact Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Имэйл *
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Input
                      placeholder="bataa@example.com"
                      {...field}
                      autoComplete="email"
                      className="pl-12 h-12 bg-gray-50/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 text-base"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Утасны дугаар *
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Input
                      placeholder="99112233"
                      {...field}
                      autoComplete="tel"
                      className="pl-12 h-12 bg-gray-50/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 text-base"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Нууц үг *
              </FormLabel>
              <FormControl>
                <div className="relative group">
                  <Password
                    {...field}
                    autoComplete="new-password"
                    containerClassName="bg-gray-50/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl focus-within:ring-2 focus-within:ring-purple-500/20 focus-within:border-purple-500 transition-all duration-200"
                    className="pl-12 h-12 text-base bg-transparent border-none focus-visible:ring-0"
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <Button
          className="w-full h-12 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-base"
          disabled={loading}
        >
          {loading && <LoadingIcon className="mr-2 h-5 w-5" />}
          {loading ? "Бүртгэж байна..." : "Бүртгүүлэх"}
        </Button>

        <Alert className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800/50 rounded-xl">
          <InfoIcon className="h-4 w-4 text-slate-600 dark:text-slate-400" />
          <AlertTitle className="text-sm font-semibold text-slate-800 dark:text-slate-300">
            Нууцлал ба нөхцөл
          </AlertTitle>
          <AlertDescription className="text-xs mt-1 text-slate-700 dark:text-slate-400">
            Бүртгэл үүсгэснээр та манай{" "}
            <Button
              variant="link"
              asChild
              className="h-auto px-0 py-0 text-xs underline text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-300 font-medium"
            >
              <Link href="#">Нууцлалын бодлого</Link>
            </Button>{" "}
            and{" "}
            <Button
              variant="link"
              asChild
              className="h-auto px-0 py-0 text-xs underline text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-300 font-medium"
            >
              <Link href="#">Үйлчилгээний нөхцөл</Link>
            </Button>
            -ийг зөвшөөрсөнд тооцно.
          </AlertDescription>
        </Alert>
      </form>
    </Form>
  )
}

export default RegisterForm
