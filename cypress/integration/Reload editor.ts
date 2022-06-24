import { LoginEditorPage } from "../pages/Login_Editor_pages"

Cypress.on('uncaught:exception', (err, ruunable) => {
    return false;
})

const loginPage = new LoginEditorPage();

describe('test if session token went wrong after reloading', ()=> {
    it('reload VR Maker editor after login', ()=> {

        // login to editor
        loginPage.navigate('https://vreditor.istaging.com/');
        loginPage.enterUsername('eric_cypress');
        loginPage.enterPassword('000000');
        loginPage.clickLogin();

        cy.wait(10000);

        cy.reload();

        cy.wait(10000);

        cy.get('.logo')
            .should('be.visible');

    })
})