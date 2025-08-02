import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateHallMutation, useUpdateHallMutation } from "@data/hall";
import { User } from "@types";
import Label from "@components/ui/label";
import Input from "@components/form/input/InputField";
import Button from "@components/ui/button/Button";
import PasswordInput from "@components/ui/password-input";
import { useChangePasswordMutation } from "@data/user";
import { toast } from "react-toastify";

type FormValues = {
  oldPassword: string;
  newPassword: string;
  passwordConfirmation: string;
};

const defaultValues = {};

const validationSchema = yup.object().shape({
  oldPassword: yup.string().required("Old Password is required"),
  newPassword: yup.string().required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords should match!")
    .required("Please confirm password!"),
});

interface Props {
  initialValues?: User;
}

export default function UserPasswordCard({ initialValues }: Props) {
  const {
    register,
    setError,
    reset,
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

  const { mutate: changePassword, isLoading: loading } =
    useChangePasswordMutation();

  async function onSubmit(values: FormValues) {
    changePassword(
      {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      },
      {
        onError: (error: any) => {
          toast.error(error?.response?.data?.error ?? "Something going wrong!");
          // Object.keys(error?.response?.data).forEach((field: any) => {
          //   setError(field, {
          //     type: 'manual',
          //     message: error?.response?.data[field][0],
          //   });
          // });
        },
        onSuccess: (data) => {
          toast.success("Password changed successfully!");
          reset();
          // if (!data?.success) {
          //   setError('oldPassword', {
          //     type: 'manual',
          //     message: data?.message ?? '',
          //   });
          // } else if (data?.success) {
          //   toast.success('Password changed successfully!');
          //   // reset();
          // }
        },
      }
    );
  }

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Change Password
            </h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div>
                  <PasswordInput
                    label="Old Password"
                    {...register("oldPassword")}
                    variant="outline"
                    error={errors.oldPassword?.message!}
                    className="mb-5"
                  />
                </div>
                <div>
                  <PasswordInput
                    label="New Password"
                    {...register("newPassword")}
                    variant="outline"
                    error={errors.oldPassword?.message!}
                    className="mb-5"
                  />
                </div>
                <div>
                  <PasswordInput
                    label="Confirm Password"
                    {...register("passwordConfirmation")}
                    variant="outline"
                    error={errors.passwordConfirmation?.message!}
                    className="mb-5"
                  />
                </div>

                <Button disabled={loading} size="sm">
                  Change
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
