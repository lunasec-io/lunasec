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

const SidebarFooter = () => {
  return (
    <div className="sidebar-cta">
      <div className="sidebar-cta-content">
        <strong className="d-inline-block mb-2">Monthly Sales Report</strong>
        <div className="mb-3 text-sm">Your monthly sales report is ready for download!</div>

        <div className="d-grid">
          <a
            href="https://themes.getbootstrap.com/product/appstack-react-admin-dashboard-template/"
            className="btn btn-primary"
            target="_blank"
            rel="noreferrer"
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
};

export default SidebarFooter;
