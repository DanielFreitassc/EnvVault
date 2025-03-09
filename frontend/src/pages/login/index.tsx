import { Title } from "@/components/Typography/Title";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/services/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  username: z.string().min(1, "Campo obrigatório"),
  password: z.string().min(1, "Campo obrigatório"),
});

type TFormData = z.infer<typeof schema>;

const Login = () => {
  const methods = useForm<TFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  const handleLogin = async (data: TFormData) => {
    await api
      .post("/auth/login", {
        ...data,
      })
      .then((res) => {
        console.log(res.data.token);
      });
  };

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <Title text="Login" />
      <div className="border-stroke border-2 max-h-40 h-full max-w-80 w-full">
        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(handleLogin)}>
            <FormField
              name="username"
              control={methods.control}
              render={({ field }) => (
                <Input placeholder="Digite seu username" {...field} />
              )}
            />
            <FormField
              name="password"
              control={methods.control}
              render={({ field }) => (
                <Input
                  placeholder="Digite seu username"
                  type="password"
                  {...field}
                />
              )}
            />

            <Button>Entrar</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
