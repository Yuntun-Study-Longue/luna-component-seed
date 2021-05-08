module.exports = (componentName) => ({
    content: `// Generated with util/create-component.js
  import React from "react";
  import "./${componentName}.scss";

  const ${componentName} = ({ foo }) => (
      <div data-testid="${componentName}" className="foo-bar">{foo}</div>
  );
  
  export default ${componentName};
  `,
    extension: `.js`
  });