module.exports = (componentName) => ({
    content: `// Generated with util/create-component.js
  import React from "react";
  import ${componentName} from "../components/${componentName}";

  export default {
      title: "Example/${componentName}",
      component: ${componentName},
  };

  const Template = (args) => <${componentName} {...args} />;

  export const WithBar = Template.bind({});
  WithBar.args = {
    foo: "bar",
  };
  export const WithBaz = Template.bind({});
  WithBaz.args = {
    foo: "baz",
  };
  `,
    extension: `.stories.js`
  });