const { Circle, Triangle, Square } = require('./shapes.js');

describe('Shape Classes', () => {
  test('Circle should render a circle with the specified color', () => {
    const circle = new Circle('red');
    const circleSvg = circle.render();
    expect(circleSvg).toContain('<circle');
    expect(circleSvg).toContain('fill="red"');
  });

  test('Triangle should render a triangle with the specified color', () => {
    const triangle = new Triangle('blue');
    const triangleSvg = triangle.render();
    const expectedColor = 'blue';
    expect(triangleSvg).toContain('<polygon');
    expect(triangleSvg).toContain(`fill="${expectedColor}"`);
  });

  test('Square should render a square with the specified color', () => {
    const square = new Square('green');
    const squareSvg = square.render();
    const expectedColor = 'green';
    expect(squareSvg).toContain('<rect');
    expect(squareSvg).toContain(`fill="${expectedColor}"`);
  });
});

console.log('All tests passed!');
