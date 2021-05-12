// Generated with util/create-component.js
  import React from "react";
  import { render } from "@testing-library/react";
  import TreeLinks from ".";
  describe("Test Component", () => {
    let props;

    beforeEach(() => {
      props = {
        foo: "bar"
      };
    });

    const renderComponent = () => render(<TreeLinks {...props} />);

    it("should render foo text correctly", () => {
      props.foo = "harvey was here";
      const { getByTestId } = renderComponent();
      const component = getByTestId("TreeLinks");
      expect(component).toHaveTextContent("harvey was here");
    });
  });
  