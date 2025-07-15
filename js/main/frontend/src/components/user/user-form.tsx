import { Controller, useForm } from "react-hook-form";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../ui/button/Button";
import SelectInput from "../form/select-input";
import { ERole, User } from "../../types";
import { roleOptions } from "../../constants/role";
import { useCreateUserMutation, useUpdateUserMutation } from "@data/user";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  nic: string;
  phoneNumber: string;
  username: string;
  role: ERole;
  password: string;
};

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  nic: "",
  username: "",
  phoneNumber: "",
  role: "",
  password: "",
};

const validationSchema = yup.object().shape({
  firstName: yup.string().required("FirstName is required"),
  lastName: yup.string().required("LastName is required"),
  email: yup.string().required("Email is required"),
  nic: yup
    .string()
    .required("NIC is required")
    .matches(
      /^(\d{9}[vV]|\d{12})$/,
      "NIC must be in the format 123456789V or 200012345678"
    ),
  phoneNumber: yup
    .string()
    .required("Contact Number is required")
    .matches(/^\d{10}$/, "Contact Number must be exactly 10 digits"),
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

interface Props {
  initialValues?: User;
}

export default function CreateOrUpdateUserForm({ initialValues }: Props) {
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
          role: roleOptions.find(
            (role) => role.value === ERole.ROLE_RECEPTIONIST
          ),
        }
      : defaultValues,
    //@ts-ignore
    resolver: yupResolver(validationSchema),
  });

  // console.log('initialValues: ', initialValues)

  const { mutate: createUser, isLoading: creating } = useCreateUserMutation();
  const { mutate: updateUser, isLoading: updating } = useUpdateUserMutation();

  const onSubmit = async (values: FormValues) => {
    const input = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      username: values.username,
      role: values.role,
      password: values.password,
      nic: values.nic,
      phoneNumber: values.phoneNumber,
    };

    if (!initialValues) {
      createUser(input);
    } else {
      updateUser({ id: initialValues.id, ...input });
    }
  };

  const filterRoleOptions = () => {
    return roleOptions.filter(
      (role) =>
        role.value !== ERole.ROLE_ADMIN && role.value !== ERole.ROLE_STUDENT
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
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
            Contact Number <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            placeholder="e.g.- 0771234567"
            {...register("phoneNumber")}
            errorMessage={errors.phoneNumber?.message!}
          />
        </div>
        <div>
          <Label>
            NIC <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            placeholder="e.g.- 123456789V or 200012345678"
            {...register("nic")}
            errorMessage={errors.nic?.message!}
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
            Role <span className="text-error-500">*</span>
          </Label>
          <Controller
            name="role"
            control={control}
            rules={{ required: "Role is required" }}
            render={({ field }) => (
              <SelectInput
                options={filterRoleOptions()}
                placeholder="Select Option"
                value={field.value}
                onChange={field.onChange}
                className="dark:bg-dark-900"
              />
            )}
          />
          {errors.role && (
            <p className="text-error-500 text-sm mt-1">{errors.role.message}</p>
          )}
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
          {initialValues ? "Update" : "Create"} User
        </Button>
      </div>
    </form>
  );
}
