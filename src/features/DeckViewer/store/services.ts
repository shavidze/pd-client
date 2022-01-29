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
import { AxiosRequestConfig } from "axios";
export const useGetDeckService = () => {
  const getDeckApi = useGetDeckApi();
  const dispatch = useDispatch();
  return useCallback((): Promise<void> => {
    dispatch(getDeckStart());
    return getDeckApi()
      .then((response: any) => {
        dispatch(getDeckSuccess(response));
      })
      .catch((error: any) => {
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
        .then((respnose) => {
          console.log(respnose);
          dispatch(uploadFileSuccess());
        })
        .catch((error: any) => {
          let errorMessage = handleError(error);
          dispatch(getDeckFailure());
          toast.error(errorMessage);
        });
    },
    []
  );
};
