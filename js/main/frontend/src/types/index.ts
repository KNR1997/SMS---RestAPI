export interface Invoice {
  id: number;
  companyName: string;
  invoiceNumber: string;
  value: number;
  fgsStatus: EStatus;
  financeStatus: EStatus;
  createdAt: string;
}

export interface Course {
  id: number;
  name: string;
  slug: string;
  code: string;
  grade: EGrade;
}

export interface CreateCourse {
  name: string;
  slug: string;
  code: string;
}

export interface Subject {
  id: number;
  name: string;
  slug: string;
  code: string;
}

export interface CreateSubject {
  name: string;
  slug: string;
  code: string;
}

export interface InvoiceStatusAudit {
  id: number;
  invoiceNumber: number;
  statusField: string;
  oldValue: string;
  newValue: string;
  updatedBy: string;
  updatedAt: string;
}

export enum EStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

export enum ERequestType {
  FG_REQUEST = "FG_REQUEST",
  FINANCE_REQUEST = "FINANCE_REQUEST",
}

export enum ERole {
  ROLE_ADMIN = "ROLE_ADMIN",
  ROLE_TEACHER = "ROLE_TEACHER",
  ROLE_RECEPTIONIST = "ROLE_RECEPTIONIST",
  ROLE_STUDENT = "ROLE_STUDENT",
}

export enum EGrade {
  GRADE_5 = "GRADE_5",
  GRADE_6 = "GRADE_6",
  GRADE_7 = "GRADE_7",
  GRADE_8 = "GRADE_8",
  GRADE_9 = "GRADE_9",
  GRADE_10 = "GRADE_10",
  GRADE_11 = "GRADE_11",
}

export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  roles: Role[];
  grade: EGrade;
  studentId: number;
}

export interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: ERole;
}

export interface EnrollCourseData {
  courseId: number,
}

export interface Student {
  id: number;
  user: User;
  studentId: string;
  dateOfBirth: string;
  grade: EGrade;
}

export interface CreateStudent {
  userDetails: CreateUser;
  dateOfBirth: Date;
  grade: EGrade;
  guardianName: string;
  contactNumber: string;
}

export interface Request {
  id: number;
  invoiceId: number;
  invoiceNumber: string;
  requestType: ERequestType;
  status: EStatus;
}

export interface CreateRequestInput {
  invoiceId: number;
  requestType: string;
}

export enum SortOrder {
  Asc = "asc",
  Desc = "desc",
}

export interface QueryOptions {
  language: string;
  limit?: number;
  page?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
}

export interface PaginatorInfo<T> {
  current_page: number;
  content: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: any[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface MappedPaginatorInfo {
  currentPage: number;
  firstPageUrl: string;
  from: number;
  lastPage: number;
  lastPageUrl: string;
  links: any[];
  nextPageUrl: string | null;
  path: string;
  perPage: number;
  prevPageUrl: string | null;
  to: number;
  total: number;
  hasMorePages: boolean;
}

export interface InvoicePaginator extends PaginatorInfo<Invoice> {}

export interface UserPaginator extends PaginatorInfo<User> {}

export interface StudentPaginator extends PaginatorInfo<Student> {}

export interface SubjectPaginator extends PaginatorInfo<Subject> {}

export interface CoursePaginator extends PaginatorInfo<Course> {}

export interface InvoiceStatusAuditPaginator
  extends PaginatorInfo<InvoiceStatusAudit> {}

export interface InvoiceQueryOptions extends QueryOptions {
  companyName: string;
  fgsStatus: string;
  financeStatus: string;
  start_date: string;
  end_date: string;
}

export interface UserQueryOptions extends QueryOptions {
  username: string;
}

export interface StudentQueryOptions extends QueryOptions {
  username: string;
}

export interface SubjectQueryOptions extends QueryOptions {
  name: string;
}

export interface CourseQueryOptions extends QueryOptions {
  name: string;
  grade: EGrade;
}

export interface InvoiceStatusAuditQueryOptions extends QueryOptions {
  username: string;
}

export interface GetParams {
  slug: string;
}

export interface QueryOptions {
  language: string;
  limit?: number;
  page?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
}
