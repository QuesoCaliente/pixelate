import { useImage } from "@/context/context";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import EditUpload from "../editUpload";
import Upload from "../upload";
import { StatusImageType } from "../../context/context";
import Loading from "../loading";

export default function Hero() {
  const { statusImage } = useImage();
  const refLottie = useRef(null);
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });
  return (
    <Stack
      mx={"auto"}
      my={12}
      maxW={statusImage === "done" ? "container.xl" : "container.lg"}
      direction={["column-reverse", "column-reverse", "row", "row"]}
      alignItems="center"
      justifyContent="space-between"
    >
      {![StatusImageType.done, StatusImageType.uploading].includes(
        statusImage
      ) && (
        <Stack alignItems="center">
          <Box
            width={300}
            height={300}
            overflow="hidden"
            position="relative"
            borderRadius="full"
          >
            <lottie-player
              id="rocket"
              ref={refLottie}
              autoplay
              loop
              mode="normal"
              src="/rocket.json"
            />
          </Box>
          <Heading
            fontFamily="'VT323', monospace"
            textAlign="center"
            color={"gray.600"}
          >
            Pixelea y redimensiona tus imagenes
          </Heading>
        </Stack>
      )}
      <Stack m={"0 auto"}>
        {statusImage === StatusImageType.uploading && <Loading />}
        <Upload />
        {statusImage === StatusImageType.error && (
          <Text color="red.500">Error al subir la imagen</Text>
        )}
      </Stack>
    </Stack>
  );
}
