describe('Chart Data Test', () => {
  it('Chart data is maintained across pages', () => {
    //visit the line page
    cy.visit('/line.html');

    //Enter the chart title
    cy.get('#chart-title-input').type('title')
    //Enter the x and y labels
    cy.get('#x-label-input').type('x');
    cy.get('#y-label-input').type('y');

    //Enter the x and y values 
    cy.get('[data-testid="x-input"]').type('7');
    cy.get('[data-testid="y-input"]').type('5');
    cy.get('#generate-chart-btn').click();

    //Navigate to the Scatter page
    cy.get('nav').contains('Scatter').click();
    //click the generate button
    cy.get('#generate-chart-btn').click();

    //Check that the chart is visible
    cy.get('#chart-display img').should('be.visible');
    //Check that the chart title is maintained
    cy.get('#chart-title-input').should('have.value', 'title');

    //check x and y values
    cy.get('[data-testid="x-input"]').eq(0).should('have.value', '7');
    cy.get('[data-testid="y-input"]').eq(0).should('have.value', '5');
  });
});
