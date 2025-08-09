import { useForm } from "react-hook-form";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../ui/button/Button";
import {
  EGender,
  EGrade,
  ERole,
  RelationshipType,
  StudentPageData,
} from "@types";
import {
  useCreateStudentMutation,
  useUpdateStudentMutation,
} from "@data/student";
import SelectInput from "../ui/select-input";
import {
  genderOptions,
  gradeOptions,
  relationshipOptions,
} from "../../constants/role";
import Card from "../common/card";
import { useEffect, useState } from "react";
import { useGuardianByIDNumberQuery } from "@data/guardian";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  gradeType: { label: string; value: EGrade };
  genderType: { label: string; value: EGender };
  address: string;
  username: string;
  password: string;
  dateOfBirth: Date;

  guardianId: number;
  guardianFirstName: string;
  guardianLastName: string;
  guardianEmail: string;
  guardianIdNumber: string;
  guardianContactNumber: number;
  guardianRelatioship: { label: string; value: RelationshipType };
};

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  // gradeType: "",
  // genderType: "",
  address: "",
  username: "",
  password: "",

  guardianFirstName: "",
  guardianLastName: "",
  guardianIdNumber: "",
  guardianContactNumber: "",
  // guardianRelatioship: "",
};

const validationSchema = yup.object().shape({
  firstName: yup.string().required("FirstName is required"),
  lastName: yup.string().required("LastName is required"),
  gradeType: yup.object().required("Grade is required"),
  genderType: yup.object().required("Gender is required"),
  address: yup.string().required("Address is required"),

  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  dateOfBirth: yup.string().required("Birthday is required"),

  guardianFirstName: yup.string().required("Guardian First Name is required"),
  guardianLastName: yup.string().required("Guardian Last Name is required"),
  guardianEmail: yup.string().notRequired().email("Invalid email format"),
  guardianIdNumber: yup
    .string()
    .required("Guardian ID number is required")
    .matches(
      /^(\d{9}[vV]|\d{12})$/,
      "Guardian ID number must be in the format 123456789V or 200012345678"
    ),
  guardianContactNumber: yup
    .string()
    .required("Contact Number is required")
    .matches(/^\d{10}$/, "Contact Number must be exactly 10 digits"),
  guardianRelatioship: yup
    .object()
    .required("Guardian Relationship is required"),
});

interface Props {
  initialValues?: StudentPageData;
}

export default function CreateOrUpdateStudentForm({ initialValues }: Props) {
  const [guardianSearchInput, setGuardianSearchInput] = useState("");
  const [guardianFound, setGuardianFound] = useState<boolean>(false);
  const [triggerSearch, setTriggerSearch] = useState(false);

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
          genderType: genderOptions.find(
            (genderOption) => genderOption.value == initialValues.genderType
          ),
          gradeType: gradeOptions.find(
            (gradeOption) => gradeOption.value == initialValues.gradeType
          ),
          guardianId: initialValues.guardianPageData.id ?? null,
          guardianFirstName: initialValues.guardianPageData.firstName,
          guardianLastName: initialValues.guardianPageData.lastName,
          guardianEmail: initialValues.guardianPageData.email,
          guardianIdNumber:
            initialValues.guardianPageData.nationalIdentityNumber,
          guardianContactNumber: initialValues.guardianPageData.contactNumber,
          guardianRelatioship: relationshipOptions.find(
            (relationshipOption) =>
              relationshipOption.value ==
              initialValues.guardianPageData.relationship
          ),
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
      gradeType: values.gradeType.value,
      userDetails: {
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        role: ERole.ROLE_STUDENT,
        password: values.password,
        genderType: values.genderType.value,
        address: values.address,
      },
      guardianDetails: {
        id: values.guardianId,
        firstName: values.guardianFirstName,
        lastName: values.guardianLastName,
        email: values.guardianEmail,
        nationalIdentityNumber: values.guardianIdNumber,
        contactNumber: values.guardianContactNumber,
        relationship: values.guardianRelatioship.value,
      },
    };

    if (!initialValues) {
      createStudent(input);
    } else {
      updateStudent({ id: initialValues.id, ...input });
    }
  };

  const handleSearchGuardian = () => {
    setTriggerSearch(true); // This will enable the query
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        {/* Student Details  */}
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
                placeholder="e.g.- Nimal"
                {...register("firstName")}
                errorMessage={errors.firstName?.message!}
              />
            </div>
            <div>
              <Label>
                Last Name <span className="text-error-500">*</span>{" "}
              </Label>
              <Input
                placeholder="e.g.- Perera"
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
              <SelectInput
                name="gradeType"
                control={control}
                options={gradeOptions}
                isClearable={true}
              />
              {errors.gradeType && (
                <p className="text-error-500 text-sm mt-1">
                  {errors.gradeType.message}
                </p>
              )}
            </div>
            <div>
              <Label>
                Gender <span className="text-error-500">*</span>
              </Label>
              <SelectInput
                name="genderType"
                control={control}
                options={genderOptions}
                isClearable={true}
              />
              {errors.genderType && (
                <p className="text-error-500 text-sm mt-1">
                  {errors.genderType.message}
                </p>
              )}
            </div>
            <div>
              <Label>
                Address <span className="text-error-500">*</span>{" "}
              </Label>
              <Input
                placeholder="e.g.- No 10, Hospital Road, Rajagiriya"
                {...register("address")}
                errorMessage={errors.address?.message!}
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
              {/* <Label>Search Guardian with NIC Number</Label> */}
              <Input
                placeholder="Search Guardian with NIC"
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
                placeholder="e.g.- Kamal"
                {...register("guardianFirstName")}
                errorMessage={errors.guardianFirstName?.message!}
              />
            </div>
            <div>
              <Label>
                Last Name <span className="text-error-500">*</span>{" "}
              </Label>
              <Input
                placeholder="e.g.- Perera"
                {...register("guardianLastName")}
                errorMessage={errors.guardianLastName?.message!}
              />
            </div>
            <div>
              <Label>
                Email <span className="text-error-500"></span>{" "}
              </Label>
              <Input
                placeholder="user@example.com"
                {...register("guardianEmail")}
                errorMessage={errors.guardianEmail?.message!}
              />
            </div>
            <div>
              <Label>
                NIC Number <span className="text-error-500">*</span>{" "}
              </Label>
              <Input
                placeholder="e.g.- 123456789V or 200012345678"
                {...register("guardianIdNumber")}
                errorMessage={errors.guardianIdNumber?.message!}
              />
            </div>
            <div>
              <Label>
                Contact Number <span className="text-error-500">*</span>{" "}
              </Label>
              <Input
                placeholder="0771234567"
                {...register("guardianContactNumber")}
                errorMessage={errors.guardianContactNumber?.message!}
              />
            </div>
            <div>
              <Label>
                Relationship <span className="text-error-500">*</span>
              </Label>
              <SelectInput
                name="guardianRelatioship"
                control={control}
                options={relationshipOptions}
                isClearable={true}
              />
              {errors.guardianRelatioship && (
                <p className="text-error-500 text-sm mt-1">
                  {errors.guardianRelatioship.message}
                </p>
              )}
            </div>
            <Input
              className="hidden"
              {...register("guardianId")}
              errorMessage={errors.guardianId?.message!}
            />
          </div>
        </Card>

        {/* Login Details  */}
        <Card>
          <h2
            className="text-xl text-gray-800 dark:text-white/90 mb-4"
            x-text="pageName"
          >
            Login Details
          </h2>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label>
                Username <span className="text-error-500">*</span>{" "}
              </Label>
              <Input
                //placeholder=" user123"
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
                //placeholder="user"
                {...register("password")}
                errorMessage={errors.password?.message!}
              />
            </div>
          </div>
        </Card>
        <div className="flex gap-5 justify-end">
          <Button disabled={creating || updating} size="sm">
            {initialValues ? "Update" : "Create"} Student
          </Button>
          {!initialValues && (
            <Button disabled={creating || updating} size="sm">
              Create and Enroll
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
