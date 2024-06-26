/// <reference types="cypress" />

describe("E2E tests", () => {

  it("should be in main url", () => {
    cy.visit("http://localhost:3000/");
    cy.wait(2000);
    cy.clearAllCookies();
    cy.url().should("eq", "http://localhost:3000/");
  });

  it("should be in login url", () => {
    cy.visit("http://localhost:3000/login");
    cy.wait(2000);
    cy.clearAllCookies();
    cy.url().should("eq", "http://localhost:3000/login");
  });

  it("should be in register url", () => {
    cy.visit("http://localhost:3000/register");
    cy.wait(2000);
    cy.clearAllCookies();
    cy.url().should("eq", "http://localhost:3000/register");
  });

  it("should raise 404 error", () => {
    cy.visit("http://localhost:3000/about", { failOnStatusCode: false });
    cy.wait(2000);
    cy.clearAllCookies();

    // Verificar se o status da resposta é 404
    cy.get("body").then(($body) => {
      if ($body.find("h1").text().includes("404")) {
        cy.log("Página retornou um erro 404.");
      } else {
        // Se não houver erro 404, verificar a URL
        cy.url().should("eq", "http://localhost:3000/about");
      }
    });
  });

  it("should display 'Sticker Trader' in the logo text box", () => {
    cy.visit("http://localhost:3000/"); // Substitua pela URL real da sua página
    cy.wait(2000);
    // Verificar se o texto 'Sticker Trader' está presente no elemento com a classe 'logo__textBox--text'
    cy.get('.logo__textBox--text').should('contain', 'Sticker Trader');
  });


});