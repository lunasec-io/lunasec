import {Page} from "puppeteer";

require('dotenv').config()
import Queue from 'queue';
import {Session, setupPuppeteerSession} from './setup-puppeteer';
import fs from 'fs'
import {SqliteCache} from './sqlite-cache';
import {normalize} from "yargs";

async function getUrlsToScrape(): Promise<string[]> {
  // STUBBED
  const log4shellurls =
    [
      {
        "url": "https://github.com/advisories/GHSA-7rjr-3q55-vv33"
      },
      {
        "url": "https://nvd.nist.gov/vuln/detail/CVE-2021-44228"
      },
      {
        "url": "https://github.com/apache/logging-log4j2"
      },
      {
        "url": "http://packetstormsecurity.com/files/165225/Apache-Log4j2-2.14.1-Remote-Code-Execution.html"
      },
      {
        "url": "http://packetstormsecurity.com/files/165260/VMware-Security-Advisory-2021-0028.html"
      },
      {
        "url": "http://packetstormsecurity.com/files/165261/Apache-Log4j2-2.14.1-Information-Disclosure.html"
      },
      {
        "url": "http://packetstormsecurity.com/files/165270/Apache-Log4j2-2.14.1-Remote-Code-Execution.html"
      },
      {
        "url": "http://packetstormsecurity.com/files/165281/Log4j2-Log4Shell-Regexes.html"
      },
      {
        "url": "http://packetstormsecurity.com/files/165282/Log4j-Payload-Generator.html"
      },
      {
        "url": "http://packetstormsecurity.com/files/165306/L4sh-Log4j-Remote-Code-Execution.html"
      },
      {
        "url": "http://packetstormsecurity.com/files/165307/Log4j-Remote-Code-Execution-Word-Bypassing.html"
      },
      {
        "url": "http://packetstormsecurity.com/files/165311/log4j-scan-Extensive-Scanner.html"
      },
      {
        "url": "http://packetstormsecurity.com/files/165371/VMware-Security-Advisory-2021-0028.4.html"
      },
      {
        "url": "http://packetstormsecurity.com/files/165532/Log4Shell-HTTP-Header-Injection.html"
      },
      {
        "url": "http://packetstormsecurity.com/files/165642/VMware-vCenter-Server-Unauthenticated-Log4Shell-JNDI-Injection-Remote-Code-Execution.html"
      },
      {
        "url": "http://packetstormsecurity.com/files/165673/UniFi-Network-Application-Unauthenticated-Log4Shell-Remote-Code-Execution.html"
      },
      {
        "url": "http://packetstormsecurity.com/files/167794/Open-Xchange-App-Suite-7.10.x-Cross-Site-Scripting-Command-Injection.html"
      },
      {
        "url": "http://packetstormsecurity.com/files/167917/MobileIron-Log4Shell-Remote-Command-Execution.html"
      },
      {
        "url": "https://cert-portal.siemens.com/productcert/pdf/ssa-397453.pdf"
      },
      {
        "url": "https://cert-portal.siemens.com/productcert/pdf/ssa-479842.pdf"
      },
      {
        "url": "https://cert-portal.siemens.com/productcert/pdf/ssa-661247.pdf"
      },
      {
        "url": "https://cert-portal.siemens.com/productcert/pdf/ssa-714170.pdf"
      },
      {
        "url": "http://seclists.org/fulldisclosure/2022/Dec/2"
      },
      {
        "url": "http://seclists.org/fulldisclosure/2022/Jul/11"
      },
      {
        "url": "http://seclists.org/fulldisclosure/2022/Mar/23"
      },
      {
        "url": "https://github.com/apache/logging-log4j2/pull/608"
      },
      {
        "url": "https://github.com/cisagov/log4j-affected-db"
      },
      {
        "url": "https://github.com/cisagov/log4j-affected-db/blob/develop/SOFTWARE-LIST.md"
      },
      {
        "url": "https://github.com/nu11secur1ty/CVE-mitre/tree/main/CVE-2021-44228"
      },
      {
        "url": "https://github.com/tangxiaofeng7/apache-log4j-poc"
      },
      {
        "url": "https://issues.apache.org/jira/browse/LOG4J2-3198"
      },
      {
        "url": "https://issues.apache.org/jira/browse/LOG4J2-3201"
      },
      {
        "url": "https://issues.apache.org/jira/browse/LOG4J2-3214"
      },
      {
        "url": "https://issues.apache.org/jira/browse/LOG4J2-3221"
      },
      {
        "url": "https://lists.debian.org/debian-lts-announce/2021/12/msg00007.html"
      },
      {
        "url": "https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/M5CSVUNV4HWZZXGOKNSK6L7RPM7BOKIB/"
      },
      {
        "url": "https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/VU57UJDCFIASIO35GC55JMKSRXJMCDFM/"
      },
      {
        "url": "https://logging.apache.org/log4j/2.x/changes-report.html#a2.15.0"
      },
      {
        "url": "https://logging.apache.org/log4j/2.x/manual/lookups.html#JndiLookup"
      },
      {
        "url": "https://logging.apache.org/log4j/2.x/manual/migration.html"
      },
      {
        "url": "https://logging.apache.org/log4j/2.x/security.html"
      },
      {
        "url": "https://msrc-blog.microsoft.com/2021/12/11/microsofts-response-to-cve-2021-44228-apache-log4j2/"
      },
      {
        "url": "https://psirt.global.sonicwall.com/vuln-detail/SNWLID-2021-0032"
      },
      {
        "url": "https://security.netapp.com/advisory/ntap-20211210-0007/"
      },
      {
        "url": "https://support.apple.com/kb/HT213189"
      },
      {
        "url": "https://tools.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-apache-log4j-qRuKNEbd"
      },
      {
        "url": "https://twitter.com/kurtseifried/status/1469345530182455296"
      },
      {
        "url": "https://www.bentley.com/en/common-vulnerability-exposure/be-2022-0001"
      },
      {
        "url": "https://www.debian.org/security/2021/dsa-5020"
      },
      {
        "url": "https://www.intel.com/content/www/us/en/security-center/advisory/intel-sa-00646.html"
      },
      {
        "url": "https://www.kb.cert.org/vuls/id/930724"
      },
      {
        "url": "https://www.nu11secur1ty.com/2021/12/cve-2021-44228.html"
      },
      {
        "url": "https://www.oracle.com/security-alerts/alert-cve-2021-44228.html"
      },
      {
        "url": "https://www.oracle.com/security-alerts/cpuapr2022.html"
      },
      {
        "url": "https://www.oracle.com/security-alerts/cpujan2022.html"
      },
      {
        "url": "http://www.openwall.com/lists/oss-security/2021/12/10/1"
      },
      {
        "url": "http://www.openwall.com/lists/oss-security/2021/12/10/2"
      },
      {
        "url": "http://www.openwall.com/lists/oss-security/2021/12/10/3"
      },
      {
        "url": "http://www.openwall.com/lists/oss-security/2021/12/13/1"
      },
      {
        "url": "http://www.openwall.com/lists/oss-security/2021/12/13/2"
      },
      {
        "url": "http://www.openwall.com/lists/oss-security/2021/12/14/4"
      },
      {
        "url": "http://www.openwall.com/lists/oss-security/2021/12/15/3"
      }
    ]
  const urls = log4shellurls.map((urlObject => {
    return urlObject.url
  }))

  return Promise.resolve(urls);
}

function scrapeAllElements(el:HTMLElement): string {
  // console.log('scraping element')
  // if (!el.hasAttribute('innerText')){
  //   return ''
  // }
  // console.log('scraping elemenent type ', el.tagName)
  // if (el.tagName !== 'CODE' || !el.classList.contains('highlight')){
  //   return ''
  // }
  // console.log('FOUND CODE')

  return el.innerText;
}


function timeout(ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  const sqliteCache = new SqliteCache('cache.db');

  const session = await setupPuppeteerSession();

  const queue = new Queue({
    concurrency: 10,
    autostart: true,
    timeout: 10000
  });

  const urlsToScrape = await getUrlsToScrape();

  const references:Reference[] = [];

  urlsToScrape.forEach( async (url) => {
    queue.push(() => {
      return scrape(url, session, 'GHSA-jfh8-c2jp-5v3q')
    })


  });
  queue.on('success', (result, job) => {
    console.log('queue success')
    if (!result){
      return
    }
    console.log('queue resolved with ', result.url)
    references.push(result)
    const json = JSON.stringify(references)
    fs.writeFileSync('testvulndata.json', json, 'utf8');
  })
  queue.on('end', () => {
    console.log('done')
    session.browser.close();
  })
})();

export interface Reference {
   vulnerability_id:   string;
   url:                string;
   title:              string;
   content:            string;
   normalized_content: string;
   code: CodeAndPreamble[];
   content_type:       string;
   successful_fetch:   number;
}

 interface CodeAndPreamble {
  code:string;
  preamble: string | null
}




async function scrape(url:string, session: Session, vulnerability_id:string):Promise<Reference|null>{
  let page: Page| null = null;
  try {
    page = await session.browser.newPage()
    await page.setUserAgent("Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322)");
    await page.goto(url, {waitUntil: "networkidle0"})
    await timeout(2000)
    page
      .on('console', message =>
        console.log(`${message.type().substr(0, 3).toUpperCase()} ${message.text()}`))

    const normalized_content = await page.$eval('*', (el) => {
      if (!(el instanceof HTMLElement) ){
        return ''
      }
      return el.innerText;
    })

    const code =  await page.evaluate(() => {
      const allCodeElements = Array.from(document.querySelectorAll('code'))
      const textualCodeElements = allCodeElements.filter((el) => 'innerText' in el)
      const codeElements = textualCodeElements.filter((el) => el.innerText.length > 100)
      // const codeTexts = codeElements.map((el) => el.innerText)

      // get whatever text was before the code block, which is almost always its description
      function recurseUntilPreviousSibling(el:HTMLElement): string | null{
        const previousSibling = el.previousElementSibling
        if (!previousSibling || !('innerText' in previousSibling)){
          if (!el.parentElement){
            return null
          }
          return recurseUntilPreviousSibling(el.parentElement)
        }
        // @ts-ignore
        return previousSibling.innerText;

      }

      return codeElements.map((el) => {
        return {
          code: el.innerText,
          preamble: recurseUntilPreviousSibling(el)
        }
      })
    })



    const reference: Reference = {
      normalized_content, // page.$eval('code', scrapeAllElements) as string,
      code,
      content_type: 'text/html',
      content: await page.evaluate(() =>  document.documentElement.outerHTML),
      successful_fetch: 1,
      title: await page.title(),
      url: url,
      vulnerability_id
    }
    if (reference.code.length === 0){
      console.log('didnt find any code at ', reference.url)
      return null
    }
    console.log('code found at ', reference.url, ' ', reference.code)
    return reference

  } catch (e) {
    console.log(`failed to scrape url ${url} with error ${String(e)}`)
    return null
  } finally {
    if (page){
      page.close();

    }
  }
}




