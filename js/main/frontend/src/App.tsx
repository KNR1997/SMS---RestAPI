import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Calendar from "./pages/Calendar";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import Invoices from "./pages/Invoices";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import Users from "./pages/Users";
import CreateUserPage from "./pages/Users/create";
import EditUserPage from "./pages/Users/edit";
import EditInvoicePage from "./pages/Invoices/edit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import Requests from "./pages/Requests";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ERole } from "./types";
import EditRequestPage from "./pages/Requests/edit";
import Logs from "./pages/InvoiceStatusAudits";
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
                    <ProtectedRoute roles={[ERole.ROLE_ADMIN]}>
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
                  element={<CreateSubjectPage />}
                />
                <Route
                  path="/subjects/:slug/edit"
                  element={<EditSubjectPage />}
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
                <Route path="/users/create" element={<CreateUserPage />} />
                <Route path="/users/:id/edit" element={<EditUserPage />} />

                <Route
                  path="/students"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_ADMIN]}>
                      <Students />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/students/create"
                  element={<CreateStudentPage />}
                />
                <Route
                  path="/students/:id/edit"
                  element={<EditStudentPage />}
                />
                {/* <Route
                  path="/students/enroll"
                  element={<StudentEnrollPage />}
                /> */}

                <Route
                  path="/enrollments"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_ADMIN]}>
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
                  path="/enrollments/create"
                  element={<CreateEnrollPage />}
                />
                <Route
                  path="/enrollments/:id/view"
                  element={<ViewEnrollmentPage />}
                />

                <Route
                  path="/guardians"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_ADMIN]}>
                      <Guardians />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/guardians/:id/edit"
                  element={<EditGuardianPage />}
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
                  element={<CreatePaymentPage />}
                />

                <Route
                  path="/halls"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_ADMIN]}>
                      <Halls />
                    </ProtectedRoute>
                  }
                />
                <Route path="/halls/create" element={<CreateHallPage />} />
                <Route path="/halls/:id/edit" element={<EditHallPage />} />

                <Route
                  path="/events"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_ADMIN]}>
                      <Events />
                    </ProtectedRoute>
                  }
                />
                <Route path="/events-calendar" element={<EventsCalendar />} />
                <Route path="/events/create" element={<CreateEventPage />} />
                <Route path="/events/:id/edit" element={<EditEventPage />} />

                <Route
                  path="/exams"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_ADMIN]}>
                      <Exams />
                    </ProtectedRoute>
                  }
                />
                <Route path="/exams/create" element={<CreateExamPage />} />
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
