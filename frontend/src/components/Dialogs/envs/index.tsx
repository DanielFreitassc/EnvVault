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
import { TEnvs, useEnvsForm } from "@/hooks/form/useEnvsForm";
import { createEnv } from "@/services/envs/create-env";
import { toast } from "react-toastify";

interface EnvsFormProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  envsData: TEnvs | undefined;
}

export default function EnvsFormDialog({
  isOpen,
  setIsOpen,
  envsData,
}: EnvsFormProps) {
  const { methods } = useEnvsForm();

  const handleFormSubmit = async (data: TEnvs) => {
    console.log(data);
    if (!envsData) {
      await createEnv(data).then((res) => {
        toast.success(res.message);
        setIsOpen(false);
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-gray-900 text-gray-100 border-gray-800">
        <DialogHeader>
          <DialogTitle>
            {envsData
              ? "Edit Environment Variable"
              : "Create Environment Variable"}
          </DialogTitle>
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
              >
                Cancel
              </Button>
              <Button className="bg-primary hover:bg-primary/90">Save</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
