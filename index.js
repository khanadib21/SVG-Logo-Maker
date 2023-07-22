const inquirer = require('inquirer');
const fs = require('fs');
const Shape = require('./lib/shapes.js');
const SVG = require('./lib/svg.js');


const questions = [
  {
    name: "text",
    type: "input",
    message: "Text: Enter upto (3) characters",
  },
  {
    name: "textColor",
    type: "input",
    message: "Enter a text color",
  },
  {
    name: "shapeType",
    type: "list",
    message: "Select a shape for the logo",
    choices: ["circle", "square", "triangle"],
  },
  {
    name: "shapeColor",
    type: "input",
    message: "Enter a shape color",
  },
];

inquirer
  .prompt(questions)
  .then(({ text, textColor, shapeType, shapeColor }) => {
    const svg = new SVG();
    const shape = getShape(shapeType, shapeColor);
    svg.addShape(shape);
    svg.setText(text, textColor);
    svg.saveSvgLogo();
  });

function getShape(shape, color) {
  if (shape === 'circle') {
    return new Shape.Circle(color);
  } else if (shape === 'triangle') {
    return new Shape.Triangle(color);
  } else if (shape === 'square') {
    return new Shape.Square(color);
  }
}
