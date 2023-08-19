import { AllThemes } from "src/types/useTheme";
import { ReturnUseTemplate } from "src/types/useTemplate";
import { useEffect } from "react";
import { useTheme } from "./useTheme";
import { useParam } from "./useParam";
import { useLocalStorage } from "./useLocalStorage";

/**
 * @function useTemplate
 * @description Hook para obtener el template actual
 * @returns {ReturnUseTemplate} Retorna el template actual
 */
export function useTemplate(): ReturnUseTemplate {
  const { theme } = useParam();
  const { sallet, hulabaluza, ultraMusic, ethArg } = useTheme();

  const currentTheme =
    theme === undefined || theme === null || theme === ""
      ? "sallet"
      : theme !== undefined && theme !== null && theme !== ""
      ? theme
      : "sallet";

  const allThemes: AllThemes = {
    sallet: {
      name: "Sallet",
      logo: "/img/logos/sallet.svg",
      background: "/img/backgrounds/sallet.png",
      theme: sallet,
    },
    hulabaluza: {
      name: "Hulabaluza",
      logo: "/img/logos/hulabaluza.png",
      background: "/img/backgrounds/lolapalusa.png",
      theme: hulabaluza,
    },
    ultraMusic: {
      name: "Ultra Music",
      logo: "/img/logos/ultraMusic.png",
      background: "/img/backgrounds/ultraMusic.png",
      theme: ultraMusic,
    },
    ethArg: {
      name: "Ethereum Argentina",
      logo: "/img/logos/eth-arg.png",
      background: "/img/backgrounds/ultraMusic.png",
      theme: ethArg,
    },
  };

  const [storedTheme, setStoredTheme] = useLocalStorage<string>("theme");
  useEffect(() => {
    if (
      storedTheme === undefined ||
      storedTheme === null ||
      storedTheme === ""
    ) {
      if (theme === "sallet") {
        setStoredTheme(currentTheme);
      }

      if (theme === "hulabaluza") {
        setStoredTheme(currentTheme);
      }

      if (theme === "ultraMusic") {
        setStoredTheme(currentTheme);
      }

      if (theme === "ethArg") {
        setStoredTheme(currentTheme);
      }
    }

    if (storedTheme !== theme) {
      setStoredTheme(currentTheme);
    }
  }, [storedTheme, currentTheme]);

  /**
   * @function myTheme
   * @description Restorna el tema actual
   * @returns {string} myTheme
   */
  const myTheme = (): string => {
    if (storedTheme === undefined || storedTheme === null || storedTheme === "")
      return "sallet";

    if (storedTheme !== undefined && storedTheme !== null && storedTheme !== "")
      return storedTheme;

    return "sallet";
  };

  /**
   * @constant name
   * @type {string}
   * @description Nombre del template actual
   */
  const name: string = allThemes[myTheme()]?.name ?? allThemes["sallet"].name;

  /**
   * @constant logo
   * @type {string}
   * @description Logo del template actual
   */
  const logo: string = allThemes[myTheme()]?.logo ?? allThemes["sallet"].logo;

  /**
   * @constant background
   * @type {string | undefined}
   * @description Imágen del background del dashboard del template actual
   */
  const background: string | undefined =
    allThemes[myTheme()]?.background ?? allThemes["sallet"].background;

  /**
   * @constant theme
   * @description Tema de la librería chakra-ui para el template actual
   */
  const chakraTheme = allThemes[myTheme()]?.theme ?? allThemes["sallet"].theme;

  return { name, logo, background, chakraTheme };
}
