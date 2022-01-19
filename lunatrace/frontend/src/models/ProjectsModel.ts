import { Instance } from "mobx-state-tree"
import { ProjectsModelBase } from "./ProjectsModel.base"

/* The TypeScript type of an instance of ProjectsModel */
export interface ProjectsModelType extends Instance<typeof ProjectsModel.Type> {}

/* A graphql query fragment builders for ProjectsModel */
export { selectFromProjects, projectsModelPrimitives, ProjectsModelSelector } from "./ProjectsModel.base"

/**
 * ProjectsModel
 *
 * columns and relationships of "projects"
 */
export const ProjectsModel = ProjectsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
