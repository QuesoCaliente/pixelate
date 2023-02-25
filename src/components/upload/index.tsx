import { StatusImageType, useImage } from "@/context/context";
import { Box, Button, Stack } from "@chakra-ui/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { pixelate } from "@cloudinary/url-gen/actions/effect";
import Image from "next/image";
import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import EditUpload from "../editUpload/index";

export default function Upload() {
  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dmtvbc0i1",
    },
  });

  const { setOldImage, oldImage, setStatusImage, setNewImage } = useImage();
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setOldImage(
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      })
    );
    upload(acceptedFiles[0]);
  }, []);

  const upload = (file: File) => {
    setStatusImage(StatusImageType.uploading);
    const url = "https://api.cloudinary.com/v1_1/dmtvbc0i1/image/upload";
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "pixelate");
    data.append("cloud_name", "dmtvbc0i1");
    fetch(url, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        const { public_id } = data;
        const imageWithPixelate = cld
          .image(public_id)
          .effect(pixelate().squareSize(20));
        setNewImage(imageWithPixelate);
        setStatusImage(StatusImageType.done);
      });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
  });
  return (
    <>
      <Stack
        {...getRootProps()}
        p={5}
        w={"xl"}
        boxShadow={"md"}
        borderStyle={"dotted"}
        borderWidth={2}
        borderColor={"pink.400"}
        justifyContent="center"
        alignItems="center"
        flexDirection={"column"}
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submit");
        }}
        minH={"lg"}
      >
        <input {...getInputProps()} />
        <Box
          width={220}
          textAlign="center"
          // bg={"pink.300"}
          color={"gray.700"}
          px={4}
          py={2}
          borderStyle={"dashed"}
          borderWidth={2}
          borderColor={"pink.400"}
          display={"inline-block"}
          rounded={"md"}
          fontSize={"2xl"}
          fontWeight={"bold"}
          transition={"all 0.2s"}
          _hover={{
            bg: "pink.400",
            cursor: "pointer",
            color: "white",
          }}
        >
          Upload
        </Box>
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag drop some files here, or click to select files</p>
        )}
        {oldImage && (
          <Box width={300} height={300} position="relative">
            <Image fill alt="oldImage" src={oldImage.preview!} />
          </Box>
        )}
      </Stack>
    </>
  );
}
