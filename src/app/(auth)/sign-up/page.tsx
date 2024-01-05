"use client";

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AuthCredentialValidator,
  TAuthCredentialValidator,
} from "@/lib/validator/account-credectial-validator";

const Page = () => {
  const hookForm = useForm({
    resolver: zodResolver(AuthCredentialValidator),
  });

  const onSubmit: SubmitHandler<FieldValues | TAuthCredentialValidator> = ({
    email,
    password,
  }) => {
    console.info(email, password);
    if (email && password) {
      hookForm.reset();
    }
  };

  return (
    <Form {...hookForm}>
      <div className="container relative justify-center items-center flex flex-col pt-20 lg:px-0">
        <div className="mx-auto w-full flex flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-bold">Create an Account</h1>
            <Link
              href="/sign-in"
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
            >
              Already have an account? sign-in
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <form onSubmit={hookForm.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <FormField
                name="email"
                control={hookForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="email@example.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={hookForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Create Account</Button>
            </div>
          </form>
        </div>
      </div>
    </Form>
  );
};

export default Page;
