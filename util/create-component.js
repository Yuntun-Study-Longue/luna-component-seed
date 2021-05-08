require("colors");
const fs = require("fs");
const templates = require("./templates");

const componentName = process.argv[2];

if (!componentName) {
  console.error("Please supply a valid component name".red);
  process.exit(1);
}

console.log("Creating Component Templates with name: " + componentName);

const componentDirectory = `./src/components/${componentName}`;
const storyDirectory = `./src/stories`;

if (fs.existsSync(componentDirectory)) {
  console.error(`Component ${componentName} already exists.`.red);
  process.exit(1);
}

fs.mkdirSync(componentDirectory);

const generatedTemplates = templates.map((template) => template(componentName));

generatedTemplates.forEach((template) => {
  if (template.extension === '.stories.js') {
    fs.writeFileSync(
    `${storyDirectory}/${componentName}${template.extension}`,
    template.content
    );
  }
  else if (template.extension === '.js') {
    fs.writeFileSync(
    `${componentDirectory}/index${template.extension}`,
    template.content
    );
  }
  else {
    fs.writeFileSync(
    `${componentDirectory}/${componentName}${template.extension}`,
    template.content
    );
  }
});

console.log(
  "Successfully created component under: " + componentDirectory.green
);