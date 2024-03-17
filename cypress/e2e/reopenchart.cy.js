describe('Re-opening a Saved Chart from the Gallery', () => {
  it('Re-opens a saved chart correctly', () => {
    //Visit the line page
    cy.visit('/line.html');

    //Enter chart title
    cy.get('#chart-title-input').type('title');
    //Enter the x and y labels
    cy.get('#x-label-input').type('x');
    cy.get('#y-label-input').type('y');

    //Enter x and y values
    cy.get('[data-testid="x-input"]').type('7');
    cy.get('[data-testid="y-input"]').type('5');

    //Click the generate chart button
    cy.get('#generate-chart-btn').click();

    //Click the save chart button
    cy.get('#save-chart-btn').click();

    //Navigate to the gallery page
    cy.get('nav').contains('Gallery').click();

    //Click on the saved chart in the gallery
    cy.contains('title').click();

    //Check that the chart page is opened with the saved chart's data displayed
    cy.url().should('include', '/line.html');
    //check title
    cy.get('#chart-title-input').should('have.value', 'title');
    //check x and y inputs
    cy.get('#x-label-input').should('have.value', 'x');
    cy.get('#y-label-input').should('have.value', 'y');

    //check x and y values
    cy.get('[data-testid="x-input"]').eq(0).should('have.value', '7');
    cy.get('[data-testid="y-input"]').eq(0).should('have.value', '5');

    //Check that the chart is visible
    cy.get('#chart-display img').should('be.visible');
  });
});
