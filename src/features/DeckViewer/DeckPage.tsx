import { FC, useState, useEffect } from "react";

import FileEndings from "../../constants/FileEndings";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import { useForm } from "react-hook-form/";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useGetDeckService, useUploadDeckService } from "./store/services";
import { AxiosRequestConfig } from "axios";

import Progress from "../../UI/Progress/";
import DeckList from "./components/DeckList";

type Props = {
  a: string;
};
type DataType = {
  deck: FileList;
};
const DeckPage: FC<Props> = () => {
  const acceptedFormats = Object.keys(FileEndings).map(
    (key) => `application/${FileEndings[key]}`
  );
  const getDeck = useGetDeckService();
  const uploadDeck = useUploadDeckService();
  const [progress, setProgress] = useState(0);
  const { currentDeck } = useSelector((state: RootState) => state.deckReducer);
  const schema = yup.object().shape({
    deck: yup
      .mixed()
      .required("You need to select a file")
      .test(
        "fileFormat",
        "You're trying to upload unsupported format",
        (file) => {
          return file && acceptedFormats.includes(file[0].type);
        }
      ),
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
      setProgress(progressHasDone);
    },
  };

  const onSubmit = (data: DataType) => {
    if (!data) return;
    const { deck } = data;
    const formData = new FormData();
    formData.append("file", deck[0]);
    uploadDeck(formData, config).then(() => {
      setProgress(0);
      return getDeck();
    });
    reset();
  };
  useEffect(() => {
    getDeck();
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <p className="text-xl mt-2 font-medium pr-2 text-coolgray-900 mb-4">
          Upload your pitch deck
        </p>
        <form className="mb-9" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="form-control block w-full px-2 py-1.5 text-xl font-mono text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-900 focus:bg-white focus: border-blue-400 focus:outline-none"
            type="file"
            id="fileInput"
            multiple={false}
            name="deck"
            {...register("deck")}
          />
          {errors.deck && (
            <p className="error w-full text-center mt-1 font-medium">
              {errors.deck.message}
            </p>
          )}
          <div className="mt-5">
            <Progress percentage={progress} />
          </div>
          <div className="w-full flex justify-center items-center">
            <button className="mt-5 mx-auto inline-block px-6 py-2.5 bg-blue-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
              Submit
            </button>
          </div>
        </form>
        <div className="flex justify-center flex-col">
          {currentDeck && (
            <p className="text-center text-xl mt-2 font-medium pr-2 text-coolgray-900 mb-4">
              Current Pitch Deck
            </p>
          )}
          <DeckList data={currentDeck} />
        </div>
      </div>
    </>
  );
};
export default DeckPage;
