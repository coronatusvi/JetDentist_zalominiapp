import { message } from "antd";
import dayjs from "dayjs";
import { NavigateFunction, NavigateOptions, To } from "react-router-dom";

export const classNames = (...names: (string | undefined | null)[]): string =>
  (names || []).filter((e) => !!e && typeof e === "string").join(" ");

export const convertDate = (date: Date) => {
  if (date) {
    return dayjs(date).format("DD/MM/YYYY");
  } else {
    return date;
  }
};

export const handleError = (err: any) => {
  const messageError = err.message.toString();
  message.error(messageError);
};
