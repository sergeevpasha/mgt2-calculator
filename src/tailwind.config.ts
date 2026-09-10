import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
  theme: {
    // The layout is desktop-first: base classes target wide screens and the max-* variants step down,
    // e.g. `max-lg:` applies at 1150px and below and `max-sm:` at 600px and below.
    screens: {
      xs: '361px',
      sm: '601px',
      md: '921px',
      lg: '1151px',
      xl: '1440px',
    },
    extend: {
      colors: {
        paper: '#f4f6f9',
        surface: '#ffffff',
        ink: '#273449',
        muted: '#718096',
        line: '#e5e9f0',
        accent: {
          DEFAULT: '#4268c6',
          soft: '#eef3ff',
          100: '#e1eaff',
          150: '#dfe7f6',
          200: '#d2def5',
          300: '#b9cbef',
          400: '#7596df',
          500: '#6587da',
          700: '#365cb5',
        },
        denim: {
          300: '#8a9ec5',
          350: '#889bb9',
          400: '#7893bd',
          500: '#6a82b7',
          600: '#526fa9',
          700: '#4667ac',
          800: '#344e83',
        },
        steel: {
          50: '#f9fafc',
          100: '#f5f7fa',
          150: '#f1f4f9',
          200: '#edf1f7',
          250: '#e8edf6',
          300: '#e0e6ef',
          350: '#dce3ed',
          400: '#cad4e4',
          500: '#a1adc0',
          550: '#95a5be',
          600: '#8e9eb7',
          650: '#8b98ab',
          700: '#8090a5',
          800: '#64758c',
          850: '#5e6d83',
          900: '#52647d',
        },
        danger: {
          DEFAULT: '#aa4939',
          soft: '#fbeee8',
        },
      },
      fontFamily: {
        sans: ['"Avenir Next"', 'Avenir', '"Segoe UI"', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      boxShadow: {
        panel: '0 3px 6px #27332f02',
        card: '0 4px 18px #26365005',
        button: '0 3px 8px #4268c620',
      },
      backgroundImage: {
        chevron:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%238b9bb3'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        loading: {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(350%)' },
        },
      },
      animation: {
        loading: 'loading 1.2s ease-in-out infinite',
      },
      transitionDuration: {
        DEFAULT: '160ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease',
      },
    },
  },
};
