import { CloudinaryImage } from "@cloudinary/url-gen";
import { createContext, useState, useContext } from "react";

interface FileWithPreview extends File {
  preview?: string;
}

interface CloudinaryWithPublicId {
  file: CloudinaryImage;
  public_id: string;
}

type ImageContextType = {
  oldImage: FileWithPreview | null;
  newImage: CloudinaryWithPublicId | null;
  setOldImage: (oldImage: FileWithPreview | null) => void;
  setNewImage: (newImage: CloudinaryWithPublicId | null) => void;
  statusImage: StatusImageType;
  setStatusImage: (statusImage: StatusImageType) => void;
};

export enum StatusImageType {
  uploading = "uploading",
  done = "done",
  error = "error",
  ready = "ready",
}
const defaultContext: ImageContextType = {
  oldImage: null,
  newImage: null,
  setOldImage: () => {},
  setNewImage: () => {},
  statusImage: StatusImageType.ready,
  setStatusImage: () => {},
};

const ImageContext = createContext<ImageContextType>(defaultContext);

export const useImage = () => useContext(ImageContext);

export const ImageContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [oldImage, setoldImage] = useState<FileWithPreview | null>(null);
  const [newImage, setnewImage] = useState<CloudinaryWithPublicId | null>(null);
  const [statusImage, setstatusImage] = useState(StatusImageType.ready);
  const setOldImage = (oldImage: FileWithPreview | null) => {
    setoldImage(oldImage);
  };
  const setNewImage = (newImage: CloudinaryWithPublicId | null) => {
    setnewImage(() => newImage);
  };

  const setStatusImage = (statusImage: StatusImageType) => {
    setstatusImage(() => statusImage);
  };

  return (
    <ImageContext.Provider
      value={{
        oldImage,
        newImage,
        statusImage,
        setOldImage,
        setNewImage,
        setStatusImage,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};
