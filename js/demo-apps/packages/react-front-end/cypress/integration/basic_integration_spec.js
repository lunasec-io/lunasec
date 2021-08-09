/// <reference types="cypress" />
describe('tokenize_and_detokenize', function () {

    it('text_data', function () {
        cy.viewport(1059, 948)

        cy.visit('http://localhost:3000/')

        cy.intercept({
            url: 'http://localhost:37766/tokenize',
        }).as('tokenizeRequest');

        cy.intercept({
            url: 'http://localhost:37766/detokenize',
        }).as('detokenizeRequest');

        cy.intercept({
            url: 'http://localhost:37766/frame',
        }, (req) => {
            cy.task('log', JSON.stringify(req))
        });

        cy.iframe('.secure-textarea-container-text-area > iframe').as('textAreaIframe')
        cy.iframe('.secure-input-container-email > iframe').as('emailIframe')

        cy.wait(1000);

        cy.get('@textAreaIframe')
            .find('.secure-input')
            .eq(0)
            .type("test")

        // cy.get('@emailIframe')
        //     .find('.secure-input')
        //     .eq(0)
        //     .type("test@test.com")

        cy.get('[name=secure-form-example]')
            .submit()

        cy.wait('@tokenizeRequest').then((interception) => {
            if (interception.response === undefined) {
                assert.notOk(true, 'response is undefined')
                return;
            }
            const resp = interception.response.body;
            cy.task('log', `tokenize response: ${JSON.stringify(resp)}`)
            assert.ok(resp.success, 'request was successful')
            assert.isDefined(resp.data.tokenId, 'tokenId was present in response')
            assert.isDefined(resp.data.uploadUrl, 'uploadUrl was present in response')
            assert.isDefined(resp.data.headers, 'headers was present in response')
        })

        cy.wait('@detokenizeRequest').then((interception) => {
            if (interception.response === undefined) {
                assert.notOk(true, 'response is undefined')
                return;
            }
            const resp = interception.response.body;
            cy.task('log', `detokenize response: ${JSON.stringify(resp)}`)
            assert.ok(resp.success, 'request was successful')
            assert.isDefined(resp.data.downloadUrl, 'downloadUrl was present in response')
            assert.isDefined(resp.data.headers, 'headers was present in response')
        })
    })

})