import { EventType, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Course, Event, Hall } from "@types";
import Label from "@components/ui/label";
import Input from "@components/form/input/InputField";
import Button from "@components/ui/button/Button";
import {
  useCreateEventMutation,
  useEventsQuery,
  useUpdateEventMutation,
} from "@data/event";
import SelectInput from "@components/ui/select-input";
import { eventTypeOptions } from "../../constants/role";
import { useHallsQuery } from "@data/hall";
import Card from "@components/common/card";
import Badge from "@components/ui/badge/Badge";
import { useCoursesQuery } from "@data/course";

type FormValues = {
  code: string;
  eventType: { value: EventType; label: string };
  course: Course;
  halls: Hall[];
  date: number;
  startTime: number;
  endTime: number;
  reference: number;
};

const defaultValues = {
  code: "",
  eventType: eventTypeOptions[0].value,
};

const validationSchema = yup.object().shape({
  code: yup.string().required("Event code is required"),
  eventType: yup.object().required("Event Type is required"),
  date: yup.string().required("Date is required"),
  startTime: yup.string().required("Start time is required"),
  endTime: yup.string().required("End time is required"),
});

interface Props {
  initialValues?: Event;
}

export default function CreateOrUpdateEventForm({ initialValues }: Props) {
  const { halls } = useHallsQuery({});
  const { events } = useEventsQuery({});
  const { courses } = useCoursesQuery({});

  // console.log("events: ", events);

  const {
    control,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    // @ts-ignore
    defaultValues: initialValues
      ? {
          ...initialValues,
          eventType: eventTypeOptions.find(
            (eventTypeOption) =>
              eventTypeOption.value === initialValues.eventType
          ),
        }
      : defaultValues,
    //@ts-ignore
    resolver: yupResolver(validationSchema),
  });

  const { mutate: createEvent, isLoading: creating } = useCreateEventMutation();
  const { mutate: updateEvent, isLoading: updating } = useUpdateEventMutation();

  const selectedHalls = watch("halls");
  const selectedDate = watch("date");

  const filterEvents = () => {
    let filteredEvents = events;

    if (selectedHalls && selectedHalls.length > 0) {
      const selectedHallIds = selectedHalls.map((hall) => hall.id ?? hall); // handle IDs or objects

      filteredEvents = filteredEvents.filter((event) => {
        const eventHallIds = event.halls.map((hall) => hall.id);
        return selectedHallIds.some((id) => eventHallIds.includes(id));
      });
    }

    if (selectedDate) {
      const selectedDateStr = new Date(selectedDate)
        .toISOString()
        .split("T")[0]; // format to YYYY-MM-DD
      filteredEvents = filteredEvents.filter((event) => {
        const eventDateStr = new Date(event.date).toISOString().split("T")[0];
        return eventDateStr === selectedDateStr;
      });
    }

    return filteredEvents;
  };

  const onSubmit = async (values: FormValues) => {
    const input = {
      code: values.code,
      eventType: values.eventType.value,
      date: values.date,
      startTime: values.startTime,
      endTime: values.endTime,
      reference: values.reference,
      hallIds: values.halls.map((hall) => hall.id),
    };

    if (!initialValues) {
      createEvent(input);
    } else {
      updateEvent({ id: initialValues.id, ...input });
    }
  };

  return (
    <div className="grid grid-cols-2 gap-5  ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <div>
            <Label>
              Event Type <span className="text-error-500">*</span>
            </Label>
            <SelectInput
              name="eventType"
              control={control}
              getOptionLabel={(option: any) => option.label}
              getOptionValue={(option: any) => option.value}
              options={eventTypeOptions}
              placeholder="Select Option"
              className="dark:bg-dark-900"
            />
            {errors.eventType && (
              <p className="text-error-500 text-sm mt-1">
                {errors.eventType.message}
              </p>
            )}
          </div>
          <div>
            <Label>
              Course <span className="text-error-500">*</span>
            </Label>
            <SelectInput
              name="course"
              control={control}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.id}
              options={courses}
              placeholder="Select Option"
              className="dark:bg-dark-900"
            />
            {errors.course && (
              <p className="text-error-500 text-sm mt-1">
                {errors.course.message}
              </p>
            )}
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
          <div>
            <Label>
              Hall <span className="text-error-500">*</span>
            </Label>
            <SelectInput
              name="halls"
              control={control}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.id}
              options={halls}
              isClearable={true}
              isMulti
            />
            {errors.halls && (
              <p className="text-error-500 text-sm mt-1">
                {errors.halls.message}
              </p>
            )}
          </div>
          <div>
            <Label>
              Name <span className="text-error-500">*</span>{" "}
            </Label>
            <Input {...register("code")} errorMessage={errors.code?.message!} />
          </div>

          <div>
            <Label>
              Start time<span className="text-error-500">*</span>{" "}
            </Label>
            <Input
              type="time"
              {...register("startTime")}
              errorMessage={errors.startTime?.message!}
            />
          </div>
          <div>
            <Label>
              End time<span className="text-error-500">*</span>{" "}
            </Label>
            <Input
              type="time"
              {...register("endTime")}
              errorMessage={errors.endTime?.message!}
            />
          </div>
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

      <div className="p-5 mt-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
          Scheduled Events
        </h4>
        {filterEvents().map((event) => (
          <Card className="p-5 mt-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <p className="text-sm mb-2 font-medium text-gray-800 dark:text-white/90">
              {event.code}
            </p>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              {event.eventType}
            </p>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              {event.halls.map((hall) => (
                <Badge size="sm" color="success">
                  {hall.name}
                </Badge>
              ))}
            </p>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              {event.date}
            </p>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              {event.startTime}
            </p>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              {event.endTime}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
