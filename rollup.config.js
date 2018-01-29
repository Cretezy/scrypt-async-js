import babel from "rollup-plugin-babel";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/cjs/index.js",
      format: "cjs"
    },
    {
      file: "dist/es/index.js",
      format: "es"
    },
    {
      file: "dist/browser/index.js",
      format: "iife",
      name: "scrypt"
    }
  ],
  plugins: [
    babel({
      presets: [
        [
          "@babel/preset-env",
          {
            modules: false
          }
        ]
      ],
      babelrc: false
    })
  ]
};
