module.exports = {
  theme: {
    extend: {
      spacing: {
        page: '1200px',
        header: '50px',
        aside: '300px',
      },
    },
  },
  variants: {
    borderWidth: ['responsive', 'first'],
  },
  plugins: [
    require('@tailwindcss/ui'),
  ],
}
