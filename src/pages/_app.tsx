import NavBar from "@/components/navbar";
import { ImageContextProvider } from "@/context/context";
import theme from "@/utils/theme";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import "../styles/tooltips.min.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ImageContextProvider>
        <NavBar />
        <Component {...pageProps} />
      </ImageContextProvider>
    </ChakraProvider>
  );
}
