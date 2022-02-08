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
import {Col,Row, Container, Spinner} from 'react-bootstrap';
import {useParams, NavLink} from 'react-router-dom';
import { ArrowLeft} from 'react-feather'
import {SpinIfLoading} from '../../../components/SpinIfLoading';
import {GetBuildDetailsQuery, useGetBuildDetailsQuery} from '../../../store/api/generated';
import {prettyDate} from "../../../utils/pretty-date";
import { VulnerablePackageList} from './finding/VulnerablePackageList'
import {capitalizeFirstLetter} from "../../../utils/string-utils";
export const BuildDetails: React.FunctionComponent = () => {
    console.log('rendering build details');
    const {build_id} = useParams();
    const {data, error, isLoading} = useGetBuildDetailsQuery({build_id});




    const renderBuildDetails = () => {
        if (!data) {
            return null
        }
        const build = data.builds[0];
        const firstScan = build.scans[0];
        const lastScannedDate = build.scans[0] ? prettyDate(new Date(build.scans[0].created_at as string)) : 'Never';
        const uploadDate = prettyDate(new Date(build.created_at as string));

        return <>
            <Row>
                <Col xs="3"><NavLink to=".."><ArrowLeft/>All Builds</NavLink></Col>
            <Col xs="6" style={{textAlign: 'center'}}>
                <h1>Build # {build.build_number}</h1>
                <h5>{uploadDate}</h5>
            </Col>
            </Row>
            <Row>
                <Col xs="12" sm={{ order: 'last', span: 5, offset: 4}}>
                    <h6 style={{textAlign:'right' }}>
                        <span className="darker"> Last scanned:</span> {lastScannedDate}
                    </h6>
                    <h6 style={{ textAlign:'right' }}>
                        <span className="darker">Scanned {build.scans_aggregate.aggregate?.count} time{build.scans_aggregate.aggregate?.count !== 1 ? 's':''}</span>
                    </h6>
                </Col>
                <Col xs="12" sm="3">
                    <div className="build-git-info">
                        <h6>
                            <span className="darker">Branch: </span> master
                        </h6>
                        <h6>
                            <span className="darker">Commit: </span> 1231adf... ↪
                        </h6>
                        <h6>
                            <span className="darker">{capitalizeFirstLetter(firstScan.source_type)}:</span> {firstScan.target}
                        </h6>
                    </div>
                </Col>
            </Row>
            <hr/>
            <VulnerablePackageList findings={build.findings}/>
        </>
    }

    return (
        <Container className="build-page">
            <SpinIfLoading isLoading={isLoading}>
                {renderBuildDetails()}
            </SpinIfLoading>
        </Container>
    );
};
