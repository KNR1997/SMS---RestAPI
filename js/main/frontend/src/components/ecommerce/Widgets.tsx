import { Navigate, useNavigate } from "react-router";
import { CalenderIcon, BoxCubeIcon, BoxIconLine, GroupIcon } from "../../icons";

interface IProps {}

export default function Widgets({}: IProps) {
  const navigate = useNavigate();
  // function handleAddStudent() {
  //   console.log("Navigate teo student related page");
  //   navigate("/students/create");
  // }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* Add Student Widget */}
      <div className="rounded-2xl border border-gray-200 bg-yellow-100 p-5 transition-all duration-200 hover:shadow-lg hover:bg-yellow-200 dark:border-gray-800 dark:bg-white/[0.05]">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center w-12 h-12 bg-yellow-200 rounded-xl dark:bg-yellow-800">
            <GroupIcon className="text-yellow-800 size-6 dark:text-white/90" />
          </div>
          <button
            onClick={() => {
              navigate("/students/create");
            }}
            className="text-sm text-yellow-700 dark:text-yellow-300 hover:underline"
          >
            Add Student
          </button>
        </div>
      </div>

      {/* Add Student Widget */}
      <div className="rounded-2xl border border-gray-200 bg-orange-100 p-5 transition-all duration-200 hover:shadow-lg hover:bg-orange-200 dark:border-gray-800 dark:bg-white/[0.05]">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center w-12 h-12 bg-orange-200 rounded-xl dark:bg-orange-800">
            <GroupIcon className="text-orange-800 size-6 dark:text-white/90" />
          </div>
          <button
            onClick={() => {
              navigate("/users/create");
            }}
            className="text-sm text-orange-700 dark:text-orange-300 hover:underline"
          >
            Add Employee
          </button>
        </div>
      </div>

      {/* Add Subject Widget */}
      <div className="rounded-2xl border border-gray-200 bg-blue-100 p-5 transition-all duration-200 hover:shadow-lg hover:bg-blue-200 dark:border-gray-800 dark:bg-white/[0.05]">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-200 rounded-xl dark:bg-blue-800">
            <BoxCubeIcon className="text-blue-800 size-6 dark:text-white/90" />
          </div>
          <button
            onClick={() => {
              navigate("/enrollments/create");
            }}
            className="text-sm text-blue-700 dark:text-blue-300 hover:underline"
          >
            Add Enrollment
          </button>
        </div>
      </div>

      {/* Add Event Widget */}
      <div className="rounded-2xl border border-gray-200 bg-red-100 p-5 transition-all duration-200 hover:shadow-lg hover:bg-red-200 dark:border-gray-800 dark:bg-white/[0.05]">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center w-12 h-12 bg-red-200 rounded-xl dark:bg-red-800">
            <CalenderIcon className="text-red-800 size-6 dark:text-white/90" />
          </div>
          <button
            onClick={() => {
              navigate("/payments/create");
            }}
            className="text-sm text-red-700 dark:text-purple-300 hover:underline"
          >
            Add Payment
          </button>
        </div>
      </div>

      {/* Add Event Widget */}
      <div className="rounded-2xl border border-gray-200 bg-purple-100 p-5 transition-all duration-200 hover:shadow-lg hover:bg-purple-200 dark:border-gray-800 dark:bg-white/[0.05]">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-200 rounded-xl dark:bg-purple-800">
            <CalenderIcon className="text-purple-800 size-6 dark:text-white/90" />
          </div>
          <button
            onClick={() => {
              navigate("/events/create");
            }}
            className="text-sm text-purple-700 dark:text-purple-300 hover:underline"
          >
            Add Event
          </button>
        </div>
      </div>

      {/* Add Course Widget */}
      <div className="rounded-2xl border border-gray-200 bg-green-100 p-5 transition-all duration-200 hover:shadow-lg hover:bg-green-200 dark:border-gray-800 dark:bg-white/[0.05]">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center w-12 h-12 bg-green-200 rounded-xl dark:bg-green-800">
            <BoxIconLine className="text-green-800 size-6 dark:text-white/90" />
          </div>
          <button
            onClick={() => {
              navigate("/courses/create");
            }}
            className="text-sm text-green-700 dark:text-green-300 hover:underline"
          >
            Add Course
          </button>
        </div>
      </div>
    </div>
  );
}
