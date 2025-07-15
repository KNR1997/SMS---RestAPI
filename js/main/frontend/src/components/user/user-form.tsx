import { useForm } from "react-hook-form";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../ui/button/Button";
import SelectInput from "../ui/select-input";
import { ERole, User } from "../../types";
import { roleOptions } from "../../constants/role";
import { useCreateUserMutation, useUpdateUserMutation } from "@data/user";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: { label: string; value: ERole };
  password: string;
};

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  // role: "",
  password: "",
};

const validationSchema = yup.object().shape({
  firstName: yup.string().required("FirstName is required"),
  lastName: yup.string().required("LastName is required"),
  email: yup.string().required("Email is required"),
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
            (role) => role.value === initialValues.role.name
          ),
        }
      : defaultValues,
    //@ts-ignore
    resolver: yupResolver(validationSchema),
  });

  const { mutate: createUser, isLoading: creating } = useCreateUserMutation();
  const { mutate: updateUser, isLoading: updating } = useUpdateUserMutation();

  const onSubmit = async (values: FormValues) => {
    const input = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      username: values.username,
      role: values.role.value,
      password: values.password,
    };

    try {
      if (!initialValues) {
        createUser(input);
      } else {
        updateUser({ id: initialValues.id, ...input });
      }
    } catch (error) {
      // console.log("errorrrrrrrr: ", error);
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
            Role <span className="text-error-500">*</span>
          </Label>
          <SelectInput
            name="role"
            control={control}
            options={roleOptions}
            isClearable={true}
          />
          {errors.role && (
            <p className="text-error-500 text-sm mt-1">{errors.role.message}</p>
          )}
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
