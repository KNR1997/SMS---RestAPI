import { GetParams, PaginatorInfo } from "../../types";
import { HttpClient } from "./http-client";

interface LanguageParam {
  language: string;
}

export function crudFactory<Type, QueryParams extends LanguageParam, InputType>(
  endpoint: string
) {
  return {
    all(params: QueryParams) {
      return HttpClient.get<Type[]>(endpoint, params);
    },
    paginated(params: QueryParams) {
      return HttpClient.get<PaginatorInfo<Type>>(endpoint, params);
    },
    get({ slug }: GetParams) {
      return HttpClient.get<Type>(`${endpoint}/${slug}`);
    },
    create(data: InputType) {
      return HttpClient.post<Type>(endpoint, data);
    },
    update({ id, ...input }: Partial<InputType> & { id: number }) {
      return HttpClient.put<Type>(`${endpoint}/${id}`, input);
    },
    delete({ id }: { id: string }) {
      return HttpClient.delete<boolean>(`${endpoint}/${id}`);
    },
  };
}