
Cypress.on('uncaught:exception', (err, ruunable) => {
    return false;
})

describe('test `copy LiveTour` function', ()=> {
    it('copy the latest Livetour', () => {

        cy.visit('https://vreditor.istaging.com/');

        // login to editor
        cy.get(':nth-child(1) > :nth-child(2) > .form-control').type('eric@staging.com.tw');
        cy.get(':nth-child(2) > :nth-child(2) > .form-control').type('000000');

        cy.get('.btn').click();

        cy.wait(5000);

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
            .should('contain', '複製成功');

    })
})