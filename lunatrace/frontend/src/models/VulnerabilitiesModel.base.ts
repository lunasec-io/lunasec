/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { FindingsAggregateModel, FindingsAggregateModelType } from "./FindingsAggregateModel"
import { FindingsAggregateModelSelector } from "./FindingsAggregateModel.base"
import { FindingsModel, FindingsModelType } from "./FindingsModel"
import { FindingsModelSelector } from "./FindingsModel.base"
import { RelatedVulnerabilitiesAggregateModel, RelatedVulnerabilitiesAggregateModelType } from "./RelatedVulnerabilitiesAggregateModel"
import { RelatedVulnerabilitiesAggregateModelSelector } from "./RelatedVulnerabilitiesAggregateModel.base"
import { RelatedVulnerabilitiesModel, RelatedVulnerabilitiesModelType } from "./RelatedVulnerabilitiesModel"
import { RelatedVulnerabilitiesModelSelector } from "./RelatedVulnerabilitiesModel.base"
import { VulnerabilityPackagesAggregateModel, VulnerabilityPackagesAggregateModelType } from "./VulnerabilityPackagesAggregateModel"
import { VulnerabilityPackagesAggregateModelSelector } from "./VulnerabilityPackagesAggregateModel.base"
import { VulnerabilityPackagesModel, VulnerabilityPackagesModelType } from "./VulnerabilityPackagesModel"
import { VulnerabilityPackagesModelSelector } from "./VulnerabilityPackagesModel.base"
import { RootStoreType } from "./index"


/**
 * VulnerabilitiesBase
 * auto generated base class for the model VulnerabilitiesModel.
 *
 * columns and relationships of "vulnerabilities"
 */
export const VulnerabilitiesModelBase = ModelBase
  .named('Vulnerabilities')
  .props({
    __typename: types.optional(types.literal("vulnerabilities"), "vulnerabilities"),
    created_at: types.union(types.undefined, types.frozen()),
    cvss_exploitability_score: types.union(types.undefined, types.null, types.frozen()),
    cvss_impact_score: types.union(types.undefined, types.null, types.frozen()),
    cvss_inferred: types.union(types.undefined, types.null, types.boolean),
    cvss_score: types.union(types.undefined, types.null, types.frozen()),
    cvss_version: types.union(types.undefined, types.null, types.string),
    data_source: types.union(types.undefined, types.null, types.string),
    description: types.union(types.undefined, types.null, types.string),
    /** An array relationship */
    findings: types.union(types.undefined, types.array(types.late((): any => FindingsModel))),
    /** An aggregate relationship */
    findings_aggregate: types.union(types.undefined, types.late((): any => FindingsAggregateModel)),
    id: types.union(types.undefined, types.frozen()),
    name: types.union(types.undefined, types.string),
    namespace: types.union(types.undefined, types.string),
    record_source: types.union(types.undefined, types.null, types.string),
    /** An array relationship */
    relatedVulnerabilitiesByVulnerabilitySlug: types.union(types.undefined, types.array(types.late((): any => RelatedVulnerabilitiesModel))),
    /** An aggregate relationship */
    relatedVulnerabilitiesByVulnerabilitySlug_aggregate: types.union(types.undefined, types.late((): any => RelatedVulnerabilitiesAggregateModel)),
    /** An array relationship */
    related_vulnerabilities: types.union(types.undefined, types.array(types.late((): any => RelatedVulnerabilitiesModel))),
    /** An aggregate relationship */
    related_vulnerabilities_aggregate: types.union(types.undefined, types.late((): any => RelatedVulnerabilitiesAggregateModel)),
    severity: types.union(types.undefined, types.null, types.string),
    slug: types.union(types.undefined, types.string),
    topic_id: types.union(types.undefined, types.null, types.frozen()),
    urls: types.union(types.undefined, types.null, types.frozen()),
    /** An array relationship */
    vulnerability_packages: types.union(types.undefined, types.array(types.late((): any => VulnerabilityPackagesModel))),
    /** An aggregate relationship */
    vulnerability_packages_aggregate: types.union(types.undefined, types.late((): any => VulnerabilityPackagesAggregateModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class VulnerabilitiesModelSelector extends QueryBuilder {
  get created_at() { return this.__attr(`created_at`) }
  get cvss_exploitability_score() { return this.__attr(`cvss_exploitability_score`) }
  get cvss_impact_score() { return this.__attr(`cvss_impact_score`) }
  get cvss_inferred() { return this.__attr(`cvss_inferred`) }
  get cvss_score() { return this.__attr(`cvss_score`) }
  get cvss_version() { return this.__attr(`cvss_version`) }
  get data_source() { return this.__attr(`data_source`) }
  get description() { return this.__attr(`description`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get namespace() { return this.__attr(`namespace`) }
  get record_source() { return this.__attr(`record_source`) }
  get severity() { return this.__attr(`severity`) }
  get slug() { return this.__attr(`slug`) }
  get topic_id() { return this.__attr(`topic_id`) }
  get urls() { return this.__attr(`urls`) }
  findings(builder?: string | FindingsModelSelector | ((selector: FindingsModelSelector) => FindingsModelSelector)) { return this.__child(`findings`, FindingsModelSelector, builder) }
  findings_aggregate(builder?: string | FindingsAggregateModelSelector | ((selector: FindingsAggregateModelSelector) => FindingsAggregateModelSelector)) { return this.__child(`findings_aggregate`, FindingsAggregateModelSelector, builder) }
  relatedVulnerabilitiesByVulnerabilitySlug(builder?: string | RelatedVulnerabilitiesModelSelector | ((selector: RelatedVulnerabilitiesModelSelector) => RelatedVulnerabilitiesModelSelector)) { return this.__child(`relatedVulnerabilitiesByVulnerabilitySlug`, RelatedVulnerabilitiesModelSelector, builder) }
  relatedVulnerabilitiesByVulnerabilitySlug_aggregate(builder?: string | RelatedVulnerabilitiesAggregateModelSelector | ((selector: RelatedVulnerabilitiesAggregateModelSelector) => RelatedVulnerabilitiesAggregateModelSelector)) { return this.__child(`relatedVulnerabilitiesByVulnerabilitySlug_aggregate`, RelatedVulnerabilitiesAggregateModelSelector, builder) }
  related_vulnerabilities(builder?: string | RelatedVulnerabilitiesModelSelector | ((selector: RelatedVulnerabilitiesModelSelector) => RelatedVulnerabilitiesModelSelector)) { return this.__child(`related_vulnerabilities`, RelatedVulnerabilitiesModelSelector, builder) }
  related_vulnerabilities_aggregate(builder?: string | RelatedVulnerabilitiesAggregateModelSelector | ((selector: RelatedVulnerabilitiesAggregateModelSelector) => RelatedVulnerabilitiesAggregateModelSelector)) { return this.__child(`related_vulnerabilities_aggregate`, RelatedVulnerabilitiesAggregateModelSelector, builder) }
  vulnerability_packages(builder?: string | VulnerabilityPackagesModelSelector | ((selector: VulnerabilityPackagesModelSelector) => VulnerabilityPackagesModelSelector)) { return this.__child(`vulnerability_packages`, VulnerabilityPackagesModelSelector, builder) }
  vulnerability_packages_aggregate(builder?: string | VulnerabilityPackagesAggregateModelSelector | ((selector: VulnerabilityPackagesAggregateModelSelector) => VulnerabilityPackagesAggregateModelSelector)) { return this.__child(`vulnerability_packages_aggregate`, VulnerabilityPackagesAggregateModelSelector, builder) }
}
export function selectFromVulnerabilities() {
  return new VulnerabilitiesModelSelector()
}

export const vulnerabilitiesModelPrimitives = selectFromVulnerabilities().created_at.cvss_exploitability_score.cvss_impact_score.cvss_inferred.cvss_score.cvss_version.data_source.description.name.namespace.record_source.severity.slug.topic_id.urls
