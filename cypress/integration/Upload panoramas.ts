// npx cypress run --record --key b3d9641c-f47b-4156-8b78-3da59c48be73

Cypress.on('uncaught:exception', (err, ruunable) => {
    return false;
})

it('Upload panoramas', () => {

    cy.visit('https://vreditor.istaging.com/');

    // login to editor
    cy.get(':nth-child(1) > :nth-child(2) > .form-control').type('eric@staging.com.tw');
    cy.get(':nth-child(2) > :nth-child(2) > .form-control').type('000000');

    cy.get('.btn').click();

    cy.wait(5000);

    // create a new building
    cy.get('#buildingsCreateBuildingButton')
        .click();

    cy.get('.i-input')
        .type('2022-03-21');

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

        if( i == 2 ) {
            cy.get('#use-filename')
                .click();
        }

        cy.get('[style="background-color: rgba(0, 0, 0, 0.7); position: fixed;"] > .i-modal-inner > .i-form-2 > .flex-center > .row-mbl > .form-group > .buttons-container > .btn')
            .click();

        // wait for uploading finished
        cy.wait(20000);

        // check if uploading successfully finished
        cy.get('.footer > p', {timeout : ( 10000 * i )})
            .should('contain', '上傳結束');

        cy.get('.header > button')
            .click();
    
    }

    // check panoramas order and category name
    for( var p = 1; p <= 10; p++ ) {

        cy.get(':nth-child('+ p +') > .i-edit-list-category > .i-edit-list-category-text')
            .should('contain', 'test ('+ (11 - p) +')');

    }

    // check upload limit and hint UI
    cy.get('.add-panoramas > :nth-child(1)').click();

    cy.get('[style="background-color: transparent; position: fixed;"] > .i-modal-inner > .modal-content > .modal-content-title')
        .should('contain', '全景圖數量已達上限');

    cy.get('[style="background-color: transparent; position: fixed;"] > .i-modal-inner > .modal-content > .modal-content-text')
        .should('contain', '全景圖數量已滿');

    cy.get('[style="background-color: transparent; position: fixed;"] > .i-modal-inner > .modal-content > .modal-content-buttons > .btn')
        .click();

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