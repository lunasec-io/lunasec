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
/// <reference types="./vendor-typings/sqlite3" />
import { Database } from 'sqlite';
import sqlite3 from 'sqlite3';
export interface UserModel {
    id: string;
    username: string;
    ssn_token?: string;
}
export interface UserWithPasswordHash extends UserModel {
    salt: string;
    hashed_password: string;
}
export declare class UserMethods {
    db: Database<sqlite3.Database, sqlite3.Statement>;
    constructor(db: Database<sqlite3.Database, sqlite3.Statement>);
    setSsn(id: string, ssnToken: string): Promise<void>;
    getUser(id: string): Promise<UserModel | null>;
    getUserWithPasswordHash(username: string): Promise<UserWithPasswordHash | undefined>;
    createNewUser(userFields: {
        password: string;
        username: string;
    }): Promise<UserModel>;
}
//# sourceMappingURL=user.d.ts.map