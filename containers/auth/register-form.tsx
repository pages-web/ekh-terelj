"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Password } from "@/components/ui/password";
import { Link } from "@/i18n/routing";
import { useRegister } from "@/sdk/mutations/auth";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { passwordZod, phoneZod } from "@/lib/zod";
import { LoadingIcon } from "@/components/ui/loading";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "Нэрээ оруулна уу" }),
  lastName: z.string().optional(),
  email: z.string().email(),
  phone: phoneZod,
  password: passwordZod,
});

const RegisterForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    },
  });
  const { register, loading, clientPortalId } = useRegister();

  function onSubmit(values: z.infer<typeof formSchema>) {
    register({
      variables: { ...values, clientPortalId },
      onCompleted() {
        toast.success("Congratulations, You registered successfully", {
          description: "Таны имэйл рүү баталгаажуулах холбоос илгээлээ.",
        });
        router.push("/login");
      },
    });
  }
  return (
    <Form {...form}>
      {/* md:grid grid-cols-2 space-y-4 md:space-y-0 gap-y-6 gap-x-3 relative */}
      <form
        className="grid grid-cols-2 gap-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John"
                  {...field}
                  autoComplete="given-name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Doe"
                  {...field}
                  autoComplete="family-name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="john@doe.com"
                  {...field}
                  autoComplete="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  placeholder="0000 0000"
                  {...field}
                  autoComplete="tel-national"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Password {...field} autoComplete="new-password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full col-span-2" size="lg" disabled={loading}>
          {loading && <LoadingIcon />}
          Sign Up
        </Button>
        <Alert className="col-span-2">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle className="text-textsm">Caution!</AlertTitle>
          <AlertDescription className="text-textxs">
            By clicking Sign Up, you agree to our{" "}
            <Button
              variant="link"
              asChild
              className="h-auto px-0 py-0 mx-1 text-foreground"
              size="sm"
            >
              <Link href="/terms-of-service">Privacy Policy </Link>
            </Button>{" "}
            болон{" "}
            <Button
              variant="link"
              asChild
              className="h-auto px-0 py-0 mx-1 text-foreground"
              size="sm"
            >
              <Link href="/terms-of-service">Terms of Service.</Link>
            </Button>
          </AlertDescription>
        </Alert>
      </form>
    </Form>
  );
};

export default RegisterForm;
