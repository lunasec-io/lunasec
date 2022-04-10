/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import * as path from 'path';

Cypress.Cookies.defaults({
  preserve: ['connect.sid', 'access_token'],
});

const fakeSSN = '123121234';
const randomUserName = Math.floor(Math.random() * 1000000000).toString();
const randomFileName = Math.floor(Math.random() * 1000000000).toString() + '.png';

// function handleFailure(e: Error) {
//   console.log('CAUGHT FAIL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
//   console.log(e);
//   return false;
// }
//
// Cypress.on('fail', handleFailure);
//
describe('visit page once to trigger CI bug', () => {
  //   // afterEach(() => {
  //   //   // @ts-ignore
  //   //   console.log(this);
  //   // });
  //   //
  //   //   cy.on('fail', (e) => {
  //   //     console.error('!!!!!!!!!!!!!! caught and handled bug for first visit:', e);
  //   //     // runnable.skip();
  //   //     return false;
  //   //   });
  it('visits page and catches', () => {
    cy.visit('/', {
      timeout: 700000,
      retryOnNetworkFailure: true,
      retryOnStatusCodeFailure: true,
      headers: { Connection: 'Keep-Alive', 'Accept-Encoding': 'gzip, deflate' },
    });
  });
});
//
// Cypress.removeListener('fail', handleFailure);

// describe('waits for startup', () => {
//   it('wait', () => {
//     cy.server();
//     cy.route('GET', '/').as('getRoot');
//     return cy.wait('@getRoot');
//   });
// });

// Both these app modes have an identical UX so we run the same set of tests twice, selecting a different mode at the start
runDedicatedModeTests('express');
runDedicatedModeTests('graphql');

function runDedicatedModeTests(mode: string) {
  describe(`demo app in mode: ${mode}`, function () {
    it('loads homepage', () => {
      cy.visit(`/`, { timeout: 30000 }); // Without doing a visit the second mode breaks, not sure why
    });

    it('selects mode', () => {
      cy.get('#mode-selector').click();
      cy.get(`li`).contains(mode, { matchCase: false }).click();
      cy.url().should('include', mode);
    });

    it('signs up', () => {

      cy.wait(5000);

      cy.get('a').contains('Signup').click();
      cy.get('input[id=username]').type(`${mode}-${randomUserName}`); // Use a random username to avoid DB collisions

      cy.get('input[id=password]').type('test');

      cy.get('form[id=signup-form]').submit();

      cy.wait(200);

      cy.location('pathname').should('eq', `/${mode}/secureinput`);
      cy.get('p[id=user-status]').should('contain', 'Logged in');
    });

    it('secure input tokenizes', () => {
      cy.get('a').contains('SecureInput').click();

      cy.iframe().find('.secure-input').type(fakeSSN);

      cy.get('button[type=submit]').click();

      cy.get('#success-alert').should('contain', 'Success');
    });

    // Broken persistence test, would be nice to have
    // it('secure input detokenizes', () => {
    //     cy.reload()
    //
    //     cy.frameLoaded()
    //
    //     cy.iframe()
    //         .find('.secure-input')
    //         .contains(fakeSSN)
    // })

    it('secure paragraph', () => {
      cy.get('a').contains('SecureParagraph').click();

      cy.iframe().find('.secure-input').should('contain', fakeSSN);
    });

    it('secure upload', () => {
      cy.get('a').contains('SecureUpload').click();

      cy.iframe().find('input[type=file]').attachFile({ filePath: 'sid.png', fileName: randomFileName }); // Dont sue me bro

      cy.iframe().find('.file-container').should('contain', randomFileName);

      cy.wait(1000);

      cy.get('#save-documents').click();

      cy.iframe().find('.filestatus').should('contain', 'Uploaded');
    });

    it('secure download', () => {
      cy.get('a').contains('SecureDownload').click();

      const link = cy.iframe().find('a');

      link.should('contain', randomFileName);

      link.click();
      cy.wait(process.env.CI ? 10000 : 1000);
      const downloadsFolder = Cypress.config('downloadsFolder');
      cy.readFile(path.join(downloadsFolder, randomFileName)).should('exist');
    });

    it('secure text area', () => {
      cy.get('a').contains('SecureTextArea').click();

      cy.iframe('.lunasec-iframe-textarea').find('textarea').type('some secure text');

      cy.get('button').contains('Save').click();

      cy.iframe('.lunasec-iframe-paragraph').find('p').should('contain', 'some secure text');
    });

    it('cleans up', () => {
      // This is necessary because otherwise Cypress won't actually log us out.
      cy.clearCookie('connect.sid');
      cy.reload();
    });
  });
}
// this test is different than the above because the "simple app" has a different UX

describe('demo app in mode: simple', () => {
  it('selects mode', () => {
    cy.get('#mode-selector').click();
    cy.get(`li`).contains('Simple').click();
  });

  it('tokenizes', () => {
    cy.get('a').contains('Tokenize').click();

    cy.get('#simple-tokenizer-input').type(fakeSSN);

    cy.get('button').contains('Save').click();

    cy.get('#success-alert').should('contain', 'Success');
  });

  it('detokenizes', () => {
    cy.get('a').contains('Detokenize').click();

    cy.get('p').contains(fakeSSN).should('exist');
  });
});
