import EditUpload from "@/components/editUpload";
import { Box, Heading } from "@chakra-ui/react";
import React, { FC, useEffect, useRef } from "react";

export default function Editor() {
  return (
    <Box p={10}>
      <EditUpload />
    </Box>
  );
}
