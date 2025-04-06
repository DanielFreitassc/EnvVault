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
import { TCreateEnvs, useCreateEnvsForm } from "@/hooks/form/useCreateEnvsForm";
import { createEnv } from "@/services/envs/create-env";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

interface EnvsFormProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateEnvsFormDialog({
  isOpen,
  setIsOpen,
}: EnvsFormProps) {
  const { methods } = useCreateEnvsForm();
  const queryClient = useQueryClient();
  const router = useRouter();
  const query = router.query as { search: string };
  const isSubmitting = methods.formState.isSubmitting;

  const handleClose = () => {
    methods.reset();
    setIsOpen(false);
  };
  console.log(query.search);

  const mutate = useMutation({
    mutationKey: ["create-env"],
    mutationFn: createEnv,
    onSuccess: (data) => {
      if (!query.search || query.search?.includes(data.name)) {
        queryClient.setQueryData(
          ["all-envs", query.search || ""],
          (oldData: IEnv[]) => [data, ...oldData]
        );
      }

      toast.success(data.message);
      handleClose();
    },
  });

  const handleFormSubmit = async (data: TCreateEnvs) => {
    return mutate.mutateAsync(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-gray-900 text-gray-100 border-gray-800">
        <DialogHeader>
          <DialogTitle>Criar variável de ambiente</DialogTitle>
        </DialogHeader>
        <Form {...methods}>
          <form
            className="space-y-4 py-4"
            onSubmit={methods.handleSubmit(handleFormSubmit)}
          >
            <div className="space-y-2">
              <FormField
                name="name"
                control={methods.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="name"
                        placeholder="NEXT_PUBLIC_API_URL"
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
                name="value"
                control={methods.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="value"
                        placeholder="https://api.example.com"
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
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="border-gray-700 hover:bg-gray-800 text-gray-300"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                className="bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Criando..." : "Criar"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
