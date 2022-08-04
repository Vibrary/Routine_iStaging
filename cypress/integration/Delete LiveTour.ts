import {LoginEditorPage} from '../pages/Login_Editor_pages'
import {LanguagePage} from '../pages/Language_pages'

Cypress.on('uncaught:exception', (err, ruunable) => {
    return false;
})

const loginPage = new LoginEditorPage();
const selectLanguage = new LanguagePage();

describe('test `delete LiveTour` function', () => {
    it('delete the latest LiveTour', () => {

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

        // Be careful with this option {force : true}. It's possible to force your tests to pass when the element is actually not interactable in your application.
        // Because `realHover` is not support in Firefox, so we can use {force : true} to excute delete function for now.
        
            cy.get('#buildingsList_0')
                .contains('Delete')
                .click({force : true});
        

    /*    // test delete LiveTour function
        cy.contains('刪除')
            .should('not.be.visible')

        // realHover can only use in chromium browser
        cy.get('#buildingsList_0')
            .realHover();

        cy.contains('刪除')
            .should('be.visible')
            .click();*/

        cy.get('[style="background-color: transparent; position: fixed;"] > .i-modal-inner > .modal-content > .modal-content-buttons > .btn-primary')
            .click();
        
        cy.get('.i-alert-text')
            .should('contain', 'Deleted successfully');

    })
})