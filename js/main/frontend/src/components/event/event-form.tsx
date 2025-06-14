import { EventType, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Event } from "@types";
import Label from "@components/ui/label";
import Input from "@components/form/input/InputField";
import Button from "@components/ui/button/Button";
import { useCreateEventMutation, useUpdateEventMutation } from "@data/event";

type FormValues = {
  code: string;
  eventType: EventType;
  date: number;
  startTime: number;
  endTime: number;
  reference: number;
};

const defaultValues = {
  code: "",
};

const validationSchema = yup.object().shape({
  code: yup.string().required("Event code is required"),
});

interface Props {
  initialValues?: Event;
}

export default function CreateOrUpdateEventForm({ initialValues }: Props) {
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

  const { mutate: createEvent, isLoading: creating } = useCreateEventMutation();
  const { mutate: updateEvent, isLoading: updating } = useUpdateEventMutation();

  const onSubmit = async (values: FormValues) => {
    const input = {
      code: values.code,
      eventType: values.eventType,
      date: values.date,
      startTime: values.startTime,
      endTime: values.endTime,
      reference: values.reference,
    };

    if (!initialValues) {
      createEvent(input);
    } else {
      updateEvent({ id: initialValues.id, ...input });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div>
          <Label>
            Name <span className="text-error-500">*</span>{" "}
          </Label>
          <Input {...register("code")} errorMessage={errors.code?.message!} />
        </div>
        <div>
          <Label>
            Event Type <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            {...register("eventType")}
            errorMessage={errors.eventType?.message!}
          />
        </div>
        <div>
          <Label>
            Date<span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            type="date"
            {...register("date")}
            errorMessage={errors.date?.message!}
          />
        </div>
        {/* <div>
          <Label>
            Start time<span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            type="number"
            {...register("lectureCapacity")}
            errorMessage={errors.lectureCapacity?.message!}
          />
        </div>
        <div>
          <Label>
            End time<span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            type="number"
            {...register("lectureCapacity")}
            errorMessage={errors.lectureCapacity?.message!}
          />
        </div> */}
        <div>
          <Label>
            Reference<span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            {...register("reference")}
            errorMessage={errors.reference?.message!}
          />
        </div>

        <Button disabled={creating || updating} size="sm">
          {initialValues ? "Update" : "Create"} Event
        </Button>
      </div>
    </form>
  );
}
