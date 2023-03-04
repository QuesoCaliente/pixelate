import { Box, Text, Link } from "@chakra-ui/react";
import React from "react";

export default function Footer() {
  return (
    <Box bgColor="purple.800" py="3" as="footer">
      <Text color="white" textAlign="center">
        Powered by{" "}
        <Link
          textDecoration={"underline"}
          _hover={{
            color: "purple.400",
            cursor: "pointer",
          }}
          href="https://cloudinary.com/"
        >
          Cloudinary
        </Link>{" "}
        and{" "}
        <Link
          _hover={{
            color: "purple.400",
            cursor: "pointer",
          }}
          textDecoration={"underline"}
          href="https://nextjs.org/"
        >
          Next.js
        </Link>
      </Text>
      <Box as="p" color="white" textAlign="center">
        Made with ❤️ by{" "}
        <Link
          _hover={{
            color: "purple.400",
            cursor: "pointer",
          }}
          textDecoration={"underline"}
          href="https://github.com/QuesoCaliente"
        >
          QuesoCaliente
        </Link>
      </Box>
    </Box>
  );
}
