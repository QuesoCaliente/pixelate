import { useImage } from "@/context/context";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import EditUpload from "../editUpload";
import Upload from "../upload";
import { StatusImageType } from "../../context/context";
import Loading from "../loading";

export default function Hero() {
  const { statusImage } = useImage();
  return (
    <Stack
      mx={"auto"}
      my={12}
      maxW={"container.lg"}
      direction={"row"}
      alignItems="center"
    >
      {statusImage === "done" ? (
        <EditUpload />
      ) : (
        <>
          <Stack alignItems="center">
            <Box
              width={300}
              height={300}
              overflow="hidden"
              position="relative"
              borderRadius="full"
            >
              <Image alt="pixelate" src="/shop.png" fill />
            </Box>
            <Heading textAlign="center" color={"gray.600"}>
              Pixelea y redimensiona tus imagenes
            </Heading>
          </Stack>
          <Stack>
            {statusImage === StatusImageType.uploading && <Loading />}
            {statusImage === StatusImageType.ready && <Upload />}
            {statusImage === StatusImageType.error && (
              <Text color="red.500">Error al subir la imagen</Text>
            )}
          </Stack>
        </>
      )}
    </Stack>
  );
}
