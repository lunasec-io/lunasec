import * as path from 'path';

Cypress.Cookies.defaults({
  preserve: ['connect.sid', 'access_token'],
});

const fakeSSN = '123121234';
const randomUserName = Math.floor(Math.random() * 1000000000).toString();
const randomFileName = Math.floor(Math.random() * 1000000000).toString() + '.png';

describe('demo app', function () {
  it('signs up', function () {
    cy.visit('signup');

    cy.get('input[id=username]').type(randomUserName); // Use a random username to avoid DB collisions

    cy.get('input[id=password]').type('test');

    cy.get('form[id=signup-form]').submit();

    cy.location('pathname').should('eq', '/');
    cy.get('p[id=user-status]').should('contain', 'Logged in');
  });

  it('secure input tokenizes', () => {
    cy.visit('/secureinput');

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
    cy.visit('/secureparagraph');

    cy.iframe().find('.secure-input').should('contain', fakeSSN);
  });

  it('secure upload', () => {
    cy.visit('secureupload');

    cy.iframe().find('input[type=file]').attachFile({ filePath: 'sid.png', fileName: randomFileName }); // Dont sue me bro

    cy.iframe().find('.file-container').should('contain', randomFileName);

    cy.wait(500);

    cy.get('#save-documents').click();
  });

  it('secure download', () => {
    cy.visit('securedownload');

    const link = cy.iframe().find('a');

    link.should('contain', randomFileName);

    link.click();
    cy.wait(500);
    const downloadsFolder = Cypress.config('downloadsFolder');
    cy.readFile(path.join(downloadsFolder, randomFileName)).should('exist');
  });

  it('secure text area', () => {
    cy.visit('securetextarea');

    cy.iframe('.lunasec-iframe-textarea').find('textarea').type('some secure text');

    cy.get('button').contains('Save').click();

    cy.iframe('.lunasec-iframe-paragraph').find('p').should('contain', 'some secure text');
  });
});
