import { Instance } from "mobx-state-tree"
import { ProjectsMinFieldsModelBase } from "./ProjectsMinFieldsModel.base"

/* The TypeScript type of an instance of ProjectsMinFieldsModel */
export interface ProjectsMinFieldsModelType extends Instance<typeof ProjectsMinFieldsModel.Type> {}

/* A graphql query fragment builders for ProjectsMinFieldsModel */
export { selectFromProjectsMinFields, projectsMinFieldsModelPrimitives, ProjectsMinFieldsModelSelector } from "./ProjectsMinFieldsModel.base"

/**
 * ProjectsMinFieldsModel
 *
 * aggregate min on columns
 */
export const ProjectsMinFieldsModel = ProjectsMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
