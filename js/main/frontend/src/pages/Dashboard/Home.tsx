import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import { useStudentsQuery } from "@data/student";
import Loader from "@components/ui/loader/loader";
import ErrorMessage from "@components/ui/error-message";
import { useCoursesQuery } from "@data/course";
import CourseStudentChart from "@components/ecommerce/CourseStudentChart";
import StudentInGrades from "@components/ecommerce/StudentInGrades";
import { useStudentCountPerGradeQuery } from "@data/subject";
import { useStudentCountPerCourseQuery } from "@data/enrollment";
import Widgets from "@components/ecommerce/Widgets";

export default function Home() {
  const { paginatorInfo, loading, error } = useStudentsQuery({});
  const { paginatorInfo: coursePaginatorInfo } = useCoursesQuery({});
  const { studentsPerGrades, loading: studentsPerGradesLoading } =
    useStudentCountPerGradeQuery();
  const { studentsPerCourses, loading: studenPerCoursesLoading } =
    useStudentCountPerCourseQuery();

  if (loading || studenPerCoursesLoading || studentsPerGradesLoading)
    return <Loader text="Loading..." />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <Widgets />
        </div>

        <div className="col-span-12 xl:col-span-5">
          {studentsPerCourses && (
            <CourseStudentChart studentsPerCourses={studentsPerCourses} />
          )}
        </div>

        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics
            totalStudents={paginatorInfo?.total}
            totalCourses={coursePaginatorInfo?.total}
          />
          {/* {studentsPerGrades && (
            <StudentInGrades studentsPerGrades={studentsPerGrades} />
          )} */}
        </div>

        <div className="col-span-12 xl:col-span-5">
          {studentsPerGrades && (
            <StudentInGrades studentsPerGrades={studentsPerGrades} />
          )}
        </div>

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
