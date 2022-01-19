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
import { OrganizationUserAggregateModel, OrganizationUserAggregateModelType } from "./OrganizationUserAggregateModel"
import { OrganizationUserAggregateModelSelector } from "./OrganizationUserAggregateModel.base"
import { OrganizationUserModel, OrganizationUserModelType } from "./OrganizationUserModel"
import { OrganizationUserModelSelector } from "./OrganizationUserModel.base"
import { OrganizationsAggregateModel, OrganizationsAggregateModelType } from "./OrganizationsAggregateModel"
import { OrganizationsAggregateModelSelector } from "./OrganizationsAggregateModel.base"
import { OrganizationsModel, OrganizationsModelType } from "./OrganizationsModel"
import { OrganizationsModelSelector } from "./OrganizationsModel.base"
import { PackageVersionsAggregateModel, PackageVersionsAggregateModelType } from "./PackageVersionsAggregateModel"
import { PackageVersionsAggregateModelSelector } from "./PackageVersionsAggregateModel.base"
import { PackageVersionsModel, PackageVersionsModelType } from "./PackageVersionsModel"
import { PackageVersionsModelSelector } from "./PackageVersionsModel.base"
import { ProjectsAggregateModel, ProjectsAggregateModelType } from "./ProjectsAggregateModel"
import { ProjectsAggregateModelSelector } from "./ProjectsAggregateModel.base"
import { ProjectsModel, ProjectsModelType } from "./ProjectsModel"
import { ProjectsModelSelector } from "./ProjectsModel.base"
import { RelatedVulnerabilitiesAggregateModel, RelatedVulnerabilitiesAggregateModelType } from "./RelatedVulnerabilitiesAggregateModel"
import { RelatedVulnerabilitiesAggregateModelSelector } from "./RelatedVulnerabilitiesAggregateModel.base"
import { RelatedVulnerabilitiesModel, RelatedVulnerabilitiesModelType } from "./RelatedVulnerabilitiesModel"
import { RelatedVulnerabilitiesModelSelector } from "./RelatedVulnerabilitiesModel.base"
import { ReportsAggregateModel, ReportsAggregateModelType } from "./ReportsAggregateModel"
import { ReportsAggregateModelSelector } from "./ReportsAggregateModel.base"
import { ReportsModel, ReportsModelType } from "./ReportsModel"
import { ReportsModelSelector } from "./ReportsModel.base"
import { SbomsAggregateModel, SbomsAggregateModelType } from "./SbomsAggregateModel"
import { SbomsAggregateModelSelector } from "./SbomsAggregateModel.base"
import { SbomsModel, SbomsModelType } from "./SbomsModel"
import { SbomsModelSelector } from "./SbomsModel.base"
import { ScansAggregateModel, ScansAggregateModelType } from "./ScansAggregateModel"
import { ScansAggregateModelSelector } from "./ScansAggregateModel.base"
import { ScansModel, ScansModelType } from "./ScansModel"
import { ScansModelSelector } from "./ScansModel.base"
import { SettingsAggregateModel, SettingsAggregateModelType } from "./SettingsAggregateModel"
import { SettingsAggregateModelSelector } from "./SettingsAggregateModel.base"
import { SettingsModel, SettingsModelType } from "./SettingsModel"
import { SettingsModelSelector } from "./SettingsModel.base"
import { UsersAggregateModel, UsersAggregateModelType } from "./UsersAggregateModel"
import { UsersAggregateModelSelector } from "./UsersAggregateModel.base"
import { UsersModel, UsersModelType } from "./UsersModel"
import { UsersModelSelector } from "./UsersModel.base"
import { VulnerabilitiesAggregateModel, VulnerabilitiesAggregateModelType } from "./VulnerabilitiesAggregateModel"
import { VulnerabilitiesAggregateModelSelector } from "./VulnerabilitiesAggregateModel.base"
import { VulnerabilitiesModel, VulnerabilitiesModelType } from "./VulnerabilitiesModel"
import { VulnerabilitiesModelSelector } from "./VulnerabilitiesModel.base"
import { VulnerabilityPackagesAggregateModel, VulnerabilityPackagesAggregateModelType } from "./VulnerabilityPackagesAggregateModel"
import { VulnerabilityPackagesAggregateModelSelector } from "./VulnerabilityPackagesAggregateModel.base"
import { VulnerabilityPackagesModel, VulnerabilityPackagesModelType } from "./VulnerabilityPackagesModel"
import { VulnerabilityPackagesModelSelector } from "./VulnerabilityPackagesModel.base"
import { RootStoreType } from "./index"


/**
 * SubscriptionRootBase
 * auto generated base class for the model SubscriptionRootModel.
 */
export const SubscriptionRootModelBase = ModelBase
  .named('SubscriptionRoot')
  .props({
    __typename: types.optional(types.literal("subscription_root"), "subscription_root"),
    /** An array relationship */
    findings: types.union(types.undefined, types.array(types.late((): any => FindingsModel))),
    /** An aggregate relationship */
    findings_aggregate: types.union(types.undefined, types.late((): any => FindingsAggregateModel)),
    /** fetch data from the table: "findings" using primary key columns */
    findings_by_pk: types.union(types.undefined, types.null, types.late((): any => FindingsModel)),
    /** fetch data from the table: "organization_user" */
    organization_user: types.union(types.undefined, types.array(types.late((): any => OrganizationUserModel))),
    /** fetch aggregated fields from the table: "organization_user" */
    organization_user_aggregate: types.union(types.undefined, types.late((): any => OrganizationUserAggregateModel)),
    /** fetch data from the table: "organization_user" using primary key columns */
    organization_user_by_pk: types.union(types.undefined, types.null, types.late((): any => OrganizationUserModel)),
    /** fetch data from the table: "organizations" */
    organizations: types.union(types.undefined, types.array(types.late((): any => OrganizationsModel))),
    /** fetch aggregated fields from the table: "organizations" */
    organizations_aggregate: types.union(types.undefined, types.late((): any => OrganizationsAggregateModel)),
    /** fetch data from the table: "organizations" using primary key columns */
    organizations_by_pk: types.union(types.undefined, types.null, types.late((): any => OrganizationsModel)),
    /** fetch data from the table: "package_versions" */
    package_versions: types.union(types.undefined, types.array(types.late((): any => PackageVersionsModel))),
    /** fetch aggregated fields from the table: "package_versions" */
    package_versions_aggregate: types.union(types.undefined, types.late((): any => PackageVersionsAggregateModel)),
    /** fetch data from the table: "package_versions" using primary key columns */
    package_versions_by_pk: types.union(types.undefined, types.null, types.late((): any => PackageVersionsModel)),
    /** An array relationship */
    projects: types.union(types.undefined, types.array(types.late((): any => ProjectsModel))),
    /** An aggregate relationship */
    projects_aggregate: types.union(types.undefined, types.late((): any => ProjectsAggregateModel)),
    /** fetch data from the table: "projects" using primary key columns */
    projects_by_pk: types.union(types.undefined, types.null, types.late((): any => ProjectsModel)),
    /** An array relationship */
    related_vulnerabilities: types.union(types.undefined, types.array(types.late((): any => RelatedVulnerabilitiesModel))),
    /** An aggregate relationship */
    related_vulnerabilities_aggregate: types.union(types.undefined, types.late((): any => RelatedVulnerabilitiesAggregateModel)),
    /** fetch data from the table: "related_vulnerabilities" using primary key columns */
    related_vulnerabilities_by_pk: types.union(types.undefined, types.null, types.late((): any => RelatedVulnerabilitiesModel)),
    /** fetch data from the table: "reports" */
    reports: types.union(types.undefined, types.array(types.late((): any => ReportsModel))),
    /** An aggregate relationship */
    reports_aggregate: types.union(types.undefined, types.late((): any => ReportsAggregateModel)),
    /** fetch data from the table: "reports" using primary key columns */
    reports_by_pk: types.union(types.undefined, types.null, types.late((): any => ReportsModel)),
    /** fetch data from the table: "sboms" */
    sboms: types.union(types.undefined, types.array(types.late((): any => SbomsModel))),
    /** fetch aggregated fields from the table: "sboms" */
    sboms_aggregate: types.union(types.undefined, types.late((): any => SbomsAggregateModel)),
    /** fetch data from the table: "sboms" using primary key columns */
    sboms_by_pk: types.union(types.undefined, types.null, types.late((): any => SbomsModel)),
    /** An array relationship */
    scans: types.union(types.undefined, types.array(types.late((): any => ScansModel))),
    /** An aggregate relationship */
    scans_aggregate: types.union(types.undefined, types.late((): any => ScansAggregateModel)),
    /** fetch data from the table: "scans" using primary key columns */
    scans_by_pk: types.union(types.undefined, types.null, types.late((): any => ScansModel)),
    /** fetch data from the table: "settings" */
    settings: types.union(types.undefined, types.array(types.late((): any => SettingsModel))),
    /** fetch aggregated fields from the table: "settings" */
    settings_aggregate: types.union(types.undefined, types.late((): any => SettingsAggregateModel)),
    /** fetch data from the table: "settings" using primary key columns */
    settings_by_pk: types.union(types.undefined, types.null, types.late((): any => SettingsModel)),
    /** fetch data from the table: "users" */
    users: types.union(types.undefined, types.array(types.late((): any => UsersModel))),
    /** fetch aggregated fields from the table: "users" */
    users_aggregate: types.union(types.undefined, types.late((): any => UsersAggregateModel)),
    /** fetch data from the table: "users" using primary key columns */
    users_by_pk: types.union(types.undefined, types.null, types.late((): any => UsersModel)),
    /** fetch data from the table: "vulnerabilities" */
    vulnerabilities: types.union(types.undefined, types.array(types.late((): any => VulnerabilitiesModel))),
    /** fetch aggregated fields from the table: "vulnerabilities" */
    vulnerabilities_aggregate: types.union(types.undefined, types.late((): any => VulnerabilitiesAggregateModel)),
    /** fetch data from the table: "vulnerabilities" using primary key columns */
    vulnerabilities_by_pk: types.union(types.undefined, types.null, types.late((): any => VulnerabilitiesModel)),
    /** An array relationship */
    vulnerability_packages: types.union(types.undefined, types.array(types.late((): any => VulnerabilityPackagesModel))),
    /** An aggregate relationship */
    vulnerability_packages_aggregate: types.union(types.undefined, types.late((): any => VulnerabilityPackagesAggregateModel)),
    /** fetch data from the table: "vulnerability_packages" using primary key columns */
    vulnerability_packages_by_pk: types.union(types.undefined, types.null, types.late((): any => VulnerabilityPackagesModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class SubscriptionRootModelSelector extends QueryBuilder {
  findings(builder?: string | FindingsModelSelector | ((selector: FindingsModelSelector) => FindingsModelSelector)) { return this.__child(`findings`, FindingsModelSelector, builder) }
  findings_aggregate(builder?: string | FindingsAggregateModelSelector | ((selector: FindingsAggregateModelSelector) => FindingsAggregateModelSelector)) { return this.__child(`findings_aggregate`, FindingsAggregateModelSelector, builder) }
  findings_by_pk(builder?: string | FindingsModelSelector | ((selector: FindingsModelSelector) => FindingsModelSelector)) { return this.__child(`findings_by_pk`, FindingsModelSelector, builder) }
  organization_user(builder?: string | OrganizationUserModelSelector | ((selector: OrganizationUserModelSelector) => OrganizationUserModelSelector)) { return this.__child(`organization_user`, OrganizationUserModelSelector, builder) }
  organization_user_aggregate(builder?: string | OrganizationUserAggregateModelSelector | ((selector: OrganizationUserAggregateModelSelector) => OrganizationUserAggregateModelSelector)) { return this.__child(`organization_user_aggregate`, OrganizationUserAggregateModelSelector, builder) }
  organization_user_by_pk(builder?: string | OrganizationUserModelSelector | ((selector: OrganizationUserModelSelector) => OrganizationUserModelSelector)) { return this.__child(`organization_user_by_pk`, OrganizationUserModelSelector, builder) }
  organizations(builder?: string | OrganizationsModelSelector | ((selector: OrganizationsModelSelector) => OrganizationsModelSelector)) { return this.__child(`organizations`, OrganizationsModelSelector, builder) }
  organizations_aggregate(builder?: string | OrganizationsAggregateModelSelector | ((selector: OrganizationsAggregateModelSelector) => OrganizationsAggregateModelSelector)) { return this.__child(`organizations_aggregate`, OrganizationsAggregateModelSelector, builder) }
  organizations_by_pk(builder?: string | OrganizationsModelSelector | ((selector: OrganizationsModelSelector) => OrganizationsModelSelector)) { return this.__child(`organizations_by_pk`, OrganizationsModelSelector, builder) }
  package_versions(builder?: string | PackageVersionsModelSelector | ((selector: PackageVersionsModelSelector) => PackageVersionsModelSelector)) { return this.__child(`package_versions`, PackageVersionsModelSelector, builder) }
  package_versions_aggregate(builder?: string | PackageVersionsAggregateModelSelector | ((selector: PackageVersionsAggregateModelSelector) => PackageVersionsAggregateModelSelector)) { return this.__child(`package_versions_aggregate`, PackageVersionsAggregateModelSelector, builder) }
  package_versions_by_pk(builder?: string | PackageVersionsModelSelector | ((selector: PackageVersionsModelSelector) => PackageVersionsModelSelector)) { return this.__child(`package_versions_by_pk`, PackageVersionsModelSelector, builder) }
  projects(builder?: string | ProjectsModelSelector | ((selector: ProjectsModelSelector) => ProjectsModelSelector)) { return this.__child(`projects`, ProjectsModelSelector, builder) }
  projects_aggregate(builder?: string | ProjectsAggregateModelSelector | ((selector: ProjectsAggregateModelSelector) => ProjectsAggregateModelSelector)) { return this.__child(`projects_aggregate`, ProjectsAggregateModelSelector, builder) }
  projects_by_pk(builder?: string | ProjectsModelSelector | ((selector: ProjectsModelSelector) => ProjectsModelSelector)) { return this.__child(`projects_by_pk`, ProjectsModelSelector, builder) }
  related_vulnerabilities(builder?: string | RelatedVulnerabilitiesModelSelector | ((selector: RelatedVulnerabilitiesModelSelector) => RelatedVulnerabilitiesModelSelector)) { return this.__child(`related_vulnerabilities`, RelatedVulnerabilitiesModelSelector, builder) }
  related_vulnerabilities_aggregate(builder?: string | RelatedVulnerabilitiesAggregateModelSelector | ((selector: RelatedVulnerabilitiesAggregateModelSelector) => RelatedVulnerabilitiesAggregateModelSelector)) { return this.__child(`related_vulnerabilities_aggregate`, RelatedVulnerabilitiesAggregateModelSelector, builder) }
  related_vulnerabilities_by_pk(builder?: string | RelatedVulnerabilitiesModelSelector | ((selector: RelatedVulnerabilitiesModelSelector) => RelatedVulnerabilitiesModelSelector)) { return this.__child(`related_vulnerabilities_by_pk`, RelatedVulnerabilitiesModelSelector, builder) }
  reports(builder?: string | ReportsModelSelector | ((selector: ReportsModelSelector) => ReportsModelSelector)) { return this.__child(`reports`, ReportsModelSelector, builder) }
  reports_aggregate(builder?: string | ReportsAggregateModelSelector | ((selector: ReportsAggregateModelSelector) => ReportsAggregateModelSelector)) { return this.__child(`reports_aggregate`, ReportsAggregateModelSelector, builder) }
  reports_by_pk(builder?: string | ReportsModelSelector | ((selector: ReportsModelSelector) => ReportsModelSelector)) { return this.__child(`reports_by_pk`, ReportsModelSelector, builder) }
  sboms(builder?: string | SbomsModelSelector | ((selector: SbomsModelSelector) => SbomsModelSelector)) { return this.__child(`sboms`, SbomsModelSelector, builder) }
  sboms_aggregate(builder?: string | SbomsAggregateModelSelector | ((selector: SbomsAggregateModelSelector) => SbomsAggregateModelSelector)) { return this.__child(`sboms_aggregate`, SbomsAggregateModelSelector, builder) }
  sboms_by_pk(builder?: string | SbomsModelSelector | ((selector: SbomsModelSelector) => SbomsModelSelector)) { return this.__child(`sboms_by_pk`, SbomsModelSelector, builder) }
  scans(builder?: string | ScansModelSelector | ((selector: ScansModelSelector) => ScansModelSelector)) { return this.__child(`scans`, ScansModelSelector, builder) }
  scans_aggregate(builder?: string | ScansAggregateModelSelector | ((selector: ScansAggregateModelSelector) => ScansAggregateModelSelector)) { return this.__child(`scans_aggregate`, ScansAggregateModelSelector, builder) }
  scans_by_pk(builder?: string | ScansModelSelector | ((selector: ScansModelSelector) => ScansModelSelector)) { return this.__child(`scans_by_pk`, ScansModelSelector, builder) }
  settings(builder?: string | SettingsModelSelector | ((selector: SettingsModelSelector) => SettingsModelSelector)) { return this.__child(`settings`, SettingsModelSelector, builder) }
  settings_aggregate(builder?: string | SettingsAggregateModelSelector | ((selector: SettingsAggregateModelSelector) => SettingsAggregateModelSelector)) { return this.__child(`settings_aggregate`, SettingsAggregateModelSelector, builder) }
  settings_by_pk(builder?: string | SettingsModelSelector | ((selector: SettingsModelSelector) => SettingsModelSelector)) { return this.__child(`settings_by_pk`, SettingsModelSelector, builder) }
  users(builder?: string | UsersModelSelector | ((selector: UsersModelSelector) => UsersModelSelector)) { return this.__child(`users`, UsersModelSelector, builder) }
  users_aggregate(builder?: string | UsersAggregateModelSelector | ((selector: UsersAggregateModelSelector) => UsersAggregateModelSelector)) { return this.__child(`users_aggregate`, UsersAggregateModelSelector, builder) }
  users_by_pk(builder?: string | UsersModelSelector | ((selector: UsersModelSelector) => UsersModelSelector)) { return this.__child(`users_by_pk`, UsersModelSelector, builder) }
  vulnerabilities(builder?: string | VulnerabilitiesModelSelector | ((selector: VulnerabilitiesModelSelector) => VulnerabilitiesModelSelector)) { return this.__child(`vulnerabilities`, VulnerabilitiesModelSelector, builder) }
  vulnerabilities_aggregate(builder?: string | VulnerabilitiesAggregateModelSelector | ((selector: VulnerabilitiesAggregateModelSelector) => VulnerabilitiesAggregateModelSelector)) { return this.__child(`vulnerabilities_aggregate`, VulnerabilitiesAggregateModelSelector, builder) }
  vulnerabilities_by_pk(builder?: string | VulnerabilitiesModelSelector | ((selector: VulnerabilitiesModelSelector) => VulnerabilitiesModelSelector)) { return this.__child(`vulnerabilities_by_pk`, VulnerabilitiesModelSelector, builder) }
  vulnerability_packages(builder?: string | VulnerabilityPackagesModelSelector | ((selector: VulnerabilityPackagesModelSelector) => VulnerabilityPackagesModelSelector)) { return this.__child(`vulnerability_packages`, VulnerabilityPackagesModelSelector, builder) }
  vulnerability_packages_aggregate(builder?: string | VulnerabilityPackagesAggregateModelSelector | ((selector: VulnerabilityPackagesAggregateModelSelector) => VulnerabilityPackagesAggregateModelSelector)) { return this.__child(`vulnerability_packages_aggregate`, VulnerabilityPackagesAggregateModelSelector, builder) }
  vulnerability_packages_by_pk(builder?: string | VulnerabilityPackagesModelSelector | ((selector: VulnerabilityPackagesModelSelector) => VulnerabilityPackagesModelSelector)) { return this.__child(`vulnerability_packages_by_pk`, VulnerabilityPackagesModelSelector, builder) }
}
export function selectFromSubscriptionRoot() {
  return new SubscriptionRootModelSelector()
}

export const subscriptionRootModelPrimitives = selectFromSubscriptionRoot()
