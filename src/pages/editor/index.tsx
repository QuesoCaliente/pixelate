import { Box, Heading } from "@chakra-ui/react";
import React, { FC, useEffect, useRef } from "react";

export default function Editor() {
  const ref = useRef(null);
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });
  return (
    <Box mx={"auto"} maxW={"1000px"}>
      <lottie-player
        id="working"
        ref={ref}
        autoplay
        loop
        style={{ width: "1000px", height: "600px" }}
        mode="normal"
        src="/workinglaptop.json"
      />
      <Heading textAlign="center" mt={100}>
        Esta pagina esta en construcción
      </Heading>
    </Box>
  );
}
