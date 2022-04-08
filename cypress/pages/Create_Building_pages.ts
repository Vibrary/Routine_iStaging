export class CreateBuildingPage {

    createBuildingPage_triggerCreateLiveTour = '#buildingsCreateBuildingButton';
    createBuildingPage_liveTourName = '.i-input';
    createBuildingPage_enablePublic = '.i-switch-track';
    createBuildingPage_createLiveTour = '.submit-btn';


    clickTriggerCreateLiveTour() {
        cy.get(this.createBuildingPage_triggerCreateLiveTour)
            .click();
    }

    enterLiveTourName(name : string) {
        cy.get(this.createBuildingPage_liveTourName)
            .type(name);
    }

    clickEnablePublic(enable : boolean) {
        if(enable) {
            cy.get(this.createBuildingPage_enablePublic)
                .click();
        }
    }

    clickCreateLiveTour() {
        cy.get(this.createBuildingPage_createLiveTour)
            .click();
    }

}