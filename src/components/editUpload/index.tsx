import { useImage } from "@/context/context";
import { Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";

export default function EditUpload() {
  const { oldImage, newImage } = useImage();
  useEffect(() => {
    import("two-up-element");
  }, []);
  return (
    <Stack gap={10}>
      <two-up>
        <img src={oldImage?.preview} />
        <img src={newImage?.toURL()} />
      </two-up>
      <Stack>
        <button>Download</button>
      </Stack>
    </Stack>
  );
}
