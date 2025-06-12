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
import Card from "../common/card";
import { useEffect, useState } from "react";
import { useGuardianByIDNumberQuery } from "../../data/guardian";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  gradeType: EGrade;
  username: string;
  password: string;
  dateOfBirth: Date;

  guardianId: number;
  guardianFirstName: string;
  guardianLastName: string;
  guardianEmail: string;
  guardianIdNumber: string;
  guardianContactNumber: string;
};

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  gradeType: "",
  username: "",
  password: "",

  guardianFirstName: "",
  guardianLastName: "",
  guardianIdNumber: "",
  guardianContactNumber: "",
};

const validationSchema = yup.object().shape({
  firstName: yup.string().required("FirstName is required"),
  lastName: yup.string().required("LastName is required"),
  email: yup.string().required("Email is required"),
  gradeType: yup.string().required("Grade is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  dateOfBirth: yup.string().required("Birthday is required"),

  guardianFirstName: yup.string().required("Guardian First Name is required"),
  guardianLastName: yup.string().required("Guardian Last Name is required"),
  guardianIdNumber: yup.string().required("Guardian ID number is required"),
  guardianContactNumber: yup.string().required("Contact Number is required"),
});

interface Props {
  initialValues?: Student;
}

export default function CreateOrUpdateStudentForm({ initialValues }: Props) {
  const navigate = useNavigate();
  const [guardianSearchInput, setGuardianSearchInput] = useState("");
  const [guardianFound, setGuardianFound] = useState<boolean>(false);
  const [triggerSearch, setTriggerSearch] = useState(false);

  console.log('guardianSearchInput: ', guardianSearchInput)

  // This hook must be declared at the top level of the component
  const { guardian } = useGuardianByIDNumberQuery({ id: guardianSearchInput });

  // Use useEffect to update form fields when guardian is found
  useEffect(() => {
    if (guardian) {
      setValue("guardianFirstName", guardian.firstName);
      setValue("guardianLastName", guardian.lastName);
      setValue("guardianContactNumber", guardian.contactNumber);
      setValue("guardianEmail", guardian.email);
      setValue("guardianIdNumber", guardian.nationalIdentityNumber);
      setValue("guardianId", guardian.id);
      setGuardianFound(true);
    } else {
      // Search completed but guardian not found
      setGuardianFound(false);
      // toast.error("Guardian not found. Please fill the details manually.");
    }
  }, [guardian, triggerSearch]);

  const {
    control,
    register,
    handleSubmit,
    setValue,
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
      dateOfBirth: values.dateOfBirth,
      gradeType: values.gradeType,
      userDetails: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        username: values.username,
        role: ERole.ROLE_STUDENT,
        password: values.password,
      },
      guardianDetails: {
        id: values.guardianId,
        firstName: values.guardianFirstName,
        lastName: values.guardianLastName,
        email: values.guardianEmail,
        nationalIdentityNumber: values.guardianIdNumber,
        contactNumber: values.guardianContactNumber,
      },
    };

    if (!initialValues) {
      createStudent(input);
    } else {
      updateStudent({ id: initialValues.id, ...input });
    }
  };

  const handleCreateAndEnroll = handleSubmit(async (data) => {
    try {
      console.log('handle create and enroll')
      // You can do your actual submit logic here
      await onSubmit(data); // if you already have an `onSubmit` function defined

      // Navigate after successful submission
      navigate("/students/enroll");
    } catch (error) {
      console.error("Submission failed", error);
      // Handle error (e.g., show toast)
    }
  });

  const handleSearchGuardian = () => {
    setTriggerSearch(true); // This will enable the query
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <Card>
          <h2
            className="text-xl text-gray-800 dark:text-white/90 mb-4"
            x-text="pageName"
          >
            Student Details
          </h2>
          <div className="grid grid-cols-2 gap-5">
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
                name="gradeType"
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
              {errors.gradeType && (
                <p className="text-error-500 text-sm mt-1">
                  {errors.gradeType.message}
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
          </div>
        </Card>

        {/* Guardian Details */}
        <Card>
          <div className="flex justify-between mb-5">
            <h2
              className="text-xl text-gray-800 dark:text-white/90 mb-4"
              x-text="pageName"
            >
              Guardian Details
            </h2>
            <div className="flex gap-5">
              {/* <Label>Search Guardian by ID Number</Label> */}
              <Input
                placeholder="Search Guardian by ID"
                value={guardianSearchInput}
                onChange={(e) => setGuardianSearchInput(e.target.value)}
              />
              <Button onClick={handleSearchGuardian}>Search</Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label>
                First Name <span className="text-error-500">*</span>{" "}
              </Label>
              <Input
                // placeholder="user@example.com"
                {...register("guardianFirstName")}
                errorMessage={errors.guardianFirstName?.message!}
              />
            </div>
            <div>
              <Label>
                Last Name <span className="text-error-500">*</span>{" "}
              </Label>
              <Input
                // placeholder="user@example.com"
                {...register("guardianLastName")}
                errorMessage={errors.guardianLastName?.message!}
              />
            </div>
            <div>
              <Label>
                Email <span className="text-error-500">*</span>{" "}
              </Label>
              <Input
                // placeholder="user@example.com"
                {...register("guardianEmail")}
                errorMessage={errors.guardianEmail?.message!}
              />
            </div>
            <div>
              <Label>
                ID Number <span className="text-error-500">*</span>{" "}
              </Label>
              <Input
                // placeholder="user@example.com"
                {...register("guardianIdNumber")}
                errorMessage={errors.guardianIdNumber?.message!}
              />
            </div>
            <div>
              <Label>
                Contact Number <span className="text-error-500">*</span>{" "}
              </Label>
              <Input
                // placeholder="user@example.com"
                {...register("guardianContactNumber")}
                errorMessage={errors.guardianContactNumber?.message!}
              />
            </div>
            <Input
              className="hidden"
              {...register("guardianId")}
              errorMessage={errors.guardianId?.message!}
            />
          </div>
        </Card>

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
