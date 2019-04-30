// getTestElement, just the function here, but it's a Cypress command in our codebase
function getTestElement(selector) {
    return cy.get(`[data-testid="${selector}"]`);
}

describe('The Home Page', function() {
    it('Successfully loads', function() {
        cy.visit('/');
        getTestElement("loginButton").click();
        cy.get('input[name=uid]').type("1");
        cy.get('input[name=password]').type(`1{enter}`);
    })
});
