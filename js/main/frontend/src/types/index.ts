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
  gradeType: EGrade;
  subjectId: number;
  teacherId: number;
  fee: number;
}

export interface Enrollment {
  id: number;
  studentName: string;
  courseName: string;
  courseCode: string;
  enrollmentDate: string;
  status: string;
}

export interface EnrollmentPayment {
  monthNumber: number;
  monthName: string;
  amount: number;
  paymentDate: string;
}

export interface EnrollmentPageData {
  id: number;
  firstName: string;
  lastName: string;
  studentId: string;
  dateOfBirth: string;
  admissionPayed: boolean;
  courseDetails: Course;
  lastPaidMonth: number;
  lastPaidMonthName: string
  enrollmentPayments: EnrollmentPayment[];
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

export interface Exam {
  id: number;
  courseId: number;
  course: Course;
  courseName: string;
}

export interface CreateExam {
  courseId: number;
}

export enum EStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

export enum PaymentMethod {
  CASH = "CASH",
  CARD = "CARD",
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

export enum EEnrollmentStatus {
  ACTIVE = "ACTIVE",
  LOCKED = "LOCKED",
  DROPPED = "DROPPED",
}

export interface Role {
  id: number;
  name: string;
}

export enum PayerType {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  MANAGER = "MANAGER",
  INSTITUTE = "INSTITUTE",
}

export enum PaymentType {
  ADMISSION_FEE = "ADMISSION_FEE",
  COURSE_FEE = "COURSE_FEE",
  EXAM_FEE = "EXAM_FEE",
  HOSTEL_FEE = "HOSTEL_FEE",
  SALARY = "SALARY",
  OTHER = "OTHER",
}

export enum PaymentStatusType {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  erole: ERole;
  gradeType: EGrade;
  studentId: number;
  role: ERole;
}

export interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: ERole;
}

export interface Guardian {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  nationalIdentityNumber: string;
  contactNumber: string;
}

export interface GuardianPageData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  nationalIdentityNumber: string;
  contactNumber: string;
}

export interface CreateGuardian {
  firstName: string;
  lastName: string;
  email: string;
  nationalIdentityNumber: string;
  contactNumber: string;
}

export interface EnrollCourseData {
  courseIds: number[];
}

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  studentId: string;
  dateOfBirth: string;
  gradeType: EGrade;
  admissionPayed: boolean;
}

export interface StudentPageData {
  id: number;
  firstName: string;
  lastName: string;
  studentId: string;
  dateOfBirth: string;
  gradeType: EGrade;
  admissionPayed: boolean;
  guardianPageData: GuardianPageData;
}

export interface Payment {
  id: number;
  payerType: PayerType;
  totalAmount: number;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatusType;
}

export interface CreatePayment {
  studentId: number;
  admission: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  coursePaymentList: CoursePayment[]
}

export interface CoursePayment {
  courseId: number;
  paymentMonths: number[];
}

export interface CreatePaymentItem {
  paymentType: PaymentType;
  amount: number;
  description: string;
}

export interface CreateStudent {
  userDetails: CreateUser;
  guardianDetails: CreateGuardian;
  dateOfBirth: Date;
  gradeType: EGrade;
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

export interface Hall {
  id: number;
  name: string;
  examCapacity: number;
  lectureCapacity: number;
}

export interface CreateHall {
  name: string;
  examCapacity: number;
  lectureCapacity: number;
}

export enum EventType {
  COURSE = "COURSE",
  EXAM = "EXAM",
}

export enum EventStatusType {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface Event {
  id: number;
  code: string;
  eventType: EventType;
  date: number;
  startTime: number;
  endTime: number;
  reference: number;
  halls: Hall[];
  status: EventStatusType;
}

export interface CreateEvent {
  code: string;
  eventType: EventType;
  date: string;
  startTime: string;
  endTime: string;
  reference: string;
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

export interface GuardianPaginator extends PaginatorInfo<Guardian> {}

export interface PaymentPaginator extends PaginatorInfo<Payment> {}

export interface CoursePaginator extends PaginatorInfo<Course> {}

export interface ExamPaginator extends PaginatorInfo<Exam> {}

export interface HallPaginator extends PaginatorInfo<Hall> {}

export interface EventPaginator extends PaginatorInfo<Event> {}

export interface EnrollmentPaginator extends PaginatorInfo<Enrollment> {}

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
  role: ERole;
}

export interface StudentQueryOptions extends QueryOptions {
  username: string;
}

export interface PaymentQueryOptions extends QueryOptions {}

export interface SubjectQueryOptions extends QueryOptions {
  name: string;
}

export interface GuardianQueryOptions extends QueryOptions {}

export interface CourseQueryOptions extends QueryOptions {
  name: string;
  gradeType: EGrade;
}

export interface ExamQueryOptions extends QueryOptions {
  name: string;
}

export interface HallQueryOptions extends QueryOptions {
  name: string;
}

export interface EventQueryOptions extends QueryOptions {
  code: string;
}

export interface EnrollmentQueryOptions extends QueryOptions {}

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
