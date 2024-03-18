describe('Chart Generation Test', () => {
  it('Generates chart correctly', () => {
    // Visit the line page
    cy.visit('/line.html');

    // Enter chart title
    cy.findByLabelText('Chart title').type('title');

    // Enter x label and y label
    cy.findByLabelText('X label').type('x');
    cy.findByLabelText('Y label').type('y');

    // Enter first set of x and y values
    cy.findAllByLabelText('X').eq(0).type('7');
    cy.findAllByLabelText('Y').eq(0).type('5');

    // Add another set of x and y inputs
    cy.findByText('+').click();
    cy.findAllByLabelText('X').eq(1).type('10');
    cy.findAllByLabelText('Y').eq(1).type('8');

    // Change the color of the chart
    cy.findByLabelText('Chart color').invoke('val', '#ff448').trigger('change');

    // Click the generate chart button
    cy.findByText('Generate chart').click();

    //Check that the chart is visible
    cy.findByTestId('chart-image').should('exist').should('be.visible');
  });
});
