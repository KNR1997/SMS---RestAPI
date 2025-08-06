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
  active: boolean;
  batch: number;
  description: string;
  year: number;
}

export interface Enrollment {
  id: number;
  studentName: string;
  courseName: string;
  courseCode: string;
  enrollmentDate: string;
  status: string;
  lastPaidMonth: number;
  lastPaidMonthName: string;
  active: boolean;
}

export interface EnrollmentPayment {
  id: number;
  enrollment?: Enrollment;
  enrollmentId: number;
  monthNumber: number;
  amount: number;
  paymentDate: string;
  payment?: Payment;
  paymentId: number;
}

export interface CoursePaymentSummary {
  courseName: string;
  courseFee: number;
  income: number;
  students?: number;
  monthNumber: number;
}

export interface StudentsPerCouse {
  studentCount: number;
  courseName: string;
}

export interface StudentsPerGrade {
  studentCount: number;
  grade: string;
}

export interface InstitueMonthlyIncome {
  year: number;
  month: number;
  totalIncome: number;
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
  lastPaidMonthName: string;
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
  active: boolean;
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
  status: ExamStatusType;
  code: string;
  active: boolean;
}

export interface ExamPageData {
  id: number;
  course: Course;
  capacity: number;
  status: ExamStatusType;
  eventType: EventType;
  date: string;
  startTime: string;
  endTime: string;
  reference: string;
  code: string;
}

export interface CreateExam {
  courseId: number;
}

export interface ExamResult {
  id: number;
  studentId: number;
  studentName: string;
  result: string;
  courseName: string;
}

export enum ExamStatusType {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
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
  ROLE_MANAGER = "ROLE_MANAGER",
  ROLE_TEACHER = "ROLE_TEACHER",
  ROLE_RECEPTIONIST = "ROLE_RECEPTIONIST",
  ROLE_STUDENT = "ROLE_STUDENT",
}

export enum EGrade {
  //GRADE_5 = "GRADE_5",
  GRADE_6 = "GRADE_6",
  GRADE_7 = "GRADE_7",
  GRADE_8 = "GRADE_8",
  GRADE_9 = "GRADE_9",
  GRADE_10 = "GRADE_10",
  GRADE_11 = "GRADE_11",
}

export enum EGender {
  Male = "Male",
  Female = "Female",
}

export enum RelationshipType {
  FATHER = "FATHER",
  MOTHER = "MOTHER",
  GUARDIAN = "GUARDIAN",
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
  ADMIN = "ADMIN",
  RECEPTIONIST = "RECEPTIONIST",
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
  active: boolean;
  phoneNumber: string;
}

export interface CreateUser {
  firstName: string;
  lastName: string;
  // email: string;
  username: string;
  role: ERole;
  address: string;
  genderType: EGender;
}

export interface ChangePasswordInput {
  oldPassword: string;
  newPassword: string;
}

export interface Guardian {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  nationalIdentityNumber: string;
  contactNumber: number;
  active: boolean;
}

export interface GuardianPageData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  nationalIdentityNumber: string;
  contactNumber: string;
  relationship: RelationshipType;
}

export interface CreateGuardian {
  firstName: string;
  lastName: string;
  email: string;
  nationalIdentityNumber: string;
  contactNumber: number;
  relationship: RelationshipType;
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
  active: boolean;
  guardian?: Guardian;
}

export interface StudentPageData {
  id: number;
  firstName: string;
  lastName: string;
  studentId: string;
  dateOfBirth: string;
  gradeType: EGrade;
  genderType: EGender;
  admissionPayed: boolean;
  guardianPageData: GuardianPageData;
}

export interface Payment {
  id: number;
  payerType: PayerType;
  payeeType: PayerType;
  totalAmount: number;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatusType;
  referenceNumber: string;
  firstName: string;
  lastName: string;
}

export interface CreatePayment {
  studentId: number;
  admission: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  coursePaymentList: CoursePayment[];
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
  active: boolean;
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

export enum ActionType {
  ENABLE = "ENABLE",
  DISABLE = "DISABLE",
  DELETE = "DELETE",
  RESET_PASSWORD = "RESET_PASSWORD",
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
  active: boolean;
}

export interface EmployeePayment {
  id: number;
  employeeId: string;
  employeeName: string;
  monthNumber: number;
  amount: number;
  paymentDate: string;
  roleType: ERole;
  reference: string;
  coursePaymentsSummary: CoursePaymentSummary[];
}

export interface CoursePaymentSummary {
  courseName: string;
  courseFee: number;
  studentCount: number;
  income: number;
}

export interface CreateEmployeePayment {
  employeeId: number;
  monthNumber: number;
  amount: number;
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

export interface ExamResultPaginator extends PaginatorInfo<ExamResult> {}

export interface HallPaginator extends PaginatorInfo<Hall> {}

export interface EventPaginator extends PaginatorInfo<Event> {}

export interface EnrollmentPaginator extends PaginatorInfo<Enrollment> {}

export interface CoursePaymentSummaryPaginator
  extends PaginatorInfo<CoursePaymentSummary> {}

export interface EmployeePaymentPaginator
  extends PaginatorInfo<EmployeePayment> {}

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
  role: ERole | null;
  name: string;
  is_active: boolean;
}

export interface StudentQueryOptions extends QueryOptions {
  name: string;
  admissionPayed: number | null;
  grade: EGrade | null;
  is_active: boolean;
}

export interface PaymentQueryOptions extends QueryOptions {
  role: ERole | null;
  name: string;
  grade: EGrade | null;
  payerType: PayerType;
  is_active: boolean;
}

export interface SubjectQueryOptions extends QueryOptions {
  name: string;
  is_active: boolean;
}

export interface GuardianQueryOptions extends QueryOptions {
  name: string;
  is_active: boolean;
}

export interface CourseQueryOptions extends QueryOptions {
  name: string;
  grade: EGrade | null;
  is_active: boolean;
}

export interface EnrollmentQueryOptions extends QueryOptions {
  name: string;
  studentId: number;
}

export interface CoursePaymentQueryOptions extends QueryOptions {
  teacherId: number;
  monthNumber: number;
}

export interface EmployeePaymentQueryOptions extends QueryOptions {
  role: ERole | null;
  name: string;
  is_active: boolean;
  employeeName: string;
  employeeId: number;
}

export interface ExamQueryOptions extends QueryOptions {
  name: string;
  grade: EGrade | null;
}

export interface ExamResultQueryOptions extends QueryOptions {
  examId: string;
}

export interface HallQueryOptions extends QueryOptions {
  name: string;
  is_active: boolean;
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
