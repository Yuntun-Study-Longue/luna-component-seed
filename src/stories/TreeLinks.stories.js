// Generated with util/create-component.js
  import React from "react";
  import TreeLinks from "../components/TreeLinks";

  export default {
      title: "Example/TreeLinks",
      component: TreeLinks,
  };

  const Template = (args) => <TreeLinks {...args} />;

  export const WithBar = Template.bind({});
  WithBar.args = {
    foo: "bar",
  };
  export const WithBaz = Template.bind({});
  WithBaz.args = {
    foo: "baz",
  };
  