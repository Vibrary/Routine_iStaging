export class LoginEditorPage {

    loginEditorPage_username = ':nth-child(1) > :nth-child(2) > .form-control';
    loginEditorPage_password = ':nth-child(2) > :nth-child(2) > .form-control';
    loginEditorPage_loginButton = '.btn';
    loginEditorPage_waitForLogin = 5000;

    navigate(url : string) {
        cy.visit(url);
    }

    enterUsername(username : string) {
        cy.get(this.loginEditorPage_username).type(username);
    }

    enterPassword(password : string) {
        cy.get(this.loginEditorPage_password).type(password);
    }

    clickLogin() {
        cy.get(this.loginEditorPage_loginButton).click();
        cy.wait(this.loginEditorPage_waitForLogin);
    }

}