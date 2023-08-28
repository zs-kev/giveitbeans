import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        lightpattern: "url('/assets/images/lightbg.jpeg')",
        darkpattern: "url('/assets/images/darkbg.jpeg')",
      },
      color: {
        transparent: 'transparent',
        current: 'currentColor',
        white: 'hsla(0, 0%, 100%, 1)',
        black: 'hsla(0, 0%, 0%, 1)',
        primary: 'hsla(224, 85%, 8%, 1)',
        secondary: 'hsla(213, 100%, 55%, 1)',
        tertiary: 'hsla(214, 8%, 50%, 1)',
        SecondaryHover: 'hsla(213, 100%, 47%, 1)',
      },
      fontFamily: {
        Zilla: ['Zilla Slab', 'serif'],
        Guy: ['Luckiest Guy', 'cursive'],
      },
    },
  },
  plugins: [],
};
export default config;
