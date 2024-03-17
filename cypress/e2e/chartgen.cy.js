describe('Chart Generation Test', () => {
  it('Generates chart correctly', () => {
    //Visit the line page
    cy.visit('/line.html');

    //Enter chart title
    cy.get('#chart-title-input').type('title')
    //Enter x label and y label
    cy.get('#x-label-input').type('x');
    cy.get('#y-label-input').type('y');

    //Enter x and y values
    cy.get('[data-testid="x-input"]').type('7');
    cy.get('[data-testid="y-input"]').type('5');

    //Click the generate chart button
    cy.get('#generate-chart-btn').click();

    //Check that the chart is visible
    cy.get('#chart-display img').should('be.visible');
  });
});
