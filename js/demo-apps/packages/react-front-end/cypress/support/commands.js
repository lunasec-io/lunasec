/// <reference types="cypress" />
import 'cypress-iframe'
// Cypress.Commands.add('iframe', (iframeSelector, elSelector) => {
//     return cy
//       .get(iframeSelector, { timeout: 10000 })
//       .should($iframe => {
//         expect($iframe.contents().find(elSelector||'body')).to.exist
//       })
//       .then($iframe => {
//         return cy.wrap($iframe.contents().find('body'))
//       })
//   })

import 'cypress-file-upload'