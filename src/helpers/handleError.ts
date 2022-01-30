import { AxiosError } from "axios";

export function handleError(error: AxiosError): string {
  let message = "";
  if (error.response) {
    message = error.response.data
      ? error.response.data.data.message
      : "Unexpected Error";
  } else if (error.request) {
    message = "Connection Error";
  } else {
    message = "Unexpected Error";
  }

  return message;
}
