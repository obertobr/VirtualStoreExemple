module.exports = {
  siteMetadata: {
    title: `Minimalist 3D Arts`,
    description: `Alguns podem pensar que é apenas uma loja, mas é muito mais que isso, é uma realce para sua vida, nossas artes faram você mudar totalmente o que você entende com o sentido da vida.`,
    author: `@obertobr`,
    siteUrl: `https://minimalist-3d-arts.herokuapp.com/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Minimalist 3D Arts`,
        short_name: `3D Arts`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#000000`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
  ],
}
