const fs = require('fs');
const SVG = require('./svg');

describe('SVG', () => {
  describe('addShape', () => {
    test('addShape method should add a shape to the shapes array', () => {
      const svg = new SVG(); 
      const shape = { render: jest.fn() };
      svg.addShape(shape); 

      expect(svg.shapes).toContain(shape); 
    });
  });
});


describe('SVG', () => {
  describe('saveSvgLogo', () => {
    test('check the save logo method', () => {
      const svg = new SVG(); 

      const writeFileSpy = jest.spyOn(fs, 'writeFileSync');
      const consoleLogSpy = jest.spyOn(console, 'log');

      svg.createSvgLogo();
      svg.saveSvgLogo();

      expect(writeFileSpy).toHaveBeenCalledWith('logo.svg', expect.any(String));
      expect(consoleLogSpy).toHaveBeenCalledWith('Generated logo.svg');

      // Clean up the spies
      writeFileSpy.mockRestore();
      consoleLogSpy.mockRestore();
    });
  });
});

describe('SVG', () => {
  describe('setText', () => {
    test('setText method should take only 3 characters', () => {
      const svg = new SVG();
      const longMessage = 'Enter text for the logo. (Must not be more than 3 characters.)';
      const expectedErrorMessage = 'Must not be more than 3 characters.';

      svg.setText(longMessage, 'blue');

      expect(svg.textElement).toContain(expectedErrorMessage);
    });

    test('setText method should not show an error message for a short message input', () => {
      const svg = new SVG();
      const shortMessage = 'Hi';

      svg.setText(shortMessage, 'green');

      expect(svg.textElement).not.toContain('Must not be more than 3 characters.');
    });
  });
});

describe('SVG', () => {
  describe('createSvgLogo', () => {
    test('should generate SVG content', () => {
      const svg = new SVG();
      const shape1 = { render: jest.fn(() => '<circle cx="50" cy="50" r="40" fill="red" />') };
      const shape2 = { render: jest.fn(() => '<rect x="20" y="20" width="100" height="100" fill="blue" />') };
      svg.addShape(shape1);
      svg.addShape(shape2);
      const textElement = '<text x="150" y="120" font-size="40" text-anchor="middle" fill="green">Hi</text>';
      svg.textElement = textElement;
      const expectedSVGContent = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">\n${shape1.render()}\n${shape2.render()}\n${textElement}\n</svg>`;
      const generatedSVGContent = svg.createSvgLogo();

      expect(generatedSVGContent).toEqual(expectedSVGContent);
    });
  });
});
