/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { FindingsModel, FindingsModelType } from "./FindingsModel"
import { FindingsModelSelector } from "./FindingsModel.base"
import { FindingsMutationResponseModel, FindingsMutationResponseModelType } from "./FindingsMutationResponseModel"
import { FindingsMutationResponseModelSelector } from "./FindingsMutationResponseModel.base"
import { OrganizationUserModel, OrganizationUserModelType } from "./OrganizationUserModel"
import { OrganizationUserModelSelector } from "./OrganizationUserModel.base"
import { OrganizationUserMutationResponseModel, OrganizationUserMutationResponseModelType } from "./OrganizationUserMutationResponseModel"
import { OrganizationUserMutationResponseModelSelector } from "./OrganizationUserMutationResponseModel.base"
import { OrganizationsModel, OrganizationsModelType } from "./OrganizationsModel"
import { OrganizationsModelSelector } from "./OrganizationsModel.base"
import { OrganizationsMutationResponseModel, OrganizationsMutationResponseModelType } from "./OrganizationsMutationResponseModel"
import { OrganizationsMutationResponseModelSelector } from "./OrganizationsMutationResponseModel.base"
import { PackageVersionsModel, PackageVersionsModelType } from "./PackageVersionsModel"
import { PackageVersionsModelSelector } from "./PackageVersionsModel.base"
import { PackageVersionsMutationResponseModel, PackageVersionsMutationResponseModelType } from "./PackageVersionsMutationResponseModel"
import { PackageVersionsMutationResponseModelSelector } from "./PackageVersionsMutationResponseModel.base"
import { ProjectsModel, ProjectsModelType } from "./ProjectsModel"
import { ProjectsModelSelector } from "./ProjectsModel.base"
import { ProjectsMutationResponseModel, ProjectsMutationResponseModelType } from "./ProjectsMutationResponseModel"
import { ProjectsMutationResponseModelSelector } from "./ProjectsMutationResponseModel.base"
import { RelatedVulnerabilitiesModel, RelatedVulnerabilitiesModelType } from "./RelatedVulnerabilitiesModel"
import { RelatedVulnerabilitiesModelSelector } from "./RelatedVulnerabilitiesModel.base"
import { RelatedVulnerabilitiesMutationResponseModel, RelatedVulnerabilitiesMutationResponseModelType } from "./RelatedVulnerabilitiesMutationResponseModel"
import { RelatedVulnerabilitiesMutationResponseModelSelector } from "./RelatedVulnerabilitiesMutationResponseModel.base"
import { ReportsModel, ReportsModelType } from "./ReportsModel"
import { ReportsModelSelector } from "./ReportsModel.base"
import { ReportsMutationResponseModel, ReportsMutationResponseModelType } from "./ReportsMutationResponseModel"
import { ReportsMutationResponseModelSelector } from "./ReportsMutationResponseModel.base"
import { SbomsModel, SbomsModelType } from "./SbomsModel"
import { SbomsModelSelector } from "./SbomsModel.base"
import { SbomsMutationResponseModel, SbomsMutationResponseModelType } from "./SbomsMutationResponseModel"
import { SbomsMutationResponseModelSelector } from "./SbomsMutationResponseModel.base"
import { ScansModel, ScansModelType } from "./ScansModel"
import { ScansModelSelector } from "./ScansModel.base"
import { ScansMutationResponseModel, ScansMutationResponseModelType } from "./ScansMutationResponseModel"
import { ScansMutationResponseModelSelector } from "./ScansMutationResponseModel.base"
import { SettingsModel, SettingsModelType } from "./SettingsModel"
import { SettingsModelSelector } from "./SettingsModel.base"
import { SettingsMutationResponseModel, SettingsMutationResponseModelType } from "./SettingsMutationResponseModel"
import { SettingsMutationResponseModelSelector } from "./SettingsMutationResponseModel.base"
import { UsersModel, UsersModelType } from "./UsersModel"
import { UsersModelSelector } from "./UsersModel.base"
import { UsersMutationResponseModel, UsersMutationResponseModelType } from "./UsersMutationResponseModel"
import { UsersMutationResponseModelSelector } from "./UsersMutationResponseModel.base"
import { VulnerabilitiesModel, VulnerabilitiesModelType } from "./VulnerabilitiesModel"
import { VulnerabilitiesModelSelector } from "./VulnerabilitiesModel.base"
import { VulnerabilitiesMutationResponseModel, VulnerabilitiesMutationResponseModelType } from "./VulnerabilitiesMutationResponseModel"
import { VulnerabilitiesMutationResponseModelSelector } from "./VulnerabilitiesMutationResponseModel.base"
import { VulnerabilityPackagesModel, VulnerabilityPackagesModelType } from "./VulnerabilityPackagesModel"
import { VulnerabilityPackagesModelSelector } from "./VulnerabilityPackagesModel.base"
import { VulnerabilityPackagesMutationResponseModel, VulnerabilityPackagesMutationResponseModelType } from "./VulnerabilityPackagesMutationResponseModel"
import { VulnerabilityPackagesMutationResponseModelSelector } from "./VulnerabilityPackagesMutationResponseModel.base"
import { RootStoreType } from "./index"


/**
 * MutationRootBase
 * auto generated base class for the model MutationRootModel.
 *
 * mutation root
 */
export const MutationRootModelBase = ModelBase
  .named('MutationRoot')
  .props({
    __typename: types.optional(types.literal("mutation_root"), "mutation_root"),
    /** delete data from the table: "findings" */
    delete_findings: types.union(types.undefined, types.null, types.late((): any => FindingsMutationResponseModel)),
    /** delete single row from the table: "findings" */
    delete_findings_by_pk: types.union(types.undefined, types.null, types.late((): any => FindingsModel)),
    /** delete data from the table: "organization_user" */
    delete_organization_user: types.union(types.undefined, types.null, types.late((): any => OrganizationUserMutationResponseModel)),
    /** delete single row from the table: "organization_user" */
    delete_organization_user_by_pk: types.union(types.undefined, types.null, types.late((): any => OrganizationUserModel)),
    /** delete data from the table: "organizations" */
    delete_organizations: types.union(types.undefined, types.null, types.late((): any => OrganizationsMutationResponseModel)),
    /** delete single row from the table: "organizations" */
    delete_organizations_by_pk: types.union(types.undefined, types.null, types.late((): any => OrganizationsModel)),
    /** delete data from the table: "package_versions" */
    delete_package_versions: types.union(types.undefined, types.null, types.late((): any => PackageVersionsMutationResponseModel)),
    /** delete single row from the table: "package_versions" */
    delete_package_versions_by_pk: types.union(types.undefined, types.null, types.late((): any => PackageVersionsModel)),
    /** delete data from the table: "projects" */
    delete_projects: types.union(types.undefined, types.null, types.late((): any => ProjectsMutationResponseModel)),
    /** delete single row from the table: "projects" */
    delete_projects_by_pk: types.union(types.undefined, types.null, types.late((): any => ProjectsModel)),
    /** delete data from the table: "related_vulnerabilities" */
    delete_related_vulnerabilities: types.union(types.undefined, types.null, types.late((): any => RelatedVulnerabilitiesMutationResponseModel)),
    /** delete single row from the table: "related_vulnerabilities" */
    delete_related_vulnerabilities_by_pk: types.union(types.undefined, types.null, types.late((): any => RelatedVulnerabilitiesModel)),
    /** delete data from the table: "reports" */
    delete_reports: types.union(types.undefined, types.null, types.late((): any => ReportsMutationResponseModel)),
    /** delete single row from the table: "reports" */
    delete_reports_by_pk: types.union(types.undefined, types.null, types.late((): any => ReportsModel)),
    /** delete data from the table: "sboms" */
    delete_sboms: types.union(types.undefined, types.null, types.late((): any => SbomsMutationResponseModel)),
    /** delete single row from the table: "sboms" */
    delete_sboms_by_pk: types.union(types.undefined, types.null, types.late((): any => SbomsModel)),
    /** delete data from the table: "scans" */
    delete_scans: types.union(types.undefined, types.null, types.late((): any => ScansMutationResponseModel)),
    /** delete single row from the table: "scans" */
    delete_scans_by_pk: types.union(types.undefined, types.null, types.late((): any => ScansModel)),
    /** delete data from the table: "settings" */
    delete_settings: types.union(types.undefined, types.null, types.late((): any => SettingsMutationResponseModel)),
    /** delete single row from the table: "settings" */
    delete_settings_by_pk: types.union(types.undefined, types.null, types.late((): any => SettingsModel)),
    /** delete data from the table: "users" */
    delete_users: types.union(types.undefined, types.null, types.late((): any => UsersMutationResponseModel)),
    /** delete single row from the table: "users" */
    delete_users_by_pk: types.union(types.undefined, types.null, types.late((): any => UsersModel)),
    /** delete data from the table: "vulnerabilities" */
    delete_vulnerabilities: types.union(types.undefined, types.null, types.late((): any => VulnerabilitiesMutationResponseModel)),
    /** delete single row from the table: "vulnerabilities" */
    delete_vulnerabilities_by_pk: types.union(types.undefined, types.null, types.late((): any => VulnerabilitiesModel)),
    /** delete data from the table: "vulnerability_packages" */
    delete_vulnerability_packages: types.union(types.undefined, types.null, types.late((): any => VulnerabilityPackagesMutationResponseModel)),
    /** delete single row from the table: "vulnerability_packages" */
    delete_vulnerability_packages_by_pk: types.union(types.undefined, types.null, types.late((): any => VulnerabilityPackagesModel)),
    /** insert data into the table: "findings" */
    insert_findings: types.union(types.undefined, types.null, types.late((): any => FindingsMutationResponseModel)),
    /** insert a single row into the table: "findings" */
    insert_findings_one: types.union(types.undefined, types.null, types.late((): any => FindingsModel)),
    /** insert data into the table: "organization_user" */
    insert_organization_user: types.union(types.undefined, types.null, types.late((): any => OrganizationUserMutationResponseModel)),
    /** insert a single row into the table: "organization_user" */
    insert_organization_user_one: types.union(types.undefined, types.null, types.late((): any => OrganizationUserModel)),
    /** insert data into the table: "organizations" */
    insert_organizations: types.union(types.undefined, types.null, types.late((): any => OrganizationsMutationResponseModel)),
    /** insert a single row into the table: "organizations" */
    insert_organizations_one: types.union(types.undefined, types.null, types.late((): any => OrganizationsModel)),
    /** insert data into the table: "package_versions" */
    insert_package_versions: types.union(types.undefined, types.null, types.late((): any => PackageVersionsMutationResponseModel)),
    /** insert a single row into the table: "package_versions" */
    insert_package_versions_one: types.union(types.undefined, types.null, types.late((): any => PackageVersionsModel)),
    /** insert data into the table: "projects" */
    insert_projects: types.union(types.undefined, types.null, types.late((): any => ProjectsMutationResponseModel)),
    /** insert a single row into the table: "projects" */
    insert_projects_one: types.union(types.undefined, types.null, types.late((): any => ProjectsModel)),
    /** insert data into the table: "related_vulnerabilities" */
    insert_related_vulnerabilities: types.union(types.undefined, types.null, types.late((): any => RelatedVulnerabilitiesMutationResponseModel)),
    /** insert a single row into the table: "related_vulnerabilities" */
    insert_related_vulnerabilities_one: types.union(types.undefined, types.null, types.late((): any => RelatedVulnerabilitiesModel)),
    /** insert data into the table: "reports" */
    insert_reports: types.union(types.undefined, types.null, types.late((): any => ReportsMutationResponseModel)),
    /** insert a single row into the table: "reports" */
    insert_reports_one: types.union(types.undefined, types.null, types.late((): any => ReportsModel)),
    /** insert data into the table: "sboms" */
    insert_sboms: types.union(types.undefined, types.null, types.late((): any => SbomsMutationResponseModel)),
    /** insert a single row into the table: "sboms" */
    insert_sboms_one: types.union(types.undefined, types.null, types.late((): any => SbomsModel)),
    /** insert data into the table: "scans" */
    insert_scans: types.union(types.undefined, types.null, types.late((): any => ScansMutationResponseModel)),
    /** insert a single row into the table: "scans" */
    insert_scans_one: types.union(types.undefined, types.null, types.late((): any => ScansModel)),
    /** insert data into the table: "settings" */
    insert_settings: types.union(types.undefined, types.null, types.late((): any => SettingsMutationResponseModel)),
    /** insert a single row into the table: "settings" */
    insert_settings_one: types.union(types.undefined, types.null, types.late((): any => SettingsModel)),
    /** insert data into the table: "users" */
    insert_users: types.union(types.undefined, types.null, types.late((): any => UsersMutationResponseModel)),
    /** insert a single row into the table: "users" */
    insert_users_one: types.union(types.undefined, types.null, types.late((): any => UsersModel)),
    /** insert data into the table: "vulnerabilities" */
    insert_vulnerabilities: types.union(types.undefined, types.null, types.late((): any => VulnerabilitiesMutationResponseModel)),
    /** insert a single row into the table: "vulnerabilities" */
    insert_vulnerabilities_one: types.union(types.undefined, types.null, types.late((): any => VulnerabilitiesModel)),
    /** insert data into the table: "vulnerability_packages" */
    insert_vulnerability_packages: types.union(types.undefined, types.null, types.late((): any => VulnerabilityPackagesMutationResponseModel)),
    /** insert a single row into the table: "vulnerability_packages" */
    insert_vulnerability_packages_one: types.union(types.undefined, types.null, types.late((): any => VulnerabilityPackagesModel)),
    /** update data of the table: "findings" */
    update_findings: types.union(types.undefined, types.null, types.late((): any => FindingsMutationResponseModel)),
    /** update single row of the table: "findings" */
    update_findings_by_pk: types.union(types.undefined, types.null, types.late((): any => FindingsModel)),
    /** update data of the table: "organization_user" */
    update_organization_user: types.union(types.undefined, types.null, types.late((): any => OrganizationUserMutationResponseModel)),
    /** update single row of the table: "organization_user" */
    update_organization_user_by_pk: types.union(types.undefined, types.null, types.late((): any => OrganizationUserModel)),
    /** update data of the table: "organizations" */
    update_organizations: types.union(types.undefined, types.null, types.late((): any => OrganizationsMutationResponseModel)),
    /** update single row of the table: "organizations" */
    update_organizations_by_pk: types.union(types.undefined, types.null, types.late((): any => OrganizationsModel)),
    /** update data of the table: "package_versions" */
    update_package_versions: types.union(types.undefined, types.null, types.late((): any => PackageVersionsMutationResponseModel)),
    /** update single row of the table: "package_versions" */
    update_package_versions_by_pk: types.union(types.undefined, types.null, types.late((): any => PackageVersionsModel)),
    /** update data of the table: "projects" */
    update_projects: types.union(types.undefined, types.null, types.late((): any => ProjectsMutationResponseModel)),
    /** update single row of the table: "projects" */
    update_projects_by_pk: types.union(types.undefined, types.null, types.late((): any => ProjectsModel)),
    /** update data of the table: "related_vulnerabilities" */
    update_related_vulnerabilities: types.union(types.undefined, types.null, types.late((): any => RelatedVulnerabilitiesMutationResponseModel)),
    /** update single row of the table: "related_vulnerabilities" */
    update_related_vulnerabilities_by_pk: types.union(types.undefined, types.null, types.late((): any => RelatedVulnerabilitiesModel)),
    /** update data of the table: "reports" */
    update_reports: types.union(types.undefined, types.null, types.late((): any => ReportsMutationResponseModel)),
    /** update single row of the table: "reports" */
    update_reports_by_pk: types.union(types.undefined, types.null, types.late((): any => ReportsModel)),
    /** update data of the table: "sboms" */
    update_sboms: types.union(types.undefined, types.null, types.late((): any => SbomsMutationResponseModel)),
    /** update single row of the table: "sboms" */
    update_sboms_by_pk: types.union(types.undefined, types.null, types.late((): any => SbomsModel)),
    /** update data of the table: "scans" */
    update_scans: types.union(types.undefined, types.null, types.late((): any => ScansMutationResponseModel)),
    /** update single row of the table: "scans" */
    update_scans_by_pk: types.union(types.undefined, types.null, types.late((): any => ScansModel)),
    /** update data of the table: "settings" */
    update_settings: types.union(types.undefined, types.null, types.late((): any => SettingsMutationResponseModel)),
    /** update single row of the table: "settings" */
    update_settings_by_pk: types.union(types.undefined, types.null, types.late((): any => SettingsModel)),
    /** update data of the table: "users" */
    update_users: types.union(types.undefined, types.null, types.late((): any => UsersMutationResponseModel)),
    /** update single row of the table: "users" */
    update_users_by_pk: types.union(types.undefined, types.null, types.late((): any => UsersModel)),
    /** update data of the table: "vulnerabilities" */
    update_vulnerabilities: types.union(types.undefined, types.null, types.late((): any => VulnerabilitiesMutationResponseModel)),
    /** update single row of the table: "vulnerabilities" */
    update_vulnerabilities_by_pk: types.union(types.undefined, types.null, types.late((): any => VulnerabilitiesModel)),
    /** update data of the table: "vulnerability_packages" */
    update_vulnerability_packages: types.union(types.undefined, types.null, types.late((): any => VulnerabilityPackagesMutationResponseModel)),
    /** update single row of the table: "vulnerability_packages" */
    update_vulnerability_packages_by_pk: types.union(types.undefined, types.null, types.late((): any => VulnerabilityPackagesModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class MutationRootModelSelector extends QueryBuilder {
  delete_findings(builder?: string | FindingsMutationResponseModelSelector | ((selector: FindingsMutationResponseModelSelector) => FindingsMutationResponseModelSelector)) { return this.__child(`delete_findings`, FindingsMutationResponseModelSelector, builder) }
  delete_findings_by_pk(builder?: string | FindingsModelSelector | ((selector: FindingsModelSelector) => FindingsModelSelector)) { return this.__child(`delete_findings_by_pk`, FindingsModelSelector, builder) }
  delete_organization_user(builder?: string | OrganizationUserMutationResponseModelSelector | ((selector: OrganizationUserMutationResponseModelSelector) => OrganizationUserMutationResponseModelSelector)) { return this.__child(`delete_organization_user`, OrganizationUserMutationResponseModelSelector, builder) }
  delete_organization_user_by_pk(builder?: string | OrganizationUserModelSelector | ((selector: OrganizationUserModelSelector) => OrganizationUserModelSelector)) { return this.__child(`delete_organization_user_by_pk`, OrganizationUserModelSelector, builder) }
  delete_organizations(builder?: string | OrganizationsMutationResponseModelSelector | ((selector: OrganizationsMutationResponseModelSelector) => OrganizationsMutationResponseModelSelector)) { return this.__child(`delete_organizations`, OrganizationsMutationResponseModelSelector, builder) }
  delete_organizations_by_pk(builder?: string | OrganizationsModelSelector | ((selector: OrganizationsModelSelector) => OrganizationsModelSelector)) { return this.__child(`delete_organizations_by_pk`, OrganizationsModelSelector, builder) }
  delete_package_versions(builder?: string | PackageVersionsMutationResponseModelSelector | ((selector: PackageVersionsMutationResponseModelSelector) => PackageVersionsMutationResponseModelSelector)) { return this.__child(`delete_package_versions`, PackageVersionsMutationResponseModelSelector, builder) }
  delete_package_versions_by_pk(builder?: string | PackageVersionsModelSelector | ((selector: PackageVersionsModelSelector) => PackageVersionsModelSelector)) { return this.__child(`delete_package_versions_by_pk`, PackageVersionsModelSelector, builder) }
  delete_projects(builder?: string | ProjectsMutationResponseModelSelector | ((selector: ProjectsMutationResponseModelSelector) => ProjectsMutationResponseModelSelector)) { return this.__child(`delete_projects`, ProjectsMutationResponseModelSelector, builder) }
  delete_projects_by_pk(builder?: string | ProjectsModelSelector | ((selector: ProjectsModelSelector) => ProjectsModelSelector)) { return this.__child(`delete_projects_by_pk`, ProjectsModelSelector, builder) }
  delete_related_vulnerabilities(builder?: string | RelatedVulnerabilitiesMutationResponseModelSelector | ((selector: RelatedVulnerabilitiesMutationResponseModelSelector) => RelatedVulnerabilitiesMutationResponseModelSelector)) { return this.__child(`delete_related_vulnerabilities`, RelatedVulnerabilitiesMutationResponseModelSelector, builder) }
  delete_related_vulnerabilities_by_pk(builder?: string | RelatedVulnerabilitiesModelSelector | ((selector: RelatedVulnerabilitiesModelSelector) => RelatedVulnerabilitiesModelSelector)) { return this.__child(`delete_related_vulnerabilities_by_pk`, RelatedVulnerabilitiesModelSelector, builder) }
  delete_reports(builder?: string | ReportsMutationResponseModelSelector | ((selector: ReportsMutationResponseModelSelector) => ReportsMutationResponseModelSelector)) { return this.__child(`delete_reports`, ReportsMutationResponseModelSelector, builder) }
  delete_reports_by_pk(builder?: string | ReportsModelSelector | ((selector: ReportsModelSelector) => ReportsModelSelector)) { return this.__child(`delete_reports_by_pk`, ReportsModelSelector, builder) }
  delete_sboms(builder?: string | SbomsMutationResponseModelSelector | ((selector: SbomsMutationResponseModelSelector) => SbomsMutationResponseModelSelector)) { return this.__child(`delete_sboms`, SbomsMutationResponseModelSelector, builder) }
  delete_sboms_by_pk(builder?: string | SbomsModelSelector | ((selector: SbomsModelSelector) => SbomsModelSelector)) { return this.__child(`delete_sboms_by_pk`, SbomsModelSelector, builder) }
  delete_scans(builder?: string | ScansMutationResponseModelSelector | ((selector: ScansMutationResponseModelSelector) => ScansMutationResponseModelSelector)) { return this.__child(`delete_scans`, ScansMutationResponseModelSelector, builder) }
  delete_scans_by_pk(builder?: string | ScansModelSelector | ((selector: ScansModelSelector) => ScansModelSelector)) { return this.__child(`delete_scans_by_pk`, ScansModelSelector, builder) }
  delete_settings(builder?: string | SettingsMutationResponseModelSelector | ((selector: SettingsMutationResponseModelSelector) => SettingsMutationResponseModelSelector)) { return this.__child(`delete_settings`, SettingsMutationResponseModelSelector, builder) }
  delete_settings_by_pk(builder?: string | SettingsModelSelector | ((selector: SettingsModelSelector) => SettingsModelSelector)) { return this.__child(`delete_settings_by_pk`, SettingsModelSelector, builder) }
  delete_users(builder?: string | UsersMutationResponseModelSelector | ((selector: UsersMutationResponseModelSelector) => UsersMutationResponseModelSelector)) { return this.__child(`delete_users`, UsersMutationResponseModelSelector, builder) }
  delete_users_by_pk(builder?: string | UsersModelSelector | ((selector: UsersModelSelector) => UsersModelSelector)) { return this.__child(`delete_users_by_pk`, UsersModelSelector, builder) }
  delete_vulnerabilities(builder?: string | VulnerabilitiesMutationResponseModelSelector | ((selector: VulnerabilitiesMutationResponseModelSelector) => VulnerabilitiesMutationResponseModelSelector)) { return this.__child(`delete_vulnerabilities`, VulnerabilitiesMutationResponseModelSelector, builder) }
  delete_vulnerabilities_by_pk(builder?: string | VulnerabilitiesModelSelector | ((selector: VulnerabilitiesModelSelector) => VulnerabilitiesModelSelector)) { return this.__child(`delete_vulnerabilities_by_pk`, VulnerabilitiesModelSelector, builder) }
  delete_vulnerability_packages(builder?: string | VulnerabilityPackagesMutationResponseModelSelector | ((selector: VulnerabilityPackagesMutationResponseModelSelector) => VulnerabilityPackagesMutationResponseModelSelector)) { return this.__child(`delete_vulnerability_packages`, VulnerabilityPackagesMutationResponseModelSelector, builder) }
  delete_vulnerability_packages_by_pk(builder?: string | VulnerabilityPackagesModelSelector | ((selector: VulnerabilityPackagesModelSelector) => VulnerabilityPackagesModelSelector)) { return this.__child(`delete_vulnerability_packages_by_pk`, VulnerabilityPackagesModelSelector, builder) }
  insert_findings(builder?: string | FindingsMutationResponseModelSelector | ((selector: FindingsMutationResponseModelSelector) => FindingsMutationResponseModelSelector)) { return this.__child(`insert_findings`, FindingsMutationResponseModelSelector, builder) }
  insert_findings_one(builder?: string | FindingsModelSelector | ((selector: FindingsModelSelector) => FindingsModelSelector)) { return this.__child(`insert_findings_one`, FindingsModelSelector, builder) }
  insert_organization_user(builder?: string | OrganizationUserMutationResponseModelSelector | ((selector: OrganizationUserMutationResponseModelSelector) => OrganizationUserMutationResponseModelSelector)) { return this.__child(`insert_organization_user`, OrganizationUserMutationResponseModelSelector, builder) }
  insert_organization_user_one(builder?: string | OrganizationUserModelSelector | ((selector: OrganizationUserModelSelector) => OrganizationUserModelSelector)) { return this.__child(`insert_organization_user_one`, OrganizationUserModelSelector, builder) }
  insert_organizations(builder?: string | OrganizationsMutationResponseModelSelector | ((selector: OrganizationsMutationResponseModelSelector) => OrganizationsMutationResponseModelSelector)) { return this.__child(`insert_organizations`, OrganizationsMutationResponseModelSelector, builder) }
  insert_organizations_one(builder?: string | OrganizationsModelSelector | ((selector: OrganizationsModelSelector) => OrganizationsModelSelector)) { return this.__child(`insert_organizations_one`, OrganizationsModelSelector, builder) }
  insert_package_versions(builder?: string | PackageVersionsMutationResponseModelSelector | ((selector: PackageVersionsMutationResponseModelSelector) => PackageVersionsMutationResponseModelSelector)) { return this.__child(`insert_package_versions`, PackageVersionsMutationResponseModelSelector, builder) }
  insert_package_versions_one(builder?: string | PackageVersionsModelSelector | ((selector: PackageVersionsModelSelector) => PackageVersionsModelSelector)) { return this.__child(`insert_package_versions_one`, PackageVersionsModelSelector, builder) }
  insert_projects(builder?: string | ProjectsMutationResponseModelSelector | ((selector: ProjectsMutationResponseModelSelector) => ProjectsMutationResponseModelSelector)) { return this.__child(`insert_projects`, ProjectsMutationResponseModelSelector, builder) }
  insert_projects_one(builder?: string | ProjectsModelSelector | ((selector: ProjectsModelSelector) => ProjectsModelSelector)) { return this.__child(`insert_projects_one`, ProjectsModelSelector, builder) }
  insert_related_vulnerabilities(builder?: string | RelatedVulnerabilitiesMutationResponseModelSelector | ((selector: RelatedVulnerabilitiesMutationResponseModelSelector) => RelatedVulnerabilitiesMutationResponseModelSelector)) { return this.__child(`insert_related_vulnerabilities`, RelatedVulnerabilitiesMutationResponseModelSelector, builder) }
  insert_related_vulnerabilities_one(builder?: string | RelatedVulnerabilitiesModelSelector | ((selector: RelatedVulnerabilitiesModelSelector) => RelatedVulnerabilitiesModelSelector)) { return this.__child(`insert_related_vulnerabilities_one`, RelatedVulnerabilitiesModelSelector, builder) }
  insert_reports(builder?: string | ReportsMutationResponseModelSelector | ((selector: ReportsMutationResponseModelSelector) => ReportsMutationResponseModelSelector)) { return this.__child(`insert_reports`, ReportsMutationResponseModelSelector, builder) }
  insert_reports_one(builder?: string | ReportsModelSelector | ((selector: ReportsModelSelector) => ReportsModelSelector)) { return this.__child(`insert_reports_one`, ReportsModelSelector, builder) }
  insert_sboms(builder?: string | SbomsMutationResponseModelSelector | ((selector: SbomsMutationResponseModelSelector) => SbomsMutationResponseModelSelector)) { return this.__child(`insert_sboms`, SbomsMutationResponseModelSelector, builder) }
  insert_sboms_one(builder?: string | SbomsModelSelector | ((selector: SbomsModelSelector) => SbomsModelSelector)) { return this.__child(`insert_sboms_one`, SbomsModelSelector, builder) }
  insert_scans(builder?: string | ScansMutationResponseModelSelector | ((selector: ScansMutationResponseModelSelector) => ScansMutationResponseModelSelector)) { return this.__child(`insert_scans`, ScansMutationResponseModelSelector, builder) }
  insert_scans_one(builder?: string | ScansModelSelector | ((selector: ScansModelSelector) => ScansModelSelector)) { return this.__child(`insert_scans_one`, ScansModelSelector, builder) }
  insert_settings(builder?: string | SettingsMutationResponseModelSelector | ((selector: SettingsMutationResponseModelSelector) => SettingsMutationResponseModelSelector)) { return this.__child(`insert_settings`, SettingsMutationResponseModelSelector, builder) }
  insert_settings_one(builder?: string | SettingsModelSelector | ((selector: SettingsModelSelector) => SettingsModelSelector)) { return this.__child(`insert_settings_one`, SettingsModelSelector, builder) }
  insert_users(builder?: string | UsersMutationResponseModelSelector | ((selector: UsersMutationResponseModelSelector) => UsersMutationResponseModelSelector)) { return this.__child(`insert_users`, UsersMutationResponseModelSelector, builder) }
  insert_users_one(builder?: string | UsersModelSelector | ((selector: UsersModelSelector) => UsersModelSelector)) { return this.__child(`insert_users_one`, UsersModelSelector, builder) }
  insert_vulnerabilities(builder?: string | VulnerabilitiesMutationResponseModelSelector | ((selector: VulnerabilitiesMutationResponseModelSelector) => VulnerabilitiesMutationResponseModelSelector)) { return this.__child(`insert_vulnerabilities`, VulnerabilitiesMutationResponseModelSelector, builder) }
  insert_vulnerabilities_one(builder?: string | VulnerabilitiesModelSelector | ((selector: VulnerabilitiesModelSelector) => VulnerabilitiesModelSelector)) { return this.__child(`insert_vulnerabilities_one`, VulnerabilitiesModelSelector, builder) }
  insert_vulnerability_packages(builder?: string | VulnerabilityPackagesMutationResponseModelSelector | ((selector: VulnerabilityPackagesMutationResponseModelSelector) => VulnerabilityPackagesMutationResponseModelSelector)) { return this.__child(`insert_vulnerability_packages`, VulnerabilityPackagesMutationResponseModelSelector, builder) }
  insert_vulnerability_packages_one(builder?: string | VulnerabilityPackagesModelSelector | ((selector: VulnerabilityPackagesModelSelector) => VulnerabilityPackagesModelSelector)) { return this.__child(`insert_vulnerability_packages_one`, VulnerabilityPackagesModelSelector, builder) }
  update_findings(builder?: string | FindingsMutationResponseModelSelector | ((selector: FindingsMutationResponseModelSelector) => FindingsMutationResponseModelSelector)) { return this.__child(`update_findings`, FindingsMutationResponseModelSelector, builder) }
  update_findings_by_pk(builder?: string | FindingsModelSelector | ((selector: FindingsModelSelector) => FindingsModelSelector)) { return this.__child(`update_findings_by_pk`, FindingsModelSelector, builder) }
  update_organization_user(builder?: string | OrganizationUserMutationResponseModelSelector | ((selector: OrganizationUserMutationResponseModelSelector) => OrganizationUserMutationResponseModelSelector)) { return this.__child(`update_organization_user`, OrganizationUserMutationResponseModelSelector, builder) }
  update_organization_user_by_pk(builder?: string | OrganizationUserModelSelector | ((selector: OrganizationUserModelSelector) => OrganizationUserModelSelector)) { return this.__child(`update_organization_user_by_pk`, OrganizationUserModelSelector, builder) }
  update_organizations(builder?: string | OrganizationsMutationResponseModelSelector | ((selector: OrganizationsMutationResponseModelSelector) => OrganizationsMutationResponseModelSelector)) { return this.__child(`update_organizations`, OrganizationsMutationResponseModelSelector, builder) }
  update_organizations_by_pk(builder?: string | OrganizationsModelSelector | ((selector: OrganizationsModelSelector) => OrganizationsModelSelector)) { return this.__child(`update_organizations_by_pk`, OrganizationsModelSelector, builder) }
  update_package_versions(builder?: string | PackageVersionsMutationResponseModelSelector | ((selector: PackageVersionsMutationResponseModelSelector) => PackageVersionsMutationResponseModelSelector)) { return this.__child(`update_package_versions`, PackageVersionsMutationResponseModelSelector, builder) }
  update_package_versions_by_pk(builder?: string | PackageVersionsModelSelector | ((selector: PackageVersionsModelSelector) => PackageVersionsModelSelector)) { return this.__child(`update_package_versions_by_pk`, PackageVersionsModelSelector, builder) }
  update_projects(builder?: string | ProjectsMutationResponseModelSelector | ((selector: ProjectsMutationResponseModelSelector) => ProjectsMutationResponseModelSelector)) { return this.__child(`update_projects`, ProjectsMutationResponseModelSelector, builder) }
  update_projects_by_pk(builder?: string | ProjectsModelSelector | ((selector: ProjectsModelSelector) => ProjectsModelSelector)) { return this.__child(`update_projects_by_pk`, ProjectsModelSelector, builder) }
  update_related_vulnerabilities(builder?: string | RelatedVulnerabilitiesMutationResponseModelSelector | ((selector: RelatedVulnerabilitiesMutationResponseModelSelector) => RelatedVulnerabilitiesMutationResponseModelSelector)) { return this.__child(`update_related_vulnerabilities`, RelatedVulnerabilitiesMutationResponseModelSelector, builder) }
  update_related_vulnerabilities_by_pk(builder?: string | RelatedVulnerabilitiesModelSelector | ((selector: RelatedVulnerabilitiesModelSelector) => RelatedVulnerabilitiesModelSelector)) { return this.__child(`update_related_vulnerabilities_by_pk`, RelatedVulnerabilitiesModelSelector, builder) }
  update_reports(builder?: string | ReportsMutationResponseModelSelector | ((selector: ReportsMutationResponseModelSelector) => ReportsMutationResponseModelSelector)) { return this.__child(`update_reports`, ReportsMutationResponseModelSelector, builder) }
  update_reports_by_pk(builder?: string | ReportsModelSelector | ((selector: ReportsModelSelector) => ReportsModelSelector)) { return this.__child(`update_reports_by_pk`, ReportsModelSelector, builder) }
  update_sboms(builder?: string | SbomsMutationResponseModelSelector | ((selector: SbomsMutationResponseModelSelector) => SbomsMutationResponseModelSelector)) { return this.__child(`update_sboms`, SbomsMutationResponseModelSelector, builder) }
  update_sboms_by_pk(builder?: string | SbomsModelSelector | ((selector: SbomsModelSelector) => SbomsModelSelector)) { return this.__child(`update_sboms_by_pk`, SbomsModelSelector, builder) }
  update_scans(builder?: string | ScansMutationResponseModelSelector | ((selector: ScansMutationResponseModelSelector) => ScansMutationResponseModelSelector)) { return this.__child(`update_scans`, ScansMutationResponseModelSelector, builder) }
  update_scans_by_pk(builder?: string | ScansModelSelector | ((selector: ScansModelSelector) => ScansModelSelector)) { return this.__child(`update_scans_by_pk`, ScansModelSelector, builder) }
  update_settings(builder?: string | SettingsMutationResponseModelSelector | ((selector: SettingsMutationResponseModelSelector) => SettingsMutationResponseModelSelector)) { return this.__child(`update_settings`, SettingsMutationResponseModelSelector, builder) }
  update_settings_by_pk(builder?: string | SettingsModelSelector | ((selector: SettingsModelSelector) => SettingsModelSelector)) { return this.__child(`update_settings_by_pk`, SettingsModelSelector, builder) }
  update_users(builder?: string | UsersMutationResponseModelSelector | ((selector: UsersMutationResponseModelSelector) => UsersMutationResponseModelSelector)) { return this.__child(`update_users`, UsersMutationResponseModelSelector, builder) }
  update_users_by_pk(builder?: string | UsersModelSelector | ((selector: UsersModelSelector) => UsersModelSelector)) { return this.__child(`update_users_by_pk`, UsersModelSelector, builder) }
  update_vulnerabilities(builder?: string | VulnerabilitiesMutationResponseModelSelector | ((selector: VulnerabilitiesMutationResponseModelSelector) => VulnerabilitiesMutationResponseModelSelector)) { return this.__child(`update_vulnerabilities`, VulnerabilitiesMutationResponseModelSelector, builder) }
  update_vulnerabilities_by_pk(builder?: string | VulnerabilitiesModelSelector | ((selector: VulnerabilitiesModelSelector) => VulnerabilitiesModelSelector)) { return this.__child(`update_vulnerabilities_by_pk`, VulnerabilitiesModelSelector, builder) }
  update_vulnerability_packages(builder?: string | VulnerabilityPackagesMutationResponseModelSelector | ((selector: VulnerabilityPackagesMutationResponseModelSelector) => VulnerabilityPackagesMutationResponseModelSelector)) { return this.__child(`update_vulnerability_packages`, VulnerabilityPackagesMutationResponseModelSelector, builder) }
  update_vulnerability_packages_by_pk(builder?: string | VulnerabilityPackagesModelSelector | ((selector: VulnerabilityPackagesModelSelector) => VulnerabilityPackagesModelSelector)) { return this.__child(`update_vulnerability_packages_by_pk`, VulnerabilityPackagesModelSelector, builder) }
}
export function selectFromMutationRoot() {
  return new MutationRootModelSelector()
}

export const mutationRootModelPrimitives = selectFromMutationRoot()
