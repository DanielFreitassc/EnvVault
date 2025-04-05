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
import { TEditEnvs, useEditEnvsForm } from "@/hooks/form/useEditEnvsForm";
import { IEnv } from "@/pages/envs";
import { editEnv } from "@/services/envs/edit-env";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface EnvsFormProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  envsData: IEnv;
}

export default function EditEnvsFormDialog({
  isOpen,
  setIsOpen,
  envsData,
}: EnvsFormProps) {
  const { methods } = useEditEnvsForm();
  const isSubmitting = methods.formState.isSubmitting;

  const handleClose = () => {
    methods.reset();
    setIsOpen(false);
  };

  const mutate = useMutation({
    mutationKey: ["edit-env"],
    mutationFn: ({ name, value }: ICompleteEnv) => editEnv({ name, value }),
    onSuccess: (newData) => {
      handleClose();
      toast.success(newData.message);
    },
  });

  const handleFormSubmit = async (data: TEditEnvs) => {
    return mutate.mutateAsync({ name: envsData.name, value: data.value });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-900 text-gray-100 border-gray-800">
        <DialogHeader>
          <DialogTitle>Editar o valor da variável {envsData.name}</DialogTitle>
        </DialogHeader>
        <Form {...methods}>
          <form
            className="space-y-4 py-4"
            onSubmit={methods.handleSubmit(handleFormSubmit)}
          >
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
                {isSubmitting ? "Editando..." : "Editar"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
