import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { changePassword } from "@/services/auth/change-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface IChangePasswordFormProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  action?: VoidFunction;
}

const schema = z
  .object({
    password: z.string().min(1, "Campo obrigatório"),
    confirmPassword: z.string().min(1, "Campo obrigatório"),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Os campos precisam ser iguais!",
        path: ["confirmPassword"],
      });
    }
  });

type TFormData = z.infer<typeof schema>;

export default function ChangeInitialPasswordFormDialog({
  isOpen,
  setIsOpen,
  action,
}: IChangePasswordFormProps) {
  const methods = useForm<TFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      confirmPassword: "",
      password: "",
    },
  });
  const isSubmitting = methods.formState.isSubmitting;

  const handleClose = () => {
    methods.reset();
    setIsOpen(false);
    if (action) action();
  };

  const mutate = useMutation({
    mutationKey: ["change-password"],
    mutationFn: (password: string) => changePassword({ password }),
    onSuccess: (data) => {
      toast.success(data.message);
      if (action) action();

      handleClose();
    },
  });

  const handleFormSubmit = async (data: TFormData) => {
    return mutate.mutateAsync(data.password);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        if (isOpen) return;
        handleClose();
      }}
    >
      <DialogContent className="bg-gray-900 text-gray-100 border-gray-800">
        <DialogHeader>
          <DialogTitle>Trocar senha inicial</DialogTitle>
        </DialogHeader>
        <p className="text-sm">
          Sua senha atual é a padrão do sistema e pode ser facilmente
          descoberta. Para proteger sua conta e seus dados, altere-a o quanto
          antes. Manter a senha padrão compromete sua segurança.
        </p>
        <Form {...methods}>
          <form
            className="space-y-4 py-4"
            onSubmit={methods.handleSubmit(handleFormSubmit)}
          >
            <div className="space-y-2">
              <FormField
                name="password"
                control={methods.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nova senha:</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="password"
                        placeholder="Insira sua nova senha"
                        type="password"
                        className="bg-gray-800 border-gray-700 text-gray-100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                name="confirmPassword"
                control={methods.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar nova senha:</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="confirmPassword"
                        placeholder="Confirme sua nova senha"
                        type="password"
                        className="bg-gray-800 border-gray-700 text-gray-100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex justify-end gap-5">
              <Button
                type="button"
                variant="link"
                onClick={handleClose}
                className="text-red-600"
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                className="bg-black hover:bg-black/60 transition-colors duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Trocando..." : "Trocar"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
