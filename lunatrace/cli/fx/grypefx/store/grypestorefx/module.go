// Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
package grypestorefx

//func LoadVulnerabilityDB(cfg db.Config, update bool) (v3.StoreReader, *db.Status, error) {
//	dbCurator, err := db.NewCurator(cfg)
//	if err != nil {
//		return nil, nil, err
//	}
//
//	if update {
//		log.Debug().Msg("looking for updates on vulnerability database")
//		_, err := dbCurator.Update()
//		if err != nil {
//			return nil, nil, err
//		}
//	}
//
//	store, err := dbCurator.GetStore()
//	if err != nil {
//		return nil, nil, err
//	}
//
//	status := dbCurator.Status()
//
//	return store, &status, status.Err
//}
