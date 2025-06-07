import { useForm } from "react-hook-form";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Button from "../ui/button/Button";
import SelectInput from "../ui/select-input";
import { Subject } from "../../types";

type FormValues = {
  student: string;
  admission: string;
  subjects: any;
  totalPayment: string;
};

const defaultValues = {
  admission: "2000",
  subjects: [
        {
        label: 'Maths (Rs. 2000)',
        value: 'Maths'
    }
  ],
  totalPayment: "4000"
};

export default function CreatePaymentForm() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: defaultValues,
  });

  const studentSubjects = [
    {
        label: 'Maths',
        value: 'Maths'
    }
  ]
  return (
    <form>
      <div className="space-y-6">
        <div>
          <Label>
            Student <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            placeholder="John"
            {...register("student")}
            errorMessage={errors.student?.message!}
          />
        </div>
        <div>
          <Label>
            Admission <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            {...register("admission")}
            errorMessage={errors.admission?.message!}
            disabled
          />
        </div>
                <div>
          <Label>
            Subject <span className="text-error-500">*</span>
          </Label>
          <SelectInput
            name="subjects"
            control={control}
            getOptionLabel={(option: any) => option.label}
            getOptionValue={(option: any) => option.value}
            options={studentSubjects}
            isClearable={true}
            isMulti
            disabled
          />
          {errors.subjects && (
            <p className="text-error-500 text-sm mt-1">
              {errors.subjects.message}
            </p>
          )}
        </div>
                <div>
          <Label>
            Total Payment <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            {...register("totalPayment")}
            errorMessage={errors.totalPayment?.message!}
            disabled
          />
        </div>
      </div>
      <Button className="mt-5" size="sm">Pay</Button>
    </form>
  );
}
