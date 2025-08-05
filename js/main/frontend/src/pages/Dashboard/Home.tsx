import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import PageMeta from "../../components/common/PageMeta";
import { useStudentsQuery } from "@data/student";
import Loader from "@components/ui/loader/loader";
import ErrorMessage from "@components/ui/error-message";
import { useCoursesQuery } from "@data/course";
import CourseStudentChart from "@components/ecommerce/CourseStudentChart";
import StudentInGrades from "@components/ecommerce/StudentInGrades";
import { useStudentCountPerGradeQuery } from "@data/subject";
import { useStudentCountPerCourseQuery } from "@data/enrollment";
import AdminOnly from "@components/admin/AdminOnly";
import { useUsersQuery } from "@data/user";
import { ERole, StudentsPerGrade } from "@types";
import { gradeOptions } from "../../constants/role";

export default function Home() {
  const {
    paginatorInfo: studentPaginatorInfo,
    loading,
    error,
  } = useStudentsQuery({
    is_active: true,
  });
  const { paginatorInfo: coursePaginatorInfo, loading: coursesLoading } =
    useCoursesQuery({
      is_active: true,
    });
  const { studentsPerGrades, loading: studentsPerGradesLoading } =
    useStudentCountPerGradeQuery();
  const { studentsPerCourses, loading: studenPerCoursesLoading } =
    useStudentCountPerCourseQuery();
  const { paginatorInfo: teacherPaginatorInfo, loading: teachersLoading } =
    useUsersQuery({
      role: ERole.ROLE_TEACHER,
      is_active: true,
    });
  const { paginatorInfo: userPaginatorInfo, loading: usersLoading } =
    useUsersQuery({
      is_active: true,
    });

  if (
    loading ||
    studenPerCoursesLoading ||
    studentsPerGradesLoading ||
    coursesLoading ||
    teachersLoading ||
    usersLoading
  )
    return <Loader text="Loading..." />;
  if (error) return <ErrorMessage message={error.message} />;

  function calculateEmployeeCount() {
    if (!userPaginatorInfo || !studentPaginatorInfo || !teacherPaginatorInfo)
      return;
    return (
      userPaginatorInfo?.total -
      studentPaginatorInfo?.total -
      teacherPaginatorInfo?.total
    );
  }

  function orderStudentsPerGraders(
    studentsPerGrades: StudentsPerGrade[]
  ): StudentsPerGrade[] {
    return studentsPerGrades.sort((a, b) => {
      const levelA =
        gradeOptions.find((opt) => opt.value === a.grade)?.level ?? Infinity;
      const levelB =
        gradeOptions.find((opt) => opt.value === b.grade)?.level ?? Infinity;
      return levelA - levelB;
    });
  }

  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* <AdminOnly>
          <div className="col-span-12 space-y-6 xl:col-span-7">
            <Widgets />
          </div>
        </AdminOnly> */}

        <AdminOnly>
          <div className="col-span-12 xl:col-span-5">
            {studentsPerCourses && (
              <CourseStudentChart studentsPerCourses={studentsPerCourses} />
            )}
          </div>
        </AdminOnly>

        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics
            totalStudents={studentPaginatorInfo?.total}
            totalCourses={coursePaginatorInfo?.total}
            totalTeachers={teacherPaginatorInfo?.total}
            totalEmployees={calculateEmployeeCount()}
          />
          {/* {studentsPerGrades && (
            <StudentInGrades studentsPerGrades={studentsPerGrades} />
          )} */}
        </div>

        <AdminOnly>
          <div className="col-span-12 xl:col-span-">
            {studentsPerGrades && (
              <StudentInGrades
                studentsPerGrades={orderStudentsPerGraders(studentsPerGrades)}
              />
            )}
          </div>
        </AdminOnly>

        {/* <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div> */}

        {/* <div className="col-span-12">
          <StatisticsChart />
        </div> */}

        {/* <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div> */}

        {/* <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div> */}
      </div>
          
    </>
  );
}
