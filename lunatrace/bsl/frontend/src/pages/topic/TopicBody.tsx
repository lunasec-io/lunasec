/*
 * Copyright by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Business Source License v1.1
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React from 'react';
import { Card, Image } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import rehypePrism from 'rehype-prism-plus';
// import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
// import remarkParse from 'remark-parse';
// import { admonitionPlugin } from '../../utils/reverse-engineered-admonitions';

export const TopicBody: React.FC<{ markdown: string }> = ({ markdown }) => {
  return (
    <div className={'topic-body'}>
      <ReactMarkdown
        rehypePlugins={[rehypePrism]}
        remarkPlugins={[remarkGfm]} //, remarkDirective, admonitionPlugin]}
        components={{
          img({ node, inline, className, children, ...props }) {
            return (
              <Image fluid={true} className={`rounded markdown-image ${className}`} {...props}>
                {children}
              </Image>
            );
          },
          blockquote({ node, inline, className, children, ...props }) {
            return (
              <Card className={className} {...props}>
                <Card.Body>{children}</Card.Body>
              </Card>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};
