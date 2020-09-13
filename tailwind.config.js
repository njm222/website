module.exports = {
  purge: ['./src/**/*.html', './pages/**/*.js', './components/**/*.js'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      black: '#000',
      white: '#fff',
      milk: '#f2f2f2',
      gray: '#ccc',
    },
  },
};
