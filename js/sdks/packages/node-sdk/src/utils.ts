import {
  LunaSecDeploymentTemplateArray,
  LunaSecDeploymentTemplates
} from "./types";

export function getLunasecDeploymentTemplate(s: string): LunaSecDeploymentTemplates {
  const found = LunaSecDeploymentTemplateArray.indexOf(s as LunaSecDeploymentTemplates) !== -1;
  if (!found) {
    throw new Error(`provided string is not a valid LunaSec deployment template ${s}`);
  }
  return s as LunaSecDeploymentTemplates;
}
