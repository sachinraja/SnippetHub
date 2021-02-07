module.exports = {
  purge: {
    content: [
      './src/components/**/*.{js,ts,jsx,tsx}', 
      './src/pages/**/*.{js,ts,jsx,tsx}'
  ],
    options: {
      //prevent purging of dynamic class names
      safelist: [/^text-.+?-(4|6)0{2}/, /^border-.+?-50{2}/]
    }
  },

  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'inter' : ['Inter', 'Montserrat', 'Helvetica', 'Arial', 'sans-serif']
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
      borderWidth: {
        '1' : '1px'
      }
    }
  },
  variants: {
    extend: {
      transform: ['motion-reduce']
    },
  },
  plugins: [],
}
