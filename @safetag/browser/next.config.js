/* eslint-disable */
const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8')
)

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {}
}

module.exports = withLess({
  webpack: (config, options) => {
    const { isServer } = options

    config.module.rules.push({
      test: /\.(ico|gif|png|jpe?g|svg)$/,
      loaders: [
        {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            // outputPath: '../',
            // name(file) {
            //   console.log('file', file)
            //   console.log('fs.existsSync(file)', fs.existsSync(file))
            //   if (!fs.existsSync(file)) return ''
            //
            //   return '../[path][name].[ext]'
            // },
            context: '.',
            // outputPath: url => {
            //   console.log('outputPath.url', url)
            //   // `resourcePath` is original absolute path to asset
            //   // `context` is directory where stored asset (`rootContext`) or `context` option
            //
            //   // To get relative path you can use
            //   // const relativePath = path.relative(context, resourcePath);
            //   //
            //   // if (/my-custom-image\.png/.test(resourcePath)) {
            //   //   return `other_public_path/${url}`
            //   // }
            //   //
            //   // if (/images/.test(context)) {
            //   //   return `image_output_path/${url}`
            //   // }
            //
            //   return `static/${url}`
            // },
          },
        },
      ],
    })

    // config.module.rules.push({ test: /\.svg$/, use: ['url-loader'] })

    // config.module.rules.push({
    //   test: /\.(jpe?g|png|svg|gif|ico|webp)$/,
    //   use: [
    //     {
    //       loader: 'url-loader',
    //       options: {
    //         limit: config.inlineImageLimit,
    //         fallback: 'file-loader',
    //         publicPath: `${config.assetPrefix}/_next/static/images/`,
    //         outputPath: `${isServer ? '../' : ''}static/images/`,
    //         name: '[name]-[hash].[ext]',
    //       },
    //     },
    //   ],
    // })

    config.module.rules.push({
      test: /\.html/,
      use: [
        {
          loader: 'html-loader',
          options: {
            minimize: true,
            removeComments: true,
            // Deal with images on the client side
            attrs: false,
          },
        },
      ],
    })

    config.resolve.symlinks = true

    // config.resolve.alias = {
    //   ...config.resolve.alias,
    //   images: path.resolve(__dirname, '../images'),
    // }
    // console.log('config.resolve.alias', config.resolve.alias)

    // RegExp.prototype.toJSON = RegExp.prototype.toString
    // console.log('config', JSON.stringify(config, true, 2))
    return config
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables, // make your antd custom effective
  },
})
