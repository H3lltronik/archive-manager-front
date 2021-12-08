import { ElNotification } from "element-plus";

export const showNotification = (
  title: string,
  message: string,
  type: "error" | "success" | "warning" | "info"
) => {
  ElNotification({
    title,
    message,
    type,
  });
};
