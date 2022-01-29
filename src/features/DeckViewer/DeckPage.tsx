import { FC, useRef, useState, useEffect } from "react";

import { FileType } from "../../constants/FileType";
import { FileEndings } from "../../constants/FileEndings";

import { useForm } from "react-hook-form/";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useGetDeckService, useUploadDeckService } from "./store/services";

import { AxiosRequestConfig } from "axios";
import Progress from "../../UI/Progress/";

type Props = {
  a: string;
};
type DataType = {
  deck: FileList;
};
const DeckPage: FC<Props> = () => {
  const acceptFileEndings = `${FileEndings[FileType.PDF]},${
    FileEndings[FileType.PPT]
  }`;
  const acceptedFormats = [
    "application/ppt",
    "application/pptx",
    "application/pptm",
    "application/pdf",
  ];
  console.log(acceptedFormats);
  console.log(acceptFileEndings);
  const getDeck = useGetDeckService();
  const uploadDeck = useUploadDeckService();
  const [file, setFile] = useState<File>(null);
  const [fileName, setFileName] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const FILE_MXSIZE = 1000000;

  const schema = yup.object().shape({
    deck: yup
      .mixed()
      .required("You need to select a file")
      .test("file-size", "File is too large !", (val) => {
        console.log("szd 0", val);
        return val && val[0].size <= FILE_MXSIZE;
      })
      .test("file-format", "Unsupported Format", (val) => {
        console.log("file 0", val);

        return val && acceptedFormats.includes(val[0].type);
      }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent: ProgressEvent) => {
      const progressHasDone = Math.round(
        (progressEvent.loaded / progressEvent.total) * 100
      );
      console.log("progress - ", progressHasDone);

      setProgress(progressHasDone);
      console.log("progress - ", progress);
    },
  };
  const onSubmit = (data: DataType) => {
    if (!data) return;
    const { deck } = data;
    const formData = new FormData();
    formData.append("file", deck[0]);
    uploadDeck(formData, config);
    reset();
    setProgress(0);
  };

  useEffect(() => {
    getDeck();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <p>Upload your patch deck</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="file"
            accept=".pdf"
            id="fileInput"
            multiple={false}
            name="deck"
            {...register("deck")}
          />
          {errors.deck && <p className="error">{errors.deck.message}</p>}
          <Progress percentage={progress} />
          <button className="bg-white focus:shadow-outline">Submit</button>
        </form>
      </div>
    </>
  );
};
export default DeckPage;
