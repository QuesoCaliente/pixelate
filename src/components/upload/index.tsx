import { StatusImageType, useImage } from "@/context/context";
import { Box, Text, Stack } from "@chakra-ui/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { pixelate } from "@cloudinary/url-gen/actions/effect";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./upload.module.css";

export default function Upload() {
  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dmtvbc0i1",
    },
  });

  const { setOldImage, oldImage, setStatusImage, setNewImage } = useImage();
  const navigation = useRouter();
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setOldImage(
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      })
    );
    upload(acceptedFiles[0]);
    navigation.push("/editor");
  }, []);

  const upload = (file: File) => {
    setStatusImage(StatusImageType.uploading);
    const url = process.env.NEXT_PUBLIC_CLOUDINARY_URL!;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "pixelate");
    data.append("cloud_name", "dmtvbc0i1");
    data.append("timestamp", `${Math.round(new Date().getTime() / 1000)}`);
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
        setNewImage({
          file: imageWithPixelate,
          public_id: public_id,
        });
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
        className={styles.upload}
        overflow="hidden"
        _before={{
          content: '""',
          position: "absolute",
          width: "100px",
          height: "500%",
          background: "linear-gradient(180deg,#00b7ff,#ff30ff)",
        }}
        _after={{
          content: '""',
          position: "absolute",
          inset: 1,
          background: "gray.100",
          borderRadius: "xl",
        }}
        position="relative"
        borderRadius={"xl"}
        p={5}
        boxShadow={"md"}
        backgroundColor={"gray.100"}
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
          color={"gray.900"}
          borderStyle={"solid"}
          borderRadius={"xl"}
          borderWidth={2}
          borderColor={"pink.400"}
          boxShadow={"md"}
          px={4}
          py={2}
          display={"inline-block"}
          rounded={"full"}
          fontSize={"2xl"}
          fontWeight={"bold"}
          transition={"all 0.2s"}
          _hover={{
            cursor: "pointer",
            color: "gray.600",
            transform: "translateY(-2px)",
          }}
          fontFamily="'VT323', monospace"
          letterSpacing="widest"
        >
          Subir
        </Box>
        {isDragActive ? (
          <Text zIndex={1}>Drop the files here ...</Text>
        ) : (
          <Text
            textAlign="center"
            fontFamily="'VT323', monospace"
            fontSize="2xl"
          >
            Arrastre y suelte el archivo aquí o haga clic para seleccionar
            archivo
          </Text>
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
