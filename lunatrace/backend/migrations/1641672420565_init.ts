/*
 * Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

// These can be async if necessary
export function up(pgm: MigrationBuilder) {
  pgm.createTable('users', {
    id: { type: 'uuid', primaryKey: true },
    name: { type: 'varchar(200)', notNull: true },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.createTable('settings', {
    id: { type: 'uuid', primaryKey: true },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    is_org_settings: 'boolean',
  });

  pgm.createTable('organizations', {
    id: { type: 'uuid', primaryKey: true },
    name: { type: 'varchar(200)', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    settings_id: { type: 'uuid', references: '"settings"' },
  });

  pgm.createTable('projects', {
    id: { type: 'uuid', primaryKey: true },
    name: { type: 'varchar(500)', notNull: true },
    repo: { type: 'varchar(500)' },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    settings_id: { type: 'uuid', references: '"settings"' },
    organization_id: { type: 'uuid', references: '"organizations"' },
  });

  pgm.createTable('sboms', {
    id: { type: 'uuid', primaryKey: true },
    s3_url: { type: 'text' },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.createTable('vulnerabilities', {
    id: { type: 'uuid', primaryKey: true },
    name: { type: 'text', unique: true },
    related_vulnerability_id: { type: 'uuid', references: '"vulnerabilities"' }, // Secondary vulns are chained off of the primary vuln using this foreign key
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.createTable('scans', {
    id: { type: 'uuid', primaryKey: true },
    project_id: { type: 'uuid', references: '"projects"' },
    sbom_id: { type: 'uuid', references: '"sboms"' },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.createTable('findings', {
    id: { type: 'uuid', primaryKey: true },
    vulnerability_id: { type: 'uuid', references: '"vulnerabilities"' },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
}

export function down(pgm: MigrationBuilder) {
  pgm.dropTable('findings');
  pgm.dropTable('scans');
  pgm.dropTable('vulnerabilities');
  pgm.dropTable('sboms');
  pgm.dropTable('projects');
  pgm.dropTable('organizations');
  pgm.dropTable('settings');
  pgm.dropTable('users');
}
