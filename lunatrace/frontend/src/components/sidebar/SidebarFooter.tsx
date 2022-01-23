/*
 * Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
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
