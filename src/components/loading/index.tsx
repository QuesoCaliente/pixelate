import { Spinner } from "@chakra-ui/react";
import React from "react";

export default function Loading() {
  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="pink.200"
      color="pink.500"
      size="xl"
    />
  );
}

export function LoadingEditor() {
  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="pink.200"
      color="pink.500"
      size="xl"
      position={"absolute"}
      top={"50%"}
      left={"80%"}
    />
  );
}
