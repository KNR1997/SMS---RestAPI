import { Controller, useForm } from "react-hook-form";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../ui/button/Button";
import { EGrade, ERole, Student } from "../../types";
import {
  useCreateStudentMutation,
  useUpdateStudentMutation,
} from "../../data/student";
import SelectInput from "../form/select-input";
import { gradeOptions } from "../../constants/role";
import { useNavigate } from "react-router";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  grade: EGrade;
  guardianName: string;
  contactNumber: string;
  username: string;
  password: string;
  dateOfBirth: Date;
};

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  grade: "",
  guardianName: "",
  contactNumber: "",
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  firstName: yup.string().required("FirstName is required"),
  lastName: yup.string().required("LastName is required"),
  email: yup.string().required("Email is required"),
  grade: yup.string().required("Grade is required"),
  guardianName: yup.string().required("Guardian Name is required"),
  contactNumber: yup.string().required("Contact Number is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  dateOfBirth: yup.string().required("Birthday is required"),
});

interface Props {
  initialValues?: Student;
}

export default function CreateOrUpdateStudentForm({ initialValues }: Props) {
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    // @ts-ignore
    defaultValues: initialValues
      ? {
          ...initialValues,
        }
      : defaultValues,
    //@ts-ignore
    resolver: yupResolver(validationSchema),
  });

  const { mutate: createStudent, isLoading: creating } =
    useCreateStudentMutation();
  const { mutate: updateStudent, isLoading: updating } =
    useUpdateStudentMutation();

  const onSubmit = async (values: FormValues) => {
    const input = {
      userDetails: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        username: values.username,
        role: ERole.ROLE_STUDENT,
        password: values.password,
      },
      dateOfBirth: values.dateOfBirth,
      grade: values.grade,
      guardianName: values.guardianName,
      contactNumber: values.contactNumber,
    };

    if (!initialValues) {
      createStudent(input);
    } else {
      updateStudent({ id: initialValues.id, ...input });
    }
  };

  const handleCreateAndEnroll = () => {
    navigate("students/enroll");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div>
          <Label>
            First Name <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            placeholder="John"
            {...register("firstName")}
            errorMessage={errors.firstName?.message!}
          />
        </div>
        <div>
          <Label>
            Last Name <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            placeholder="Doe"
            {...register("lastName")}
            errorMessage={errors.lastName?.message!}
          />
        </div>
        <div>
          <Label>
            Date of Birth <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            type="date"
            {...register("dateOfBirth")}
            errorMessage={errors.dateOfBirth?.message!}
          />
        </div>
        <div>
          <Label>
            Grade <span className="text-error-500">*</span>
          </Label>
          <Controller
            name="grade"
            control={control}
            rules={{ required: "Grade is required" }}
            render={({ field }) => (
              <SelectInput
                options={gradeOptions}
                placeholder="Select Option"
                value={field.value}
                onChange={field.onChange}
                className="dark:bg-dark-900"
              />
            )}
          />
          {errors.grade && (
            <p className="text-error-500 text-sm mt-1">
              {errors.grade.message}
            </p>
          )}
        </div>
        <div>
          <Label>
            Email <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            placeholder="user@example.com"
            {...register("email")}
            errorMessage={errors.email?.message!}
          />
        </div>
        <div>
          <Label>
            Guardian Name <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            // placeholder="user@example.com"
            {...register("guardianName")}
            errorMessage={errors.guardianName?.message!}
          />
        </div>
        <div>
          <Label>
            Contact Number <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            // placeholder="user@example.com"
            {...register("contactNumber")}
            errorMessage={errors.contactNumber?.message!}
          />
        </div>
        <div>
          <Label>
            Username <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            placeholder="user123"
            {...register("username")}
            errorMessage={errors.username?.message!}
          />
        </div>
        <div>
          <Label>
            Password <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            type="password"
            // placeholder="user"
            {...register("password")}
            errorMessage={errors.password?.message!}
          />
        </div>
        <div className="flex gap-5">
          <Button disabled={creating || updating} size="sm">
            {initialValues ? "Update" : "Create"} Student
          </Button>
          {!initialValues && (
            <Button
              onClick={handleCreateAndEnroll}
              disabled={creating || updating}
              size="sm"
            >
              Create and Enroll
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
