import { Instance } from "mobx-state-tree"
import { ProjectsMaxFieldsModelBase } from "./ProjectsMaxFieldsModel.base"

/* The TypeScript type of an instance of ProjectsMaxFieldsModel */
export interface ProjectsMaxFieldsModelType extends Instance<typeof ProjectsMaxFieldsModel.Type> {}

/* A graphql query fragment builders for ProjectsMaxFieldsModel */
export { selectFromProjectsMaxFields, projectsMaxFieldsModelPrimitives, ProjectsMaxFieldsModelSelector } from "./ProjectsMaxFieldsModel.base"

/**
 * ProjectsMaxFieldsModel
 *
 * aggregate max on columns
 */
export const ProjectsMaxFieldsModel = ProjectsMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
