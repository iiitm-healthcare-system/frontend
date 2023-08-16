"use client";

import { CacheProvider } from "@emotion/react";
import { useEmotionCache, MantineProvider } from "@mantine/core";
import { useServerInsertedHTML } from "next/navigation";
import { GoogleOAuthProvider } from "@react-oauth/google";
import config from "@/utils/config";
import { Manrope } from "next/font/google";
import axios from "axios";
import { Cookies } from "react-cookie";

const manropeFont = Manrope({ subsets: ["latin"], fallback: ["Manrope"] });

export default function RootStyleRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // Axios
  const token = new Cookies().get("token");
  console.log("TOKEN -- CC", token);
  if (
    token &&
    axios.defaults.headers.common["Authorization"] != "Bearer " + token
  ) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  }

  const cache = useEmotionCache();
  cache.compat = true;

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(" "),
      }}
    />
  ));

  return (
    <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}>
      <CacheProvider value={cache}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Mantine theme override here */
            colorScheme: "light",
            colors: {
              primary: [
                "#F4F9FF",
                "#CED8E0",
                "#A9BFD4",
                "#80AAD1",
                "#4F98DC",
                "#0F89F9",
                "#2676BF",
                "#356692",
                "#3B5873",
                "#3A4C5D",
              ],
              secondary: [
                "#ebf6ff",
                "#9BB0C3",
                "#6487A4",
                "#283b4bb3",
                "#364E62",
                "#283B4B",
                "#1C2832",
                "#131B22",
                "#0D1217",
                "#090D0F",
              ],
              black: [
                "#000000",
                "#111111",
                "#222222",
                "#333333",
                "#444444",
                "#555555",
                "#666666",
                "#777777",
                "#888888",
                "#999999",
              ],
            },
            primaryShade: 5,
            primaryColor: "primary",
            fontFamily: manropeFont.style.fontFamily,
            defaultRadius: "var(--general-box-border-radius)",
            headings: {
              fontFamily: manropeFont.style.fontFamily,
              sizes: {
                h1: { fontSize: "var(--h1)" },
                h2: { fontSize: "var(--h2)" },
                h3: { fontSize: "var(--h3)" },
                h4: { fontSize: "var(--h4)" },
                h5: { fontSize: "var(--h5)" },
                h6: { fontSize: "var(--h6)" },
              },
            },
            fontSizes: {
              // xs: "0.625rem",
              // sm: "0.875rem",
              // md: "1.5rem",
              // lg: "1.125rem",
              // xl: "1.25rem",
              // xxl: "1.5rem",
            },
          }}
        >
          {children}
        </MantineProvider>
      </CacheProvider>{" "}
    </GoogleOAuthProvider>
  );
}
