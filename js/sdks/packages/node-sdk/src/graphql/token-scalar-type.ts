import { GraphQLScalarType, Kind, ValueNode } from 'graphql';
/**
 * A validation type is injected from a validation directive and serves the purpose of
 * applying the passed constraint to the type.
 *
 * Unfortunately input types don't currently have a "resolve" mechanism from directives
 * so this is a workaround
 */
export const TokenInputType = new GraphQLScalarType({
  name: `Token`,
  description: 'Token type wrapper to do grants on inputs',
  /**
   * Server -> Client
   */
  serialize(value: string) {
    return value;
  },

  /**
   * Client (Variable) -> Server
   */
  parseValue(value: string | string[]) {
    console.log('GOT TOKEN TYPE VALUE FROM CLIENT: ', value);
    return value;
  },

  /**
   * Client (Param) -> Server
   */
  parseLiteral(ast: ValueNode) {
    if (ast.kind === Kind.STRING) {
      console.log('PARSED LITERAL ', ast);
      return ast.value;
    }
    return null;
  },
});
