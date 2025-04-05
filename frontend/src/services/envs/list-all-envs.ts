import { api } from "../axios";

export interface ListAllEnvsOutput {
  name: string;
}

export const listAllEnvs = async ({
  search,
}: {
  search: string;
}): Promise<ListAllEnvsOutput[]> => {
  const res = await api.get(`/env`, {
    params: {
      search,
    },
  });

  return res.data;
};
