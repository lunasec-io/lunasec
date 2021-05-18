import {Command, flags} from '@oclif/command'
import {SecureResolver} from "@lunasec/node-sdk";

export default class Deploy extends Command {
  static description = 'Deploy Lunasec secure resolvers'

  static examples = []

  static flags = {
    help: flags.help({char: 'h'}),
    containerURI: flags.string({char: 'c', description: 'container uri', required: true}),
  }

  static args = []

  async run() {
    const {flags} = this.parse(Deploy)

    if (flags.containerURI === undefined) {
      throw new Error("Unable to deploy secure resolver: container URI is not defined.")
    }

    const secureResolver = new SecureResolver();

    const res = await secureResolver.deploy(flags.containerURI);
    console.log(res);
  }
}
