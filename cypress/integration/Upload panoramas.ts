// npx cypress run --record --key b3d9641c-f47b-4156-8b78-3da59c48be73

import {LoginEditorPage} from '../pages/Login_Editor_pages'
import {TestImagePage} from '../pages/Test_Images_pages'
import {CreateBuildingPage} from '../pages/Create_Building_pages'
import {DatePage} from '../pages/Date_pages'
import {StringPage} from '../pages/String_pages'
import {LanguagePage} from '../pages/Language_pages'

Cypress.on('uncaught:exception', (err, ruunable) => {
    return false;
})

const loginPage = new LoginEditorPage();
const testImages = new TestImagePage();
const createBuilding = new CreateBuildingPage();
const selectDate = new DatePage();
const selectString = new StringPage();
const selectLanguage = new LanguagePage();

describe('test `Upload panoramas` function', () => {
    it('Upload panoramas', () => {

        // login to editor
        loginPage.navigate('https://vreditor.istaging.com/');
        selectLanguage.selectLanguage('EN');
        loginPage.enterUsername('eric_cypress');
        loginPage.enterPassword('000000');
        loginPage.clickLogin();

        // create a new building
        createBuilding.clickTriggerCreateLiveTour();
        createBuilding.enterLiveTourName(selectDate.selectDate('today') + '_' + selectString.selectString('panoramas30'));
        createBuilding.clickEnablePublic(true);
        createBuilding.clickCreateLiveTour();

        // enter `Panoramas` page
        cy.get('.nav > :nth-child(2) > .nav-link').click();


        // upload panoramas
        for( var i = 0; i < 3; i++ ) {

            cy.get('.add-panoramas > :nth-child(1)').click();

            switch(i) {

                case 0:
                    cy.get('#Panoramas')
                        .attachFile(testImages.selectImages(0));
                    break;

                case 1:
                    cy.get('#Panoramas')
                        .attachFile(testImages.selectImages(1));
                    break;

                default:
                    cy.get('#Panoramas')
                        .attachFile(testImages.selectImages(0));

            }

            // wait for attaching finished
            cy.wait(5000);

            if( i == 2 ) {
                cy.get('#use-filename')
                    .click();
            }

            cy.get('[style="background-color: rgba(0, 0, 0, 0.7); position: fixed;"] > .i-modal-inner > .i-form-2 > .flex-center > .row-mbl > .form-group > .buttons-container > .btn')
                .click();

            // wait for uploading finished
            cy.wait(50000);

            // check if uploading successfully finished
            cy.get('.footer > p')
                .should('contain', 'Upload end');

            cy.get('.header > button')
                .click();

            // wait for resizing finished
            cy.wait(5000);
        
        }

        // check panoramas order and category name after uploading finished
        for( var p = 1; p <= 10; p++ ) {

            cy.get(':nth-child('+ p +') > .i-edit-list-category > .i-edit-list-category-text')
                .should('contain', 'test ('+ (11 - p) +')');

        }

        cy.wait(5000);

        // sort panoramas
        cy.get('.i-edit-list-container > :nth-child(1)')
            .move({ deltaX: 0, deltaY: 100, force: true });

        cy.wait(5000);

        // check panoramas order and category name after sorting finished
        cy.get(':nth-child(1) > .i-edit-list-category > .i-edit-list-category-text')
            .should('contain', 'test (9)');

        // check upload limit and hint UI
        cy.get('.add-panoramas > :nth-child(1)').click();

        cy.get('[style="background-color: transparent; position: fixed;"] > .i-modal-inner > .modal-content > .modal-content-title')
            .should('contain', 'Pano number limit reached');

        cy.get('[style="background-color: transparent; position: fixed;"] > .i-modal-inner > .modal-content > .modal-content-text')
            .should('contain', "You've reached the maximum number of panoramas allowed in a LiveTour.");

        cy.get('[style="background-color: transparent; position: fixed;"] > .i-modal-inner > .modal-content > .modal-content-buttons > .btn')
            .click();
        
    })
})
