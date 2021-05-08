module.exports = (componentName) => ({
    content: `// Generated with util/create-component.js
  import React from "react";
  import ${componentName} from "../components/${componentName}";

  export default {
      title: "Example/${componentName}",
      component: ${componentName},
  };

  export const WithBar = () => <${componentName} foo="bar" />;
  export const WithBaz = () => <${componentName} foo="baz" />;
  `,
    extension: `.stories.js`
  });