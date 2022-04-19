import {LoginEditorPage} from '../pages/Login_Editor_pages'
import {TestLinkPage} from '../pages/Test_Links_pages'
import {CreateBuildingPage} from '../pages/Create_Building_pages'
import {DatePage} from '../pages/Date_pages'

Cypress.on('uncaught:exception', (err, ruunable) => {
    return false;
})

const loginPage = new LoginEditorPage();
const testLinks = new TestLinkPage();
const createBuilding = new CreateBuildingPage();
const selectDate = new DatePage();

describe('test `Add 360 video` function', () => {
    it('Add 360 video', () => {

        // login to editor
        loginPage.navigate('https://vreditor.istaging.com/');
        loginPage.enterUsername('eric_cypress');
        loginPage.enterPassword('000000');
        loginPage.clickLogin();

        // create a new building
        createBuilding.clickTriggerCreateLiveTour();
        createBuilding.enterLiveTourName(selectDate.selectDate('today'));
        createBuilding.clickEnablePublic(false);
        createBuilding.clickCreateLiveTour();

        // enter `Panoramas` page
        cy.get('.nav > :nth-child(2) > .nav-link').click();

        // Add 360 video
        cy.get('.add-panoramas > :nth-child(2)')
            .click();

        // input a youtube link
        cy.get('.input-wrap > .form-control')
            .type(testLinks.selectLink(360));

        cy.get('[style="background-color: rgba(0, 0, 0, 0.7); position: fixed;"] > .i-modal-inner > .i-form-2 > .flex-wrap > .row-mbl > .form-group > .buttons-container > .btn')
            .click()
            .wait(3000);

        cy.get('.i-alert-text')
            .should('contain', '新增成功');

    })


})