/* eslint-disable global-require */
/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  mode: 'jit',
  darkMode: false,
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
  purge: [
    './src/components/**/*.tsx',
    './src/layouts/**/*.tsx',
    './src/pages/**/*.tsx',
    './safelist.txt',
  ],
  theme: {
    extend: {
      borderWidth: {
        1: '1px',
      },
      colors: {
        carbon: {
          50: '#f3f3f3',
          100: '#dcdcdc',
          200: '#bebebe',
          300: '#a4a4a4',
          400: '#8c8c8c',
          500: '#6f6f6f',
          600: '#565656',
          700: '#3d3d3d',
          800: '#282828',
          900: '#171717',
        },
      },
      fontFamily: {
        inter: ['Inter', 'Montserrat', 'Helvetica', 'Arial', 'sans-serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.carbon.300'),
            p: {
              color: theme('colors.carbon.100'),
            },
            h1: {
              color: theme('colors.carbon.200'),
            },
            h2: {
              color: theme('colors.carbon.200'),
            },
            h3: {
              color: theme('colors.carbon.200'),
            },
            h4: {
              color: theme('colors.carbon.200'),
            },
            h5: {
              color: theme('colors.carbon.200'),
            },
            h6: {
              color: theme('colors.carbon.200'),
            },
            strong: {
              color: theme('colors.carbon.300'),
            },
            a: {
              color: theme('colors.carbon.600'),
            },
            table: {
              textAlign: 'center',
              th: {
                color: theme('colors.carbon.400'),
                borderLeft: '1px solid #FFF',
                borderRight: '1px solid #FFF',
              },
              'th:first-child': {
                borderLeft: 'none',
              },
              'th:last-child': {
                borderRight: 'none',
              },
              td: {
                borderLeft: '1px solid #FFF',
                borderRight: '1px solid #FFF',
              },
              'td:first-child': {
                borderLeft: 'none',
              },
              'td:last-child': {
                borderRight: 'none',
              },
            },
          },
        },

        quoteless: {
          css: {
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
          },
        },
        tight: {
          css: {
            '*': { margin: '0 !important' },
          },
        },
      }),
    },
  },
}
