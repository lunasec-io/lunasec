import { Command, flags } from '@oclif/command';
import {LunaSecDeployment, LunaSecDeploymentTemplates, getLunasecDeploymentTemplate} from "@lunasec/node-sdk";

export default class Info extends Command {
  static description = 'Get information about a deployment'

  static examples = [];

  static flags = {
    help: flags.help({ char: 'h' }),
    projectTemplate: flags.string({ char: 't', description: 'project template', required: true }),
    deploymentId: flags.string({ char: 'd', description: 'deployment id', required: false }),
    deploymentTag: flags.string({ char: 'd', description: 'deployment tag', required: false }),
  };

  static args = [];

  async run() {
    const {flags} = this.parse(Info)

    const projectTemplate: LunaSecDeploymentTemplates = getLunasecDeploymentTemplate(flags.projectTemplate);

    const lunasecDeployment = new LunaSecDeployment({
      projectTemplate: projectTemplate,
    });

    const deployment = await lunasecDeployment.getDeployment({
      deploymentId: flags.deploymentId,
      deploymentTag: flags.deploymentTag,
    });

    const resourcesDeployed = deployment.deployment_json.workflow_states.length;
    const deploymentTag = deployment.tag;
    const secrets = deployment.deployment_json.secrets;
    const workflowStates = deployment.deployment_json.workflow_states.map((ws) => ({
        name: ws.name,
        type: ws.type
    }));
    console.log({
      resourcesDeployed,
      deploymentTag,
      secrets,
      workflowStates
    });
  }
}
