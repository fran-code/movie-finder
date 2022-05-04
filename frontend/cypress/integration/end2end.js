describe('Find Film', () => {

    it('should allow a typical user flow', () => {
        cy.visit('http://localhost:3000')
        cy.intercept('POST', 'http://localhost:4003/films/rate').as('apiCheck')

        cy.contains('div', 'Film').find('input').first().type('Harry Potter and the Order of the Phoenix')
        cy.get('.searchButton').click()
        cy.get('[alt="Harry Potter and the Order of the Phoenix"]').click()

        cy.contains('div', 'Harry Potter and the Order of the Phoenix').should("exist");
        cy.contains('div', 'Daniel Radcliffe').should("exist");
        cy.contains('div', 'Adventure').should("exist");
        cy.contains('div', 'David Yates').should("exist");

        cy.get('button[name="rateButton"]').then(e => {
            const text = e.text()
            const addFavoriteText = "Add to favourites"
            e.click()
            cy.wait("@apiCheck").then((interception) => {
                cy.wrap(interception.response.body.message).should("eq", text === addFavoriteText ? true : false);
            })
        })

    })
})