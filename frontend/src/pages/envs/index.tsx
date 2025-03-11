"use client";

import { useState } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

type EnvVariable = {
  id: string;
  name: string;
  value: string;
};

export default function EnvVariablesManager() {
  // Sample data - replace with your actual data source
  const [envVariables, setEnvVariables] = useState<EnvVariable[]>([
    { id: "1", name: "API_KEY", value: "sk_test_123456789" },
    {
      id: "2",
      name: "DATABASE_URL",
      value: "postgres://user:password@localhost:5432/db",
    },
    { id: "3", name: "NEXT_PUBLIC_SITE_URL", value: "https://example.com" },
    { id: "4", name: "JWT_SECRET", value: "your-secret-key" },
    { id: "5", name: "SMTP_HOST", value: "smtp.example.com" },
    { id: "6", name: "REDIS_URL", value: "redis://localhost:6379" },
    { id: "7", name: "AWS_ACCESS_KEY", value: "AKIAIOSFODNN7EXAMPLE" },
    { id: "8", name: "STRIPE_SECRET_KEY", value: "sk_live_123456789" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEnv, setCurrentEnv] = useState<EnvVariable | null>(null);
  const [newEnvName, setNewEnvName] = useState("");
  const [newEnvValue, setNewEnvValue] = useState("");

  const filteredVariables = envVariables.filter((env) =>
    env.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateNew = () => {
    setCurrentEnv(null);
    setNewEnvName("");
    setNewEnvValue("");
    setIsDialogOpen(true);
  };

  const handleEdit = (env: EnvVariable) => {
    setCurrentEnv(env);
    setNewEnvName(env.name);
    setNewEnvValue(env.value);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setEnvVariables(envVariables.filter((env) => env.id !== id));
  };

  const handleSave = () => {
    if (newEnvName.trim() === "") return;

    if (currentEnv) {
      // Edit existing
      setEnvVariables(
        envVariables.map((env) =>
          env.id === currentEnv.id
            ? { ...env, name: newEnvName, value: newEnvValue }
            : env
        )
      );
    } else {
      // Create new
      const newId = Math.random().toString(36).substring(2, 9);
      setEnvVariables([
        ...envVariables,
        { id: newId, name: newEnvName, value: newEnvValue },
      ]);
    }

    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 text-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Environment Variables</h1>
        <Button
          onClick={handleCreateNew}
          className="bg-primary hover:bg-primary/90"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Create New
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredVariables.length > 0 ? (
                filteredVariables.map((env) => (
                  <tr key={env.id} className="hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-mono">{env.name}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(env)}
                          className="border-gray-700 hover:bg-gray-800 text-gray-300"
                        >
                          <PencilIcon className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(env.id)}
                          className="border-gray-700 hover:bg-gray-800 text-gray-300"
                        >
                          <TrashIcon className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={2}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    {searchTerm
                      ? "No environment variables found matching your search."
                      : "No environment variables found. Create one to get started."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-900 text-gray-100 border-gray-800">
          <DialogHeader>
            <DialogTitle>
              {currentEnv
                ? "Edit Environment Variable"
                : "Create Environment Variable"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">
                Name
              </Label>
              <Input
                id="name"
                value={newEnvName}
                onChange={(e) => setNewEnvName(e.target.value)}
                placeholder="NEXT_PUBLIC_API_URL"
                className="bg-gray-800 border-gray-700 text-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="value" className="text-gray-300">
                Value
              </Label>
              <Input
                id="value"
                value={newEnvValue}
                onChange={(e) => setNewEnvValue(e.target.value)}
                placeholder="https://api.example.com"
                className="bg-gray-800 border-gray-700 text-gray-100"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="border-gray-700 hover:bg-gray-800 text-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-primary hover:bg-primary/90"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
