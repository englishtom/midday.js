// NOTE: as of now, server must be manually run

const host = 'http://localhost:8080/';
const WAIT = 1000;

describe('midday.js', () => {

    describe('Basic', () => {
        it('Renders the Basic Example', () => {
            cy.visit(host);
        });

        it('Builds a structure for each declared section', () => {
            // sections should have .middayHeader and .middayInner wrappers
            cy.get('#basic-nav .middayHeader').should('have.length', 4)
            cy.get('#basic-nav .middayHeader .middayInner').should('have.length', 4)

            cy.wait(WAIT);
        });

        it('Displays the correct header on scroll', () => {
            // scroll down to second section
            cy.get('section[data-midday="black"]').scrollIntoView();

            // the second header should be visible, the others should not
            cy.get('#basic-nav .middayHeader.black .middayInner').should('be.visible');
            cy.get('#basic-nav .middayHeader.blue .middayInner, #basic-nav .middayHeader.default .middayInner').should('not.visible');

            cy.wait(WAIT);
        });

        it('Transitions the headers between sections', () => {

            // scroll down to between two sections
            cy.scrollTo('bottom');

            cy.wait(WAIT);

            // the default and second header should be visible, the others should not
            cy.get('#basic-nav .middayHeader.blue .middayInner, #basic-nav .middayHeader.default .middayInner').should('be.visible');
            cy.get('#basic-nav .middayHeader.black .middayInner, #basic-nav .middayHeader.black .middayInner').should('not.visible');
        });
    });

    describe('Custom', () => {
        it('Renders the Custom Example', () => {
            cy.visit(host);
        });

        it('Builds a structure for each declared section', () => {
            // sections should have .middayHeader and .middayInner wrappers
            cy.get('#custom-nav .middayHeader').should('have.length', 4)
            cy.get('#custom-nav .middayHeader .middayInner').should('have.length', 4)

            // when no default is provided it creates one
            cy.get('#custom-nav-no-default .middayHeader.default').should('have.length', 1)

            cy.wait(WAIT);
        });

        it('Displays the correct header on scroll', () => {
            // scroll down to third section
            cy.get('section[data-midday="blue"]').scrollIntoView();

            // the third header should be visible, the others should not
            cy.get('#custom-nav .middayHeader.blue .middayInner').should('be.visible');
            cy.get('#custom-nav .middayHeader.black .middayInner, #custom-nav .middayHeader.default .middayInner').should('not.visible');

            cy.wait(WAIT);
        });

        it('Transitions the headers between sections', () => {

            // scroll down to between two sections
            cy.scrollTo('bottom');

            cy.wait(WAIT);

            // the default and second header should be visible, the others should not
            cy.get('#custom-nav .middayHeader.blue .middayInner, #custom-nav .middayHeader.default .middayInner').should('be.visible');
            cy.get('#custom-nav .middayHeader.black .middayInner, #custom-nav .middayHeader.black .middayInner').should('not.visible');
        });
    });

    describe('Options', () => {
        it('Renders the Options Example', () => {
            cy.visit(host);
        });

        it('Builds a structure for each declared section', () => {
            // sections should have .customOuter and .customInner wrappers
            cy.get('#options-nav .customOuter').should('have.length', 2)
            cy.get('#options-nav .customOuter .customInner').should('have.length', 2)

            cy.wait(WAIT);
        });

        it('Displays the correct header on scroll', () => {
            // scroll down to third section
            cy.get('section[data-midday="blue"]').scrollIntoView();

            // the third header should be visible, the others should not
            cy.get('#options-nav .customOuter.blue .customInner').should('be.visible');
            cy.get('#options-nav .customOuter.black .customInner, #options-nav .customOuter.primary .customInner').should('not.visible');

            cy.wait(WAIT);
        });

        it('Transitions the headers between sections', () => {

            // scroll down to between two sections
            cy.scrollTo('bottom');

            cy.wait(WAIT);

            // the default and second header should be visible, the others should not
            cy.get('#options-nav .customOuter.blue .customInner, #options-nav .customOuter.primary .customInner').should('be.visible');
            cy.get('#options-nav .customOuter.black .customInner, #options-nav .customOuter.black .customInner').should('not.visible');
        });
    });
});
