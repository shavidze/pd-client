import { useGetDeckApi, useUploadDeckApi } from "../api";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getDeckStart,
  getDeckSuccess,
  getDeckFailure,
  uploadFileStart,
  uploadFileFailure,
  uploadFileSuccess,
} from "./actions";
import { handleError } from "../../../helpers/handleError";
import { useCallback } from "react";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ResponseDataImages } from "../../../constants/types/Image";
import { debug } from "console";
export const useGetDeckService = () => {
  const getDeckApi = useGetDeckApi();
  const dispatch = useDispatch();
  return useCallback((): Promise<void> => {
    dispatch(getDeckStart());
    return getDeckApi()
      .then((response: AxiosResponse<ResponseDataImages>) => {
        dispatch(getDeckSuccess(response.data));
      })
      .catch((error: AxiosError) => {
        let errorMessage = handleError(error);
        dispatch(getDeckFailure());
        toast.error(errorMessage);
      });
  }, [getDeckApi, dispatch]);
};

export const useUploadDeckService = () => {
  const uploadDeckApi = useUploadDeckApi();
  const dispatch = useDispatch();

  return useCallback(
    (fileData: FormData, config: AxiosRequestConfig): Promise<void> => {
      dispatch(uploadFileStart());
      return uploadDeckApi(fileData, config)
        .then((respnose: AxiosResponse) => {
          dispatch(uploadFileSuccess());
          toast.success("File Uploaded Successfully", { autoClose: 2500 });
        })
        .catch((error: AxiosError) => {
          let errorMessage = handleError(error);
          dispatch(uploadFileFailure());
          toast.error(errorMessage);
        });
    },
    []
  );
};
