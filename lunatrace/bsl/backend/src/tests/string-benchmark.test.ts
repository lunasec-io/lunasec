const totalRunCount = 100000;
import crypto from 'node:crypto';

describe('string speed', () => {
  it('interpolates a million strings', () => {
    let s = '';
    for (let n = 0; n < totalRunCount; n++) {
      s = `${'s'}-${'morestring'}`;
    }
    console.log(s.length);
  });
  it('concats a million strings', () => {
    let s = '';
    for (let n = 0; n < totalRunCount; n++) {
      s = s + 'morestring';
    }
    console.log(s.length);
  });
});

describe.only('hash speed', () => {
  it('control speed', () => {
    for (let n = 0; n < totalRunCount; n++) {
      const s = 'fake' + 'shit';
    }
  });

  const algs = crypto.getHashes();
  algs.forEach((alg) => {
    it(alg, () => {
      for (let n = 0; n < totalRunCount; n++) {
        const hash = crypto.createHash(alg);
        hash.update(
          'somestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestringsomestring'
        );
        hash.digest();
      }
    });
  });
});
