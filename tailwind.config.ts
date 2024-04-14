import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        "roboto-slab": ["Roboto Slab"],
      },
      colors: {
        rose: "#FFBDBD",
        violet: "#3A1BFF",
        "bleu-ciel": "#0CC4FF",
        jaune: "#FFE700",
        vert: "#00FD93",
        "noir-100": "#010409",
        "noir-80": "#1A1A1A",
        "noir-60": "#111111",
        "jaune-transparent": "#FFE70010",
        "violet-transparent": "#3A1BFF10",
        "vert-transparent": "#00FD9310",
      },
    },
  },
  plugins: [],
};
export default config;
