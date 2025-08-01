import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Calendar from "./pages/Calendar";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import Users from "./pages/Users";
import CreateUserPage from "./pages/Users/create";
import EditUserPage from "./pages/Users/edit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ERole } from "./types";
import Students from "./pages/Students";
import CreateStudentPage from "./pages/Students/create";
import Courses from "./pages/Courses";
import CreateCoursePage from "./pages/Courses/create";
import EditCoursePage from "./pages/Courses/edit";
import Subjects from "./pages/Subjects";
import EditSubjectPage from "./pages/Subjects/edit";
import CreateSubjectPage from "./pages/Subjects/create";
import EditStudentPage from "./pages/Students/edit";
import MyCourses from "./pages/Courses/my-courses";
import CreatePaymentPage from "./pages/Payments/create";
import Payments from "./pages/Payments";
import Guardians from "./pages/Guardians";
import EditGuardianPage from "./pages/Guardians/edit";
import Enrollments from "./pages/Enrollments";
import ViewEnrollmentPage from "./pages/Enrollments/view";
import CreateEnrollPage from "./pages/Enrollments/create";
import StudentEnrollments from "./pages/Student/Enrollments";
import StudentCourses from "./pages/Student/Courses";
import Halls from "./pages/Halls";
import CreateHallPage from "./pages/Halls/create";
import EditHallPage from "./pages/Halls/edit";
import Events from "./pages/Events";
import CreateEventPage from "./pages/Events/create";
import EditEventPage from "./pages/Events/edit";
import EventsCalendar from "./pages/Events/calendar";
import Exams from "./pages/Exams";
import CreateExamPage from "./pages/Exams/create";
import StudentCalendar from "./pages/Student/calendar";
import EditExamPage from "./pages/Exams/edit";
import PaymentViewPage from "./pages/Payments/view";
import ExamResultsPage from "./pages/Exams/results";
import ExamResults from "./pages/ExamResults";
import TeacherReport from "./pages/Reports/teacher-report";
import EmployeeReport from "./pages/Reports/employee-report";
import StudentReport from "./pages/Reports/student-report";
import InstituteIncomeReport from "./pages/Reports/institute-income-report";
import MonthlyActiveStudentReport from "./pages/Reports/monthly-active-student-report";
import StudentRegistrationIncrementReport from "./pages/Reports/student-registration-increment-report";
import EmployeePayments from "./pages/Employee/Payments";
import CreateEmployeePaymentPage from "./pages/Employee/Payments/create";
import TeacherDetailPage from "./pages/Teachers/detail";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              {/* Dashboard Layout */}
              <Route element={<AppLayout />}>
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />
                {/* <Route index path="/" element={<Home />} /> */}

                {/* Others Page */}
                <Route path="/profile" element={<UserProfiles />} />
                <Route path="/calendar" element={<Calendar />} />
                {/* <Route path="/blank" element={<Blank />} /> */}

                {/* Forms */}
                {/* <Route path="/form-elements" element={<FormElements />} /> */}

                <Route
                  path="/courses"
                  element={
                    <ProtectedRoute
                      roles={[ERole.ROLE_ADMIN, ERole.ROLE_TEACHER]}
                    >
                      <Courses />
                    </ProtectedRoute>
                  }
                />
                <Route path="/courses/create" element={<CreateCoursePage />} />
                <Route
                  path="/courses/:slug/edit"
                  element={<EditCoursePage />}
                />

                {/* <Route
                  path="/courses/available-courses"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_STUDENT]}>
                      <AvailableCourses />
                    </ProtectedRoute>
                  }
                /> */}
                <Route
                  path="/courses/my-courses"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_STUDENT]}>
                      <MyCourses />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/subjects"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_ADMIN]}>
                      <Subjects />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/subjects/create"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_ADMIN]}>
                      <CreateSubjectPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/subjects/:slug/edit"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_ADMIN]}>
                      <EditSubjectPage />
                    </ProtectedRoute>
                  }
                />

                {/* <Route path="/users" element={<Users />} /> */}
                <Route
                  path="/users"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_ADMIN]}>
                      <Users />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/users/create"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_ADMIN]}>
                      <CreateUserPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/users/:id/edit"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_ADMIN]}>
                      <EditUserPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/students"
                  element={
                    <ProtectedRoute
                      roles={[
                        ERole.ROLE_ADMIN,
                        ERole.ROLE_TEACHER,
                        ERole.ROLE_RECEPTIONIST,
                      ]}
                    >
                      <Students />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/students/create"
                  element={
                    <ProtectedRoute
                      roles={[ERole.ROLE_ADMIN, ERole.ROLE_RECEPTIONIST]}
                    >
                      <CreateStudentPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/students/:id/edit"
                  element={
                    <ProtectedRoute
                      roles={[ERole.ROLE_ADMIN, ERole.ROLE_RECEPTIONIST]}
                    >
                      <EditStudentPage />
                    </ProtectedRoute>
                  }
                />
                {/* <Route
                  path="/students/enroll"
                  element={<StudentEnrollPage />}
                /> */}

                <Route
                  path="/enrollments"
                  element={
                    <ProtectedRoute
                      roles={[
                        ERole.ROLE_ADMIN,
                        ERole.ROLE_TEACHER,
                        ERole.ROLE_RECEPTIONIST,
                      ]}
                    >
                      <Enrollments />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/courses"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_STUDENT]}>
                      <StudentCourses />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/enrollments"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_STUDENT]}>
                      <StudentEnrollments />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/examResults"
                  element={
                    <ProtectedRoute
                      roles={[ERole.ROLE_STUDENT, ERole.ROLE_ADMIN]}
                    >
                      <ExamResults />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/enrollments/create"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_ADMIN, ERole.ROLE_RECEPTIONIST]}>
                      <CreateEnrollPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/enrollments/:id/view"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_ADMIN]}>
                      <ViewEnrollmentPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/guardians"
                  element={
                    <ProtectedRoute
                      roles={[ERole.ROLE_ADMIN, ERole.ROLE_RECEPTIONIST]}
                    >
                      <Guardians />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/guardians/:id/edit"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_ADMIN]}>
                      <EditGuardianPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/payments"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_ADMIN]}>
                      <Payments />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/payments/create"
                  element={
                    <ProtectedRoute
                      roles={[ERole.ROLE_ADMIN, ERole.ROLE_RECEPTIONIST]}
                    >
                      <CreatePaymentPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/payments/:id/view"
                  element={
                    <ProtectedRoute
                      roles={[ERole.ROLE_ADMIN, ERole.ROLE_RECEPTIONIST]}
                    >
                      <PaymentViewPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/halls"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_ADMIN]}>
                      <Halls />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/halls/create"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_ADMIN]}>
                      <CreateHallPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/halls/:id/edit"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_ADMIN]}>
                      <EditHallPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/events"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_ADMIN, ERole.ROLE_RECEPTIONIST, ERole.ROLE_TEACHER]}>
                      <Events />
                    </ProtectedRoute>
                  }
                />
                <Route path="/events-calendar" element={<EventsCalendar />} />
                <Route path="/events/create" element={<CreateEventPage />} />
                <Route path="/events/:id/edit" element={<EditEventPage />} />
                <Route path="/student/calendar" element={<StudentCalendar />} />

                <Route
                  path="/exams"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_ADMIN]}>
                      <Exams />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/exams/create"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_ADMIN]}>
                      <CreateExamPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/exams/:id/edit"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_ADMIN]}>
                      <EditExamPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/exams/:id/results"
                  element={
                    <ProtectedRoute
                      roles={[ERole.ROLE_ADMIN, ERole.ROLE_TEACHER]}
                    >
                      <ExamResultsPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/reports/teacher-report"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_ADMIN]}>
                      <TeacherReport />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/reports/employee-report"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_ADMIN]}>
                      <EmployeeReport />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/reports/student-report"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_ADMIN]}>
                      <StudentReport />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/reports/institute-income-report"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_ADMIN]}>
                      <InstituteIncomeReport />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/reports/monthly-active-student-report"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_ADMIN]}>
                      <MonthlyActiveStudentReport />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/reports/student-registration-increment-report"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_ADMIN]}>
                      <StudentRegistrationIncrementReport />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/employee/payments"
                  element={
                    <ProtectedRoute
                      roles={[ERole.ROLE_ADMIN, ERole.ROLE_ADMIN]}
                    >
                      <EmployeePayments />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employee/payments/create"
                  element={
                    <ProtectedRoute
                      roles={[ERole.ROLE_ADMIN, ERole.ROLE_ADMIN]}
                    >
                      <CreateEmployeePaymentPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/teachers/:id/detail"
                  element={<TeacherDetailPage />}
                />
              </Route>

              {/* Auth Layout */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />

              {/* Fallback Route */}
              <Route path="*" element={<NotFound />} />
              <Route path="/notFound" element={<NotFound />} />
            </Routes>
          </Router>
          <ToastContainer autoClose={2000} theme="colored" />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
