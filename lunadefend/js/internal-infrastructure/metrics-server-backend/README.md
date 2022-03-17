<!--
  ~ Copyright by LunaSec (owned by Refinery Labs, Inc)
  ~
  ~ Licensed under the Creative Commons Attribution-ShareAlike 4.0 International
  ~ (the "License"); you may not use this file except in compliance with the
  ~ License. You may obtain a copy of the License at
  ~
  ~ https://creativecommons.org/licenses/by-sa/4.0/legalcode
  ~
  ~ See the License for the specific language governing permissions and
  ~ limitations under the License.
  ~
-->
# Metrics Backend Server
This is the backend application server to receive analytics metricsConfig from a LunaSec deployment.

The only purpose of this server is to receive metricsConfig and store them in the database. Metrics are used by the LunaSec
development team to track adoption, feature usage, and to generally understand the community of users better.

## Athena Queries
This isn't a part of the CDK because the Athena CDK SDK is... Raw CloudFormation.
I could use Glue Data Catalogue but eh, this is good enough!

### Creating Table
You have to run this before you can run any queries against Athena. It just tells Athena how to work
with the JSON data stored in S3.

```sql
CREATE EXTERNAL TABLE IF NOT EXISTS lunasec_usage_metrics (
  `version` STRING,
  stack_id STRING,
  metrics struct<`tokenizeSuccess`:INTEGER,
              tokenizeFailure:INTEGER,
              detokenizeSuccess:INTEGER,
              detokenizeFailure:INTEGER,
              createGrantSuccess:INTEGER,
              createGrantFailure:INTEGER
              >,
  clientIP STRING
)
PARTITIONED BY (year string, month string, day string, hour string)
ROW FORMAT SERDE 'org.openx.data.jsonserde.JsonSerDe'
WITH SERDEPROPERTIES ( 'ignore.malformed.json' = 'true')
LOCATION 's3://<S3_METRICS_BUCKET>/metrics/';
```

### Adding Partitions
You have to scan for partitions before you can run queries. Otherwise, you will see only old data
or you will see nothing (if you never ran it).
```sql
MSCK REPAIR TABLE lunasec_usage_metrics;
```

### Querying
Now you can run queries as you would expect to in normal SQL :)

```sql
SELECT * FROM lunasec_usage_metrics;
```

If you want to see what file something came from, you can grab it like this:
```sql
SELECT "$PATH", * FROM "lunasec_usage_metrics";
```
