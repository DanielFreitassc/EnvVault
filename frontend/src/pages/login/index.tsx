import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/context/auth/useAuthContext";
import { TLoginForm, useLoginForm } from "@/hooks/form/useLoginForm";
import { LockIcon, UserIcon } from "lucide-react";
import ChangeInitialPasswordFormDialog from "@/components/Dialogs/ChangePassword";
import { useState } from "react";
import { activateUser } from "@/services/auth/activate-user";

export default function Login() {
  const { methods } = useLoginForm();
  const { signIn } = useAuthContext();
  const { push } = useRouter();

  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] =
    useState(false);

  const handleLogin = async (data: TLoginForm) => {
    const decoded = await signIn(data);

    console.log(decoded);

    if (!decoded?.activate) {
      console.log(decoded);

      setIsChangePasswordDialogOpen(true);
      await activateUser();
      return;
    }
    push("/envs");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-950 p-4">
      <ChangeInitialPasswordFormDialog
        isOpen={isChangePasswordDialogOpen}
        setIsOpen={setIsChangePasswordDialogOpen}
        action={() => {
          push("/envs");
        }}
      />
      <Card className="w-full max-w-md border-gray-800 bg-gray-900 text-gray-100">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
          <CardDescription className="text-gray-400">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...methods}>
            <form
              onSubmit={methods.handleSubmit(handleLogin)}
              className="flex flex-col gap-4"
            >
              <FormField
                name="username"
                control={methods.control}
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-gray-200">Username:</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                          <UserIcon className="h-5 w-5" />
                        </div>
                        <Input
                          {...field}
                          id="username"
                          type="text"
                          placeholder="Insira seu username"
                          className="pl-10 bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500 focus-visible:ring-gray-700"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={methods.control}
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-gray-200">Senha:</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                          <LockIcon className="h-5 w-5" />
                        </div>
                        <Input
                          {...field}
                          id="password"
                          type="password"
                          placeholder="Insira sua senha"
                          className="pl-10 bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500 focus-visible:ring-gray-700"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={methods.formState.isSubmitting}
              >
                {methods.formState.isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
