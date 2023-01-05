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
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import api from '../../../api';
import { SpinIfLoading } from '../../../components/SpinIfLoading';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { add } from '../../../store/slices/alerts';

export const TraceDetails: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const listStartRef = useRef<HTMLDivElement>(null);

  const { instance_id, project_id } = useParams();
  if (!instance_id || !project_id) {
    dispatch(add({ message: 'Malformed URL, missing instance_id or project_id parameter' }));
    return null;
  }
  const [getTraceDetailsTrigger, getTraceDetailsResult] = api.useLazyGetTraceDetailsQuery();
  const { data, isLoading: getTraceDetailsIsLoading } = getTraceDetailsResult;

  const scanCompletedCallback = () => {
    void getTraceDetailsTrigger({ id: instance_id });
  };

  useEffect(() => {
    void getTraceDetailsTrigger({ id: instance_id });
  }, []);

  function renderContainer(children: React.ReactNode) {
    return (
      <>
        {/*  widen the whole viewport using container fluid in side by side mode*/}
        <Container className="instance-page">
          <SpinIfLoading isLoading={getTraceDetailsIsLoading}>{children}</SpinIfLoading>
        </Container>
      </>
    );
  }

  if (!data) {
    return renderContainer(null);
  }

  if (!data.instances_by_pk) {
    console.error(`no instances are available: ${data}`);
    return renderContainer(<span>404: Couldn&apos;t find an instance with this ID.</span>);
  }

  const instance = data.instances_by_pk;

  return renderContainer(
    <>
      <Helmet title={`Trace`} />
      <Row>
        <h2>Runtime Trace</h2>
        <p>Host: {instance.hostname}</p>
        <hr />
        <Container>
          {instance.logs.map((log) => {
            const vulnerability = log.affected_analysis_config?.affected?.vulnerability;
            const p = log.affected_analysis_config?.affected?.package;
            return (
              <Row>
                <Col>
                  <p>
                    <span className="lighter">Method</span>: {log.message.method}
                  </p>
                  <p>
                    <span className="lighter">Arguments</span>: {log.message.arguments}
                  </p>
                </Col>
                {vulnerability && p && (
                  <Col>
                    <p>
                      <span className="lighter">Package</span>: {p.name}
                    </p>
                    <p>
                      <span className="lighter">Vulnerability</span>: {vulnerability.source_id}{' '}
                      {vulnerability.severity_name}
                    </p>
                  </Col>
                )}
                <hr />
              </Row>
            );
          })}
        </Container>
      </Row>
    </>
  );
};
