import addCustomDataAttribute from "./rules/add-custom-data-attribute.js";

export default {
  meta: {
    name: "eslint-plugin-react-data-attribute",
    version: "1.0.0",
  },
  rules: {
    "add-component-data-attribute": addCustomDataAttribute,
  },
  configs: {
    recommended: {
      plugins: ["react-data-attribute"],
      rules: {
        "react-data-attribute/add-component-data-attribute": "error",
      },
    },
  },
};
