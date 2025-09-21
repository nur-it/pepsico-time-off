module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        primary: '#EA6608',
        secondary: '#FF0C46',
        purple: '#8D1B81',
        success: '#2BC083',
        teal: '#00A38C', 
        info: '#01A0D2',
        dark: '#2B2D41',
        gray: {
          100: '#E9E9EB',
          200: '#D4D6D9'
        }
      },
      fontFamily: {
        'proxima': ['Proxima Nova', 'sans-serif']
      },
      fontSize: {
        'h1': ['36px', '25px'],
        'h2': ['24px', '18px'], 
        'h3': ['20px', '14px'],
        'body': ['20px', '14px'],
        'body-sm': ['18px', '12px'],
        'caption': ['14px', '10px']
      }
    }
  }
}