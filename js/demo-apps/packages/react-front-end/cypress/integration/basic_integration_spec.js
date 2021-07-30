describe('tokenize_and_detokenize', function() {

    it('text_data', function() {
        cy.viewport(1059, 948)

        cy.visit('http://localhost:3000/')

        cy.iframe('.secure-textarea-container-text-area > iframe').as('textAreaIframe')
        cy.iframe('.secure-input-container-email > iframe').as('emailIframe')

        // cy.get('@textAreaIframe')
        //   .find('.secure-input')
        //   .eq(0)
        //   .type("test")
        //
        cy.get('@emailIframe')
            .find('.secure-input')
            .eq(0)
            .type("test@test.com")

        cy.get('[name=secure-form-example]')
            .submit()
    })

})