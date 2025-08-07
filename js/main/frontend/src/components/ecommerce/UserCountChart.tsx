import { UserCount } from "@types";
import Chart from "react-apexcharts";

interface IProps {
  userPerCount: UserCount[];
}

// export default function UserCountChart({ userPerCount }: IProps) {
//   const series = userPerCount?.map((data) => data.userCount);

export default function UserCountChart({ userPerCount }: IProps) {
  //  Filter out ROLE_STUDENT dynamically
  const filteredUsers = userPerCount.filter(
    (data) => data.userName !== "ROLE_STUDENT"
  );

  const series = filteredUsers.map((data) => data.userCount);

  const options = {
    chart: {
      type: "pie",
    },
    labels: filteredUsers?.map((data) =>
      data?.userName?.length > 20 ? data.userName.slice(0, 20) : data.userName
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
              Employee Count
            </h3>
            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
              Employee types count
            </p>
          </div>
        </div>
        <div className="relative ">
          <div className="max-w-md mx-auto" id="chartDarkStyle">
            <Chart options={options} series={series} type="pie" width="90%" />
          </div>
        </div>
      </div>
    </div>
  );
}
