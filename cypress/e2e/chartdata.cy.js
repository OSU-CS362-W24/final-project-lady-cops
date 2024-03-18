describe('Chart Data Test', () => {
  it('Chart data is maintained across pages', () => {
    //Visit the line page
    cy.visit('/line.html');

    //Enter the chart title
    cy.findByLabelText('Chart title').type('title');

    //Enter the x and y labels
    cy.findByLabelText('X label').type('x');
    cy.findByLabelText('Y label').type('y');

    //Enter first set of x and y values
    cy.findAllByLabelText('X').eq(0).type('7');
    cy.findAllByLabelText('Y').eq(0).type('5');

    //Add another set of x and y inputs
    cy.findByText('+').click();
    cy.findAllByLabelText('X').eq(1).type('10');
    cy.findAllByLabelText('Y').eq(1).type('8');

    // Change the color of the chart
    cy.findByLabelText('Chart color').invoke('val', '#000000').trigger('change');

    cy.findByText('Generate chart').click();

    //Navigate to the Scatter page
    cy.findByText('Scatter').click();

    //Click the generate button
    cy.findByText('Generate chart').click();

    //Check that the chart is visible
    cy.findByTestId('chart-image').should('exist').should('be.visible');

    //Check that the chart title is maintained
    cy.findByLabelText('Chart title').should('have.value', 'title');
    
    //Check that the x and y labels are correct
    cy.findByLabelText('X label').should('have.value', 'x');
    cy.findByLabelText('Y label').should('have.value', 'y');

    //Check x and y values
    cy.findAllByLabelText('X').eq(0).should('have.value', '7');
    cy.findAllByLabelText('Y').eq(0).should('have.value', '5');

    cy.findAllByLabelText('X').eq(1).should('have.value', '10');
    cy.findAllByLabelText('Y').eq(1).should('have.value', '8');
  });
});
