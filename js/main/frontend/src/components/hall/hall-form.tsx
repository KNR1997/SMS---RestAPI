import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateHallMutation, useUpdateHallMutation } from "@data/hall";
import { Hall } from "@types";
import Label from "@components/ui/label";
import Input from "@components/form/input/InputField";
import Button from "@components/ui/button/Button";

type FormValues = {
  name: string;
  examCapacity: number;
  lectureCapacity: number;
};

const defaultValues = {
  name: "",
  examCapacity: 0,
  lectureCapacity: 0,
};

const validationSchema = yup.object().shape({
  name: yup.string().required("Hall Name is required"),
});

interface Props {
  initialValues?: Hall;
}

export default function CreateOrUpdateHallForm({ initialValues }: Props) {
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

  const { mutate: createHall, isLoading: creating } = useCreateHallMutation();
  const { mutate: updateHall, isLoading: updating } = useUpdateHallMutation();

  const onSubmit = async (values: FormValues) => {
    const input = {
      name: values.name,
      examCapacity: values.examCapacity,
      lectureCapacity: values.lectureCapacity,
    };

    if (!initialValues) {
      createHall(input);
    } else {
      updateHall({ id: initialValues.id, ...input });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div>
          <Label>
            Name <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            placeholder="John"
            {...register("name")}
            errorMessage={errors.name?.message!}
          />
        </div>
        <div>
          <Label>
            Exam Capacity <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            type="number"
            {...register("examCapacity")}
            errorMessage={errors.examCapacity?.message!}
          />
        </div>
        <div>
          <Label>
            Lecture Capacity <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            type="number"
            {...register("lectureCapacity")}
            errorMessage={errors.lectureCapacity?.message!}
          />
        </div>

        <Button disabled={creating || updating} size="sm">
          {initialValues ? "Update" : "Create"} Hall
        </Button>
      </div>
    </form>
  );
}
