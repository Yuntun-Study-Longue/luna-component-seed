// Generated with util/create-component.js
  import React from "react";
  import Test from "../components/Test";

  export default {
      title: "Example/Test",
      component: Test,
  };

  const Template = (args) => <Test {...args} />;

  export const WithBar = Template.bind({});
  WithBar.args = {
    foo: "bar",
  };
  export const WithBaz = Template.bind({});
  WithBaz.args = {
    foo: "baz",
  };