describe('Saving a Chart to the Gallery', () => {
  it('Saves the chart to the gallery correctly', () => {
    //Visit the line page
    cy.visit('/line.html');

    //Enter chart title
    cy.get('#chart-title-input').type('title');
    //Enter x label and y label
    cy.get('#x-label-input').type('x');
    cy.get('#y-label-input').type('y');

    //Enter x and y values
    cy.get('[data-testid="x-input"]').type('7');
    cy.get('[data-testid="y-input"]').type('5');

    //Click the generate chart button
    cy.get('#generate-chart-btn').click();

    //Click the save chart button
    cy.get('#save-chart-btn').click();

    //Navigate to the gallery
    cy.get('nav').contains('Gallery').click();

    //Check that the title of the chart exists in the library
    cy.contains('title').should('exist');
  });
});
