import { useForm } from "react-hook-form";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../ui/button/Button";
import { Guardian } from "../../types";
import { useUpdateGuardianMutation } from "../../data/guardian";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  nationalIdentityNumber: string;
  contactNumber: string;
};

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  nationalIdentityNumber: "",
  contactNumber: "",
};

const validationSchema = yup.object().shape({
  firstName: yup.string().required("FirstName is required"),
  lastName: yup.string().required("LastName is required"),
  email: yup.string().required("Email is required"),
});

interface Props {
  initialValues?: Guardian;
}

export default function CreateOrUpdateGuardianForm({ initialValues }: Props) {
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

  const { mutate: updateGuardian, isLoading: updating } =
    useUpdateGuardianMutation();

  const onSubmit = async (values: FormValues) => {
    const input = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      nationalIdentityNumber: values.nationalIdentityNumber,
      contactNumber: values.contactNumber,
    };

    if (initialValues) {
      updateGuardian({ id: initialValues.id, ...input });
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
            Identity Number <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            placeholder="user123"
            {...register("nationalIdentityNumber")}
            errorMessage={errors.nationalIdentityNumber?.message!}
          />
        </div>
        <div>
          <Label>
            Contact Number <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            {...register("contactNumber")}
            errorMessage={errors.contactNumber?.message!}
          />
        </div>
        <Button disabled={updating} size="sm">
          {initialValues ? "Update" : "Create"} Guardian
        </Button>
      </div>
    </form>
  );
}
