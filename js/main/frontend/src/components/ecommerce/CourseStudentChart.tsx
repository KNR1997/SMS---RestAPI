import { StudentsPerCouse } from "@types";
import Chart from "react-apexcharts";

interface IProps {
  studentsPerCourses: StudentsPerCouse[]
}

export default function CourseStudentChart({studentsPerCourses}: IProps) {

  const series = studentsPerCourses?.map((data) => data.studentCount);

  const options = {
    chart: {
      type: "pie",
    },
    labels: studentsPerCourses?.map((data) =>
      data?.courseName?.length > 20
        ? data.courseName.slice(0, 20)
        : data.courseName
    ), // Corresponding labels
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Top Courses
            </h3>
            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
              Most students in courses
            </p>
          </div>
        </div>
        <div className="relative ">
          <div className="max-w-md mx-auto" id="chartDarkStyle">
            <Chart options={options} series={series} type="pie" width="100%" />
          </div>
        </div>
      </div>
    </div>
  );
}
