import {LoginEditorPage} from '../pages/Login_Editor_pages'
import {LanguagePage} from '../pages/Language_pages'

Cypress.on('uncaught:exception', (err, ruunable) => {
    return false;
})

const loginPage = new LoginEditorPage();
const selectLanguage = new LanguagePage();

describe('test `copy LiveTour` function', ()=> {
    it('copy the latest Livetour', () => {

        // login to editor
        loginPage.navigate('https://vreditor.istaging.com/');
        selectLanguage.selectLanguage('EN');
        loginPage.enterUsername('eric_cypress');
        loginPage.enterPassword('000000');
        loginPage.clickLogin();

        // choose the latest LiveTour
        cy.get('.i-dropdown-2 > .btn')
            .click();

        cy.get('.dropdown-menu > :nth-child(5)')
            .click();

        cy.get('#buildingsList_0 > .i-list-router')
            .click();

        cy.wait(5000);

        // test copy function
        cy.get('.btn-group > :nth-child(4)')
        .click();

        cy.get('[style="background-color: rgba(0, 0, 0, 0.7); position: fixed;"] > .i-modal-inner > .i-form-2 > .flex-wrap > :nth-child(1) > .form-group > :nth-child(2) > .form-control')
            .type('eric@staging.com.tw');

        cy.get('[style="background-color: rgba(0, 0, 0, 0.7); position: fixed;"] > .i-modal-inner > .i-form-2 > .flex-wrap > .row-mbl > .form-group > .buttons-container > .btn')
            .click();

        cy.get('.i-alert-text')
            .should('contain', 'Duplicated successfully');

    })
})