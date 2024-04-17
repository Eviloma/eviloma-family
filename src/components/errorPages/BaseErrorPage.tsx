import { BackgroundImage, Box, Center, Text } from "@mantine/core";
import React from "react";

export default function BaseErrorPage() {
  return (
    <Box w="100%" h="100%">
      <BackgroundImage
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-6.png"
        radius="xs"
        h="100%"
      >
        <Center p="md">
          <Text c="white">
            BackgroundImage component can be used to add any content on image. It is useful for hero headers and other
            similar sections
          </Text>
        </Center>
      </BackgroundImage>
    </Box>
  );
}
