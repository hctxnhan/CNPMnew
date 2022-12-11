import { Controller, useForm } from "react-hook-form";
import { closeCreatePeriod } from "../redux/features/topicDetailSlice";
import { useAppDispatch } from "../redux/store";
import Button from "./Button";
import CenterScreen from "./CenterScreen";
import Input from "./Input";
import NormalModal from "./NormalModal";
import Portal from "./Portal";
import WithOverlay from "./WithOverlay";
import { Timestamp } from "firebase/firestore";
import RegistrationPeriod from "../utils/types/RegistrationPeriod";
import { createPeriod } from "../firebase/firestore";
import { useNotification } from "../hooks/useNotification";
import {
  errorNotificationCreator,
  successNotificationCreator,
} from "../utils/functions/notificationUtil";
type FormValues = {
  name: string;
  startDate: string;
  endDate: string;
};

function CreatePeriod() {
  const dispatch = useAppDispatch();
  const showNotification = useNotification();
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      startDate: "",
      endDate: "",
    },
  });

  function onSubmit(data: FormValues) {
    const period: RegistrationPeriod = {
      id: "",
      topics: [],
      name: data.name,
      startDate: data.startDate.toString(),
      endDate: data.endDate.toString(),
    };
    console.log(period);
    try {
      createPeriod(period);
      reset();
      dispatch(closeCreatePeriod());
      showNotification(
        successNotificationCreator("Tạo đợt đăng ký thành công")
      );
    } catch (error) {
      showNotification(errorNotificationCreator("Tạo đợt đăng ký thất bại"));
    }
  }

  return (
    <Portal>
      <WithOverlay>
        <CenterScreen>
          <NormalModal
            onClose={() => {
              dispatch(closeCreatePeriod());
            }}
            title="Tạo đợt đăng ký"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    error={errors.name && "Vui lòng nhập tên đợt đăng ký"}
                    placeholder="Tên kỳ đăng ký"
                  />
                )}
              />

              <Controller
                name="startDate"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    error={errors.startDate && "Vui lòng nhập ngày bắt đầu"}
                    type="date"
                    placeholder="Ngày bắt đầu"
                  />
                )}
              />

              <Controller
                name="endDate"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="date"
                    error={errors.endDate && "Vui lòng nhập ngày kết thúc"}
                    placeholder="Ngày kết thúc"
                  />
                )}
              />

              <Button type="submit">Tạo đợt đăng ký</Button>
            </form>
          </NormalModal>
        </CenterScreen>
      </WithOverlay>
    </Portal>
  );
}

export default CreatePeriod;
