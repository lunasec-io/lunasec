import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button, Tooltip } from "reactstrap";
import Typist from 'react-typist';
import LazyLoad from 'react-lazyload';
import { Reordering, Isolate } from 'components/Utils/Reordering'
import { CopyToClipboard } from 'react-copy-to-clipboard';

function SectionDescription() {
  const [copied, setCopied] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const refBibTex = useRef();
  const toggle = () => {
    setTooltipOpen(!tooltipOpen);
    setCopied(false);
  };
  const TooltipContent = ({ scheduleUpdate, copied }) => {
    useEffect(scheduleUpdate, [copied, scheduleUpdate])
    return (
      <>{ copied ? "Copied!" : "Copy to Clipboard" }</>
    );
  }
  return (
    <>
      <div className="section section-dark">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto text-center title" md="8">
              <h2>Some Vulnerabilities are Invisible</h2>
              <h4 className="description">Rather than inserting logical bugs, adversaries can attack the encoding of source code files to inject vulnerabilities.</h4>
              <br />
              <h3>These adversarial encodings produce no visual artifacts.</h3>
            </Col>
          </Row>
          <Row>
            <Col lg={{ size: 5, offset: 2 }} md={{ size: 8, offset: 2 }}>
              <code className="terminal">
                #include &lt;stdio.h&gt;<br />
                #include &lt;stdbool.h&gt;<br />
                <br />
                int main() &#123;<br />
                  <span className="tab">bool isAdmin = false;</span><br />
                  <span className="tab">{'/*'} begin admins only {'*/'} if (isAdmin) &#123;</span><br />
                    <span style={{ marginLeft: '8em' }}>printf("You are an admin.\n");</span><br />
                    <span className="tab">{'/*'} end admins only {'*/'} &#125;</span><br />
                    <span className="tab">return 0;</span><br />
                &#125;
              </code>
            </Col>
            <Col lg={{ size: 3, offset: 0 }} md={{ size: 8, offset: 2 }}>
              <hr className="d-lg-none" />
              <LazyLoad><code className="terminal"><Typist stdTypingDelay={50} avgTypingDelay={100} cursor={{ show: true, blink: true, element: '|', hideWhenDone: false }}>$&gt; clang program.c && ./a.out<br /><div dangerouslySetInnerHTML={{__html: 'You are an admin.'}} />$&gt; </Typist></code></LazyLoad>
            </Col>
          </Row>
          <Row className="pb-2">
            <Col className="ml-auto mr-auto text-white" md="8">
              <h1>The trick</h1>
              <h4>The trick is to use Unicode control characters to reorder tokens in source code at the encoding level.</h4>
              <h4>These visually reordered tokens can be used to display logic that, while semantically correct, diverges from the logic presented by the logical ordering of source code tokens.</h4>
              <h4>Compilers and interpreters adhere to the logical ordering of source code, not the visual order.</h4>
              
              <h1>The attack</h1>
              <h4>The attack is to use control characters embedded in comments and strings to reorder source code characters in a way that changes its logic.</h4>
              <h4>The previous example, for instance, works by making a comment appear as if it were code:</h4>
              <h2 className="terminal ex-1-font pt-4 pb-4">
                <Reordering>
                  <Isolate target={0}>{'/*'}&nbsp;</Isolate>
                  <Isolate target={2}>if (isAdmin) &#123;&nbsp;</Isolate>
                  <Isolate target={1}>begin admins only */&nbsp;</Isolate>
                </Reordering>
              </h2>
              <h4>Adversaries can leverage this deception to commit vulnerabilities into code that will not be seen by human reviewers.</h4>
              <h4>This attack pattern is tracked as CVE-2021-42574.</h4>

              <h1>The supply chain</h1>
              <h4>This attack is particularly powerful within the context of software supply chains.</h4>
              <h4>If an adversary successfully commits targeted vulnerabilities into open source code by deceiving human reviewers, downstream software will likely inherit the vulnerability.</h4>

              <h1>The technique</h1>
              <h4>There are multiple techniques that can be used to exploit the visual reordering of source code tokens:</h4>
              <h4><b>Early Returns</b> cause a function to short circuit by executing a  <code style={{color:'rgba(255,255,255,.8)'}}>return</code> statement that visually appears to be within a comment.</h4>
              <h4><b>Commenting-Out</b> causes a comment to visually appear as code, which in turn is not executed.</h4>
              <h4><b>Stretched Strings</b> cause portions of string literals to visually appear as code, which has the same effect as commenting-out and causes string comparisons to fail.</h4>

              <h1>The variant</h1>
              <h4>A similar attack exists which uses homoglyphs, or characters that appear near identical.</h4>
            </Col>
          </Row>
          <Row className="pt-4 pb-2">
            <Col lg={{ size: 4, offset: 2 }} md={{ size: 8, offset: 2 }}>
              <code className="terminal">
                #include &lt;iostream&gt;<br />
                <br />
                void say<span style={{ border: '1px solid blue' }}>H</span>ello() &#123;<br />
                  <span className="tab">std::cout &lt;&lt; "Hello, World!\n";</span><br />
                &#125;
              </code>
            </Col>
            <Col lg={{ size: 4, offset: 0 }} md={{ size: 8, offset: 2 }}>
              <code className="terminal">
                <br />
                <br />
                void say<span style={{ border: '1px solid red' }}>Н</span>ello() &#123;<br />
                  <span className="tab">std::cout &lt;&lt; "Bye, World!\n";</span><br />
                &#125;
              </code>
            </Col>
          </Row>
          <Row>
            <Col className="ml-auto mr-auto text-white" md="8">
              <h4>The above example defines two distinct functions with near indistinguishable visual differences highlighted for reference.</h4>
              <h4>An attacker can define such homoglyph functions in an upstream package imported into the global namespace of the target, which they then call from the victim code.</h4>
              <h4>This attack variant is tracked as CVE-2021-42694.</h4>

              <h1>The defense</h1>
              <h4>Compilers, interpreters, and build pipelines supporting Unicode should throw errors or warnings for unterminated bidirectional control characters in comments or string literals, and for identifiers with mixed-script confusable characters.</h4>
              <h4>Language specifications should formally disallow unterminated bidirectional control characters in comments and string literals.</h4>
              <h4>Code editors and repository frontends should make bidirectional control characters and mixed-script confusable characters perceptible with visual symbols or warnings.</h4>

              <h1>The paper</h1>
              <h4>Complete details can be found in the related <a href={process.env.PUBLIC_URL + '/trojan-source.pdf'} target="_self">paper</a>.</h4>
              <h4>If you use the paper or anything on this site in your own work, please cite the following:</h4>
              <br />
              <div className="d-flex flex-wrap pt-4">
                <div className="">
                  <code className="text-white" ref={refBibTex}>
                    @article&#123;boucher_trojansource_2021,<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;title = &#123;Trojan &#123;Source&#125;: &#123;Invisible&#125; &#123;Vulnerabilities&#125;&#125;,<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;author = &#123;Nicholas Boucher and Ross Anderson&#125;,<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;year = &#123;2021&#125;,<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;journal = &#123;Preprint&#125;,<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;eprint = &#123;2111.00169&#125;,<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;archivePrefix = &#123;arXiv&#125;,<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;primaryClass = &#123;cs.CR&#125;,<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;url = &#123;https://arxiv.org/abs/2111.00169&#125;<br />
                    &#125;
                  </code>
                </div>
                <div className="ml-auto align-self-end">
                  <CopyToClipboard text={refBibTex?.current?.innerText} onCopy={(text,result) => setCopied(result) }>
                    <Button id="copy" className="btn-round btn-icon ml-auto" color="default">
                        <i className="nc-icon nc-single-copy-04" />
                    </Button>
                  </CopyToClipboard>
                  <Tooltip delay={0} target="copy" isOpen={tooltipOpen} toggle={toggle}>
                    {({scheduleUpdate}) => (<TooltipContent copied={copied} scheduleUpdate={scheduleUpdate} />)}
                  </Tooltip>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default SectionDescription;
