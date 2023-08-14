import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { getErrorMessage } from "@/utils/helpers/errorSelector";

class NotificationManager {
  showSuccess = (title?: string, message?: string | null) => {
    notifications.show({
      title: title || "Request successful",
      withCloseButton: true,
      message: message,
      autoClose: 2000,
      icon: <IconCheck size="1rem" />,
    });
  };

  showError = (err?: any, message?: string | null) => {
    notifications.show({
      title: err ? getErrorMessage(err) : "Something went wrong",
      message: message || "Please try again later",
      withCloseButton: true,
      autoClose: 2000,
      color: "red",
    });
  };
}

const notificationManager = new NotificationManager();
export default notificationManager;
