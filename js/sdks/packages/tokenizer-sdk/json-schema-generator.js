const tsj = require("ts-json-schema-generator");
const fs = require("fs");

const config = {
  path: "src/api/types.ts",
  type: "*", // Or <type-name> if you want to generate schema for that one type only
  schemaId: 'http://wwww.lunasec.io/tokenizer/schema' // Just a name for the schema, its supposed to be a web URL for some reason
};

const output_path = "./src/tokenizer-request-schema.json";

const schema = tsj.createGenerator(config).createSchema(config.type);
console.log('generated schema')
const schemaString = JSON.stringify(schema, null, 2);
fs.writeFile(output_path, schemaString, (err) => {
  if (err) throw err;
});



