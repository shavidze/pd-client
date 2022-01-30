import { useCallback } from "react";
import { AxiosRequestConfig } from "axios";
import { Http } from "../../services/http";

export function useUploadDeckApi() {
  return useCallback(
    (fileData: FormData, config: AxiosRequestConfig): Promise<any> => {
      return Http.post("/upload", fileData, config);
    },
    []
  );
}

export function useGetDeckApi() {
  return useCallback((): Promise<any> => {
    return Http.get("/get");
  }, []);
}
