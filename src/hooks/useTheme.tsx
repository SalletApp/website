import { Dict, ReturnUseTheme } from "src/types/useTheme";
import { extendTheme } from "@chakra-ui/react";

const General = {
  black: "#111111",
  white: "#F3F3F3",
};

/**
 * @function useTheme
 * @description Custom hook que maneja el tema de la aplicación.
 * @returns {ReturnUseTheme} Retorna un objeto con los diferentes temas que existen en la aplicación.
 * @example
 * const { sallet, lolapalusa, ultraMusic } = useTheme()
 */
export function useTheme(): ReturnUseTheme {
  const defaultTheme: Dict = extendTheme({
    fonts: {
      heading: '"Merriweather", serif',
      body: '"Montserrat", sans-serif',
    },
    styles: {
      global: {
        "html, body": {
          width: "100%",
          height: "100%",
          overflowX: "hidden",
          backgroundColor: "#111111",
          color: "#fff",
        },
        "#__next": {
          height: "100%",
        },
      },
    },
    colors: {
      // brand
      primary: "#F5C365",
      primary15: "#F5C36526",
      secondary: "#B3E0B8",
      secondary15: "#B3E0B826",
      terciary: "#DBA2A3",
      terciary15: "#DBA2A326",
      // grays
      black: General.black,
      gray5: `${General.white}0C`,
      gray15: `${General.white}26`,
      gray25: `${General.white}3F`,
      gray35: `${General.white}59`,
      white: General.white,
      // validations
      error: "#FF7070",
      success: "#92C988",
      // general
      background: General.black,
      text: General.white,
    },
  });

  const sallet: Dict = extendTheme({
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      // brand
      primary: "#F5C365",
      primary15: "#F5C36526",
      secondary: "#B3E0B8",
      secondary15: "#B3E0B826",
      terciary: "#DBA2A3",
      terciary15: "#DBA2A326",
      // general
      background: General.black,
      text: General.white,
    },
  });

  const hulabaluza: Dict = extendTheme({
    ...defaultTheme,
    styles: {
      global: {
        background: "#F2F2F2",
        color: General.black,
      },
    },
    colors: {
      ...defaultTheme.colors,
      // brand
      primary: "#04BBAE",
      primary15: "#04BBAE26",
      secondary: "#FC3801",
      secondary15: "#FC380126",
      terciary: "#DBA2A3",
      terciary15: "#DBA2A326",
      // general
      background: General.black,
      text: General.black,
    },
  });

  const ultraMusic: Dict = extendTheme({
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      // brand
      primary: "#444444",
      primary15: "#44444426",
      secondary: "#AAF0FD",
      secondary15: "#AAF0FD26",
      terciary: "#DBA2A3",
      terciary15: "#DBA2A326",
      // general
      background: General.black,
      text: General.white,
    },
  });

  const ethArg: Dict = extendTheme({
    ...defaultTheme,
    styles: {
      global: {
        background: "#F2F2F2",
        color: General.black,
      },
    },
    colors: {
      ...defaultTheme.colors,
      // brand
      primary: "#4FAEE3",
      primary15: "#4FAEE326",
      secondary: "#FAB308",
      secondary15: "#FAB30826",
      terciary: "#DBA2A3",
      terciary15: "#DBA2A326",
      // general
      background: "#F2F2F2",
      text: General.black,
      // grays
      gray5: `${General.black}0C`,
      gray15: `${General.black}26`,
      gray25: `${General.black}3F`,
      gray35: `${General.black}59`,
    },
  });

  return { sallet, hulabaluza, ultraMusic, ethArg };
}
