import CreateEnvsFormDialog from "@/components/Dialogs/envs/CreateEnvDialog";
import EditEnvsFormDialog from "@/components/Dialogs/envs/EditEnvDialog";
import Spinner from "@/components/Loading/Spinner";
import { DeletePopover } from "@/components/Popover/DeletePopover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { listAllEnvs } from "@/services/envs/list-all-envs";
import { useQuery } from "@tanstack/react-query";
import { PencilIcon, PlusIcon, SearchIcon, XIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useDeferredValue, useEffect, useState } from "react";

export interface IEnv {
  name: string;
}

export default function EnvVariablesManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const deferredSearch = useDeferredValue(searchTerm);
  const router = useRouter();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedEnv, setSelectedEnv] = useState<IEnv | null>(null);

  const { data = [], isLoading } = useQuery({
    queryKey: ["all-envs", deferredSearch],
    queryFn: async () => listAllEnvs({ search: deferredSearch }),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  useEffect(() => {
    router.push({
      query: {
        search: deferredSearch,
      },
    });
  }, [deferredSearch]);

  return (
    <div className="container mx-auto px-4 py-8 text-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Variáveis de ambiente</h1>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-primary hover:bg-primary/90"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Criar
        </Button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-500" />
        </div>
        <Input
          type="search"
          placeholder="Search environment variables..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500 focus-visible:ring-gray-700 w-full"
        />
        {searchTerm && (
          <button
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setSearchTerm("")}
          >
            <XIcon className="h-5 w-5 text-gray-500 hover:text-gray-300" />
          </button>
        )}
      </div>

      <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800 text-left">
                <th className="px-6 py-3 text-gray-300 font-medium">Name</th>
                <th className="px-6 py-3 text-gray-300 font-medium text-right">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-800">
              {!isLoading &&
                data.map(({ name }, i) => (
                  <tr key={i} className="hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-mono">{name}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedEnv({ name });
                            setIsEditDialogOpen(true);
                          }}
                          className="border-gray-700 hover:bg-gray-800 text-gray-300"
                        >
                          <PencilIcon className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <DeletePopover name={name} />
                      </div>
                    </td>
                  </tr>
                ))}
              {!isLoading && (!data || data.length === 0) && (
                <tr>
                  <td
                    colSpan={2}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    {searchTerm
                      ? "Nenhuma variável de ambiente encontrada que corresponda à sua busca."
                      : "Nenhuma variável de ambiente encontrada. Crie uma para começar."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {isLoading && (
            <div className="w-full flex justify-center">
              <Spinner />
            </div>
          )}
        </div>
      </div>
      <CreateEnvsFormDialog
        isOpen={isCreateDialogOpen}
        setIsOpen={setIsCreateDialogOpen}
      />
      {selectedEnv && (
        <EditEnvsFormDialog
          isOpen={isEditDialogOpen}
          setIsOpen={setIsEditDialogOpen}
          envsData={selectedEnv}
        />
      )}
    </div>
  );
}
