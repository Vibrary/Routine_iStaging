export class LanguagePage {

    selectLanguage(language : string) {
        switch(language) {

            case 'EN':
                cy.get('.lang-switcher')
                .select(0);
                break;

            case 'TW':
                cy.get('.lang-switcher')
                .select(1);
                break;

            case 'CN':
                cy.get('.lang-switcher')
                .select(2);
                break;

            case 'FR':
                cy.get('.lang-switcher')
                .select(3);
                break;

            case 'DE':
                cy.get('.lang-switcher')
                .select(4);
                break;

            case 'NL':
                cy.get('.lang-switcher')
                .select(5);
                break;

            case 'JA':
                cy.get('.lang-switcher')
                .select(6);
                break;

            case 'AR':
                cy.get('.lang-switcher')
                .select(7);
                break;

        }
    }
}