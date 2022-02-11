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
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Option } from 'react-bootstrap-typeahead/types/types';
import { Search } from 'react-feather';
import { useNavigate } from 'react-router-dom';

import { GetSidebarInfoQuery, useGetSidebarInfoQuery } from '../../store/api/generated';

export const ProjectSearch: React.FunctionComponent = () => {
  const navigate = useNavigate();
  // Just reuse the same query from the sidebar despite the overfetch, because it will be cached
  const { data, error, isLoading } = useGetSidebarInfoQuery();

  const handleProjectSelected = (options: Option[]) => {
    const selected = options[0] as GetSidebarInfoQuery['projects'][number] | undefined;
    if (!selected) {
      return;
    }
    navigate(`/project/${selected.id as string}`);
  };
  return (
    <Form inline="true" className="d-none d-sm-inline-block">
      <InputGroup className="input-group-navbar">
        <Typeahead
          id="project-search-form"
          placeholder="Search Projects"
          aria-label="Search Projects"
          onChange={handleProjectSelected}
          labelKey="name"
          options={!data ? [] : data.projects}
          highlightOnlyResult={true}
          selectHintOnEnter={true}
        />
        <Button variant="">
          <Search className="feather" />
        </Button>
      </InputGroup>
    </Form>
  );
};
