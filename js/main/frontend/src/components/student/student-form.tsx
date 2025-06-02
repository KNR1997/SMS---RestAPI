import { useForm } from "react-hook-form";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../ui/button/Button";
import { ERole, User } from "../../types";
import {
  useCreateStudentMutation,
  useUpdateStudentMutation,
} from "../../data/student";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  dateOfBirth: Date;
};

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  firstName: yup.string().required("FirstName is required"),
  lastName: yup.string().required("LastName is required"),
  email: yup.string().required("Email is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  dateOfBirth: yup.string().required("Birthday is required"),
});

interface Props {
  initialValues?: User;
}

export default function CreateOrUpdateStudentForm({ initialValues }: Props) {
  const {
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
      studentId: "ST002",
      dateOfBirth: "2025-06-02T19:21:09.818Z",
    };

    if (!initialValues) {
      createStudent(input);
    } else {
      updateStudent({ id: initialValues.id, ...input });
    }
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
        <Button disabled={creating || updating} size="sm">
          {initialValues ? "Update" : "Create"} Student
        </Button>
      </div>
    </form>
  );
}
