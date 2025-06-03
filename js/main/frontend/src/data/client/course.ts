import {
  Course,
  CoursePaginator,
  CourseQueryOptions,
  CreateCourse,
  QueryOptions,
} from "../../types";
import { API_ENDPOINTS } from "./api-endpoints";
import { crudFactory } from "./crud-factory";
import { HttpClient } from "./http-client";

export const CourseClient = {
  ...crudFactory<Course, QueryOptions, CreateCourse>(API_ENDPOINTS.COURSES),
  paginated: ({ name, ...params }: Partial<CourseQueryOptions>) => {
    return HttpClient.get<CoursePaginator>(API_ENDPOINTS.COURSES, {
      searchJoin: "and",
      // self,
      ...params,
      page: params?.page ? params.page - 1 : 0,
      search: HttpClient.formatSearchParams({
        name,
      }),
    });
  },
};
