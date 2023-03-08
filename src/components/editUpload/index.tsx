import { StatusImageType, useImage } from "@/context/context";
import {
  Box,
  Button,
  Stack,
  Text,
  Input,
  InputLeftAddon,
  InputGroup,
  Image as ChakraImage,
  Select,
} from "@chakra-ui/react";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { Cloudinary } from "@cloudinary/url-gen";
import { format } from "@cloudinary/url-gen/actions/delivery";
import { pixelate } from "@cloudinary/url-gen/actions/effect";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { auto } from "@cloudinary/url-gen/qualifiers/quality";
import React, { useEffect, ReactNode, useState, useRef } from "react";
import { LoadingEditor } from "../loading";
import { setInterval } from "timers";

export default function EditUpload() {
  const { oldImage, newImage, setNewImage, setStatusImage, statusImage } =
    useImage();
  const imgRef = useRef<HTMLImageElement>(null);
  const [form, setform] = useState({
    width: 0,
    height: 0,
    squareRatio: 20,
    format: "png",
  });

  const cld = new Cloudinary({
    cloud: {
      cloudName: "dmtvbc0i1",
    },
  });

  const newformat: {
    [key: string]: string;
  } = {
    png: "png",
    jpg: "jpg",
    gif: "gif",
  };

  useEffect(() => {
    if (newImage?.file.toURL() === undefined) return;
    let intervalId: NodeJS.Timeout;
    let tries = 0;

    const loadImage = () => {
      const img = new Image();
      img.src = newImage?.file.toURL();
      img.onload = () => {
        setTimeout(() => {
          setStatusImage(StatusImageType.done);
        }, 1500);
        clearInterval(intervalId);
      };
      img.onerror = () => {
        setStatusImage(StatusImageType.error);
      };
    };

    if (statusImage === StatusImageType.uploading) {
      loadImage();
      intervalId = setInterval(() => {
        tries++;
        if (tries < 20) {
          loadImage();
        } else {
          clearInterval(intervalId);
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [newImage, statusImage]);

  const updating = async () => {
    setNewImage(null);
    setStatusImage(StatusImageType.uploading);
    let image = cld
      .image(newImage?.public_id)
      .effect(pixelate().squareSize(form.squareRatio));

    if (form.width > 0) {
      image = image?.resize(scale().width(form.width));
    }
    if (form.height > 0) {
      image = image?.resize(scale().height(form.height));
    }
    image = image.delivery(format(newformat[form.format])).quality(auto());
    image = image.addFlag("attachment");
    setNewImage({
      file: image,
      public_id: newImage?.public_id!,
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setform({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    import("two-up-element");
  }, []);
  return (
    <Stack
      w="full"
      m={"0 auto"}
      direction={["column", "column", "column", "row"]}
      gap={10}
    >
      <Stack w="full" flex={3}>
        <two-up>
          <ChakraImage alt="Imagen antigua" src={oldImage?.preview} />
          {statusImage === StatusImageType.uploading ? (
            <LoadingEditor />
          ) : (
            <ChakraImage
              ref={imgRef}
              alt="Imagen nueva"
              src={newImage?.file.toURL() + "?" + Date.now()}
            />
          )}
        </two-up>
        <Button
          as={"a"}
          colorScheme="pink"
          download
          loadingText="Cargando..."
          isLoading={statusImage === StatusImageType.uploading}
          href={newImage?.file.toURL()!}
        >
          Descargar
        </Button>
      </Stack>
      <Stack flex={1} boxShadow="sm" w={"full"}>
        <LabelPanel>Opciones</LabelPanel>
        <Box // Suqare Ratio Panel
          borderColor={"gray.100"}
          borderWidth={2}
          borderRadius={"md"}
          bg="gray.50"
        >
          <LabelPanel
            icon={
              <span
                data-tts="up-right"
                aria-label="Establece el ancho en pixeles de cada cuadrado, elige un valor entre 1 y 200, valor por defecto: 20"
              >
                <QuestionOutlineIcon fontSize={"xl"} color="white" />
              </span>
            }
            color="white"
            bg="pink.400"
          >
            Square Ratio
          </LabelPanel>
          <Box p={4}>
            <Input
              name="squareRatio"
              onChange={onChange}
              value={form.squareRatio}
              variant={"outline"}
              placeholder="20"
            />
          </Box>
        </Box>
        <Box // Dimensiones Panel
          borderColor={"gray.100"}
          borderWidth={2}
          borderRadius={"md"}
          bg="gray.50"
        >
          <LabelPanel color="white" bg="pink.400">
            Dimensiones
          </LabelPanel>
          <Box display="flex" flexDirection={"column"} gap={3} p={4}>
            <InputGroup>
              <InputLeftAddon>Ancho</InputLeftAddon>
              <Input
                value={form.width}
                name="width"
                onChange={onChange}
                placeholder="500"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon>Alto</InputLeftAddon>
              <Input
                value={form.height}
                name="height"
                onChange={onChange}
                placeholder="600"
              />
            </InputGroup>
          </Box>
        </Box>
        <Box // Format Panel
          borderColor={"gray.100"}
          borderWidth={2}
          borderRadius={"md"}
          bg="gray.50"
        >
          <LabelPanel color="white" bg="pink.400">
            Formato
          </LabelPanel>
          <Box p={4}>
            <Select
              defaultValue={"png"}
              onChange={(e) => {
                console.log("onChange");
                setform({
                  ...form,
                  format: e.target.value,
                });
              }}
              placeholder="Seleccionar Formato"
            >
              <option value="png">Png</option>
              <option value="jpg">Jpg</option>
            </Select>
          </Box>
        </Box>
        <Box display="flex" gap={5} justifyContent="center">
          <Button
            loadingText="Cargando..."
            isLoading={statusImage === StatusImageType.uploading}
            onClick={() => updating()}
            flex={1}
            colorScheme={"blue"}
          >
            Actualizar
          </Button>
          <Button
            onClick={() => setStatusImage(StatusImageType.ready)}
            flex={1}
            colorScheme={"red"}
          >
            Cancelar
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
}

function LabelPanel({
  children,
  bg,
  color,
  icon,
}: {
  children: ReactNode;
  bg?: string;
  color?: string;
  icon?: ReactNode;
}) {
  return (
    <Box
      display={"flex"}
      w={"100%"}
      justifyContent={"space-between"}
      alignItems={"center"}
      px={4}
      py={2}
      bg={bg ? bg : "gray.200"}
    >
      <Text color={color ? color : undefined}>{children}</Text>
      {icon ? icon : undefined}
    </Box>
  );
}
