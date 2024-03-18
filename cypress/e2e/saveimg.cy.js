describe('Saving a Chart to the Gallery', () => {
  it('Saves the chart to the gallery correctly', () => {
    // Visit the line page
    cy.visit('/line.html');

    // Enter chart title
    cy.findByLabelText('Chart title').type('title');

    // Enter x label and y label
    cy.findByLabelText('X label').type('x');
    cy.findByLabelText('Y label').type('y');

    //Enter first set of x and y values
    cy.findAllByLabelText('X').eq(0).type('7');
    cy.findAllByLabelText('Y').eq(0).type('5');

    //Add another set of x and y inputs
    cy.findByText('+').click();
    cy.findAllByLabelText('X').eq(1).type('10')

    // Change the color of the chart
    cy.findByLabelText('Chart color').invoke('val', '#ff448').trigger('change');

    // Click the generate chart button
    cy.findByText('Generate chart').click();

    // Click the save chart button
    cy.findByText('Save chart').click();

    // Navigate to the gallery
    cy.findByText('Gallery').click();

    // Check that the title of the chart exists in the library
    cy.contains('title').should('exist');
  });
});
