import { GetParams, PaginatorInfo, Student } from "../../types";
import { API_ENDPOINTS } from "./api-endpoints";
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
    resetPassword: ({ id }: { id: number }) => {
      return HttpClient.put<Student>(
        `${API_ENDPOINTS.STUDENTS}/${id}/reset-password`,
        {}
      );
    },
    update({ id, ...input }: Partial<InputType> & { id: number }) {
      return HttpClient.put<Type>(`${endpoint}/${id}`, input);
    },
    delete({ id }: { id: number }) {
      return HttpClient.delete<boolean>(`${endpoint}/${id}`);
    },
    patch({ id, ...input }: Partial<InputType> & { id: number }) {
      return HttpClient.patch<Type>(`${endpoint}/${id}`, input);
    },
  };
}
