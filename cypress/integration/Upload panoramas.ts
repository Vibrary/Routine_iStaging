// npx cypress run --record --key b3d9641c-f47b-4156-8b78-3da59c48be73

Cypress.on('uncaught:exception', (err, ruunable) => {
    return false;
})

it('Editor login', () => {

    cy.visit('https://vreditor.istaging.com/');

    // login to editor
    cy.get(':nth-child(1) > :nth-child(2) > .form-control').type('eric@staging.com.tw');
    cy.get(':nth-child(2) > :nth-child(2) > .form-control').type('000000');

    cy.get('.btn').click();

    // create a new building
    cy.get('#buildingsCreateBuildingButton')
        .click();

    cy.get('.i-input')
        .type('2022-03-18');

    cy.get('.i-switch-track')
        .click();

    cy.get('.submit-btn')
        .click();

    // enter `Panoramas` page
    cy.get('.nav > :nth-child(2) > .nav-link').click();


    // upload panoramas
    for( var i = 0; i < 3; i++ ) {

        cy.get('.add-panoramas > :nth-child(1)').click();

        cy.get('#Panoramas')
            .attachFile(['test (1).jpg',
                        'test (2).jpg',
                        'test (3).jpg',
                        'test (4).jpg',
                        'test (5).jpg',
                        'test (6).jpg',
                        'test (7).jpg',
                        'test (8).jpg',
                        'test (9).jpg',
                        'test (10).jpg',]);

        // wait for attaching finished
        cy.wait(5000);

        cy.get('[style="background-color: rgba(0, 0, 0, 0.7); position: fixed;"] > .i-modal-inner > .i-form-2 > .flex-center > .row-mbl > .form-group > .buttons-container > .btn')
            .click();

        // wait for uploading finished
        cy.wait(20000);

        // check if uploading successfully finished
        cy.get('.footer > p')
            .should('contain', '上傳結束')

        cy.get('.header > button')
            .click();
    
    }
})