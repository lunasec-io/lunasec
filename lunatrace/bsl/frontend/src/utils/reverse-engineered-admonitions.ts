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
import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

// TODO: This is "working" but it has a ways to go before it actually renders useful admonitions

// create a node that will compile to HTML
const element = (tagName: string, classes: string | string[] = [], children = []) => {
  return {
    type: 'admonitionHTML',
    data: {
      hName: tagName,
      hProperties: classes.length
        ? {
            className: classes,
          }
        : {},
    },
    children,
  };
};

export const admonitionPlugin: Plugin = () => {
  return (tree) => {
    visit(tree, (node) => {
      // console.log('visiting', node);
      if (node.type === 'textDirective' || node.type === 'leafDirective' || node.type === 'containerDirective') {
        console.log('walking directive! ', node);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (node.name !== 'info') {
          return;
        }

        const data = node.data || (node.data = {});
        const tagName = node.type === 'textDirective' ? 'span' : 'div';

        data.hName = tagName;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore;
        // data.hProperties = h(tagName, node.attributes).properties;
        data.hProperties = {};
      }
    });
  };
};

export default {};
