// npx cypress run --record --key b3d9641c-f47b-4156-8b78-3da59c48be73

import {LoginEditorPage} from '../pages/Login_Editor_pages'
import {TestImagePage} from '../pages/Test_Images_pages'
import {CreateBuildingPage} from '../pages/Create_Building_pages'
import {DatePage} from '../pages/Date_pages'
import {StringPage} from '../pages/String_pages'

Cypress.on('uncaught:exception', (err, ruunable) => {
    return false;
})

const loginPage = new LoginEditorPage();
const testImages = new TestImagePage();
const createBuilding = new CreateBuildingPage();
const selectDate = new DatePage();
const selectString = new StringPage();

describe('test `Upload panoramas` function', () => {
    it('Upload panoramas', () => {

        // login to editor
        loginPage.navigate('https://vreditor.istaging.com/');
        loginPage.enterUsername('eric_cypress');
        loginPage.enterPassword('000000');

        cy.wait(3000);

        loginPage.clickLogin();

        // create a new building
        createBuilding.clickTriggerCreateLiveTour();
        createBuilding.enterLiveTourName(selectDate.selectDate('today') + '_' + selectString.selectString('10'));
        createBuilding.clickEnablePublic(true);

        cy.wait(3000);

        createBuilding.clickCreateLiveTour();

        cy.wait(3000);

        // enter `Panoramas` page
        cy.get('.nav > :nth-child(2) > .nav-link').click();

        cy.wait(3000);

        // upload panoramas
        cy.get('.add-panoramas > :nth-child(1)').click();


        cy.get('#Panoramas')
            .attachFile(testImages.selectImages(0));

        // wait for attaching finished
        cy.wait(5000);


        cy.get('#use-filename')
            .click();


        cy.get('[style="background-color: rgba(0, 0, 0, 0.7); position: fixed;"] > .i-modal-inner > .i-form-2 > .flex-center > .row-mbl > .form-group > .buttons-container > .btn')
            .click();

        // wait for uploading finished
        //cy.wait(30000);

        // check if uploading successfully finished
        cy.get('.footer > p')
            .should('contain', '上傳結束');

        cy.get('.header > button')
            .click();

        // wait for resizing finished
        cy.wait(5000);      
        

        // check panoramas order and category name
        for( var p = 1; p <= 10; p++ ) {

            cy.get(':nth-child('+ p +') > .i-edit-list-category > .i-edit-list-category-text')
                .should('contain', 'test ('+ (11 - p) +')');

        }

        
    })
})