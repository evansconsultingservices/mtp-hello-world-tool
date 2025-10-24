const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add Module Federation plugin to expose this app
      webpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: "helloWorld",
          filename: "remoteEntry.js",
          exposes: {
            // Expose the main app component
            "./App": "./src/App",
            // Could also expose individual components
            "./HelloWorldTool": "./src/App",
          },
          shared: {
            ...deps,
            react: {
              singleton: true,
              requiredVersion: deps.react,
            },
            "react-dom": {
              singleton: true,
              requiredVersion: deps["react-dom"],
            },
            "react-router-dom": {
              singleton: true,
              requiredVersion: deps["react-router-dom"],
            },
            // Share shadcn components
            "class-variance-authority": {
              singleton: true,
              requiredVersion: deps["class-variance-authority"],
            },
            "clsx": {
              singleton: true,
              requiredVersion: deps.clsx,
            },
            "tailwind-merge": {
              singleton: true,
              requiredVersion: deps["tailwind-merge"],
            },
          },
        })
      );

      // Fix for Module Federation
      webpackConfig.output.publicPath = "auto";

      // Disable runtime chunk for proper federation
      webpackConfig.optimization.runtimeChunk = false;

      return webpackConfig;
    },
  },
  devServer: {
    port: 3001,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  }
};