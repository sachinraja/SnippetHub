module.exports = {
  mode: 'jit',
  darkMode: false,
  /* eslint-disable-next-line global-require */
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
  purge: {
    content: [
      './src/components/**/*.{js,ts,jsx,tsx}',
      './src/layouts/**/*.{js,ts,jsx,tsx}',
      './src/pages/**/*.{js,ts,jsx,tsx}',
      './safelist.txt',
    ],
    options: {
      // prevent purging of dynamic class names
      safelist: [/^text-.+?-(4|6)0{2}/, /^text-\d?xl/, /^border-.+?-50{2}/],
    },
  },
  // or 'media' or 'class'
  theme: {
    extend: {
      borderWidth: {
        1: '1px',
      },
      colors: {
        carbon: {
          100: '#dcdcdc',
          200: '#bebebe',
          300: '#a4a4a4',
          400: '#8c8c8c',
          50: '#f3f3f3',
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
      }),
    },
  },
}
