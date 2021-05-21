// Generated with util/create-component.js
  import React from "react";
  import TreeLinks from "../components/TreeLinks";
  import data from "../components/TreeLinks/treedata.json"

  export default {
      title: "Example/TreeLinks",
      component: TreeLinks,
  };

  const Template = (args) => <TreeLinks {...args} />;

  export const WithBar = Template.bind({});
  WithBar.args = {
    data,
    config: {}
  };
  export const WithBaz = Template.bind({});
  WithBaz.args = {
    data: {},
    config: {}
  };
  