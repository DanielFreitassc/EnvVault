import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { deleteEnv } from "@/services/envs/delete-env";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export const DeletePopover = ({ name }: { name: string }) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const mutation = useMutation({
    mutationKey: ["delete-env"],
    mutationFn: deleteEnv,
    onSuccess: (data) => {
      queryClient.setQueryData(["all-envs"], (oldData: IEnv[]) => {
        return oldData.filter((env) => env.name !== name);
      });
      toast.success(data.message);
      setIsOpen(false);
    },
  });

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-gray-700 hover:bg-gray-800 text-gray-300"
        >
          <TrashIcon className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-[#1F2937] max-w-5xl">
        <div className="flex flex-col gap-3">
          <p className="text-white">Deseja deletar a variavel de ambiente</p>
          <span className="text-white text-xs">{name}?</span>
          <div className="w-full flex justify-end">
            <Button
              className="bg-red-600 hover:bg-red-800 text-white"
              onClick={() => mutation.mutateAsync(name)}
            >
              Deletar
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
