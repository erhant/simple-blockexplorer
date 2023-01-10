module.exports = {
  ...require("gts/.prettierrc.json"),
  printWidth: 120,
  // SCSS configurations
  overrides: [
    {
      files: "*.scss",
      options: {
        tabWidth: 2,
      },
    },
  ],
};
