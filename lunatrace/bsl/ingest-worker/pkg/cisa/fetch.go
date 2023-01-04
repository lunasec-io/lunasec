// Copyright by LunaSec (owned by Refinery Labs, Inc)
//
// Licensed under the Business Source License v1.1
// (the "License"); you may not use this file except in compliance with the
// License. You may obtain a copy of the License at
//
// https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
//
// See the License for the specific language governing permissions and
// limitations under the License.
package cisa

import (
  "bytes"
  "encoding/csv"
  "fmt"
  "github.com/rs/zerolog/log"
  "io"
  "net/http"
  "regexp"
)

// CisaKnownVulnerability represents a single row in the CISA CSV file
// "cveID","vendorProject","product","vulnerabilityName","dateAdded","shortDescription","requiredAction","dueDate","notes"
type CisaKnownVulnerability struct {
  Cve               string
  VendorProject     string
  Product           string
  VulnerabilityName string
  DateAdded         string
  ShortDescription  string
  RequiredAction    string
  DueDate           string
  Notes             string
}

func FetchCisaKnownVulns() ([]CisaKnownVulnerability, error) {
  // Download the file
  response, err := http.Get("https://www.cisa.gov/sites/default/files/csv/known_exploited_vulnerabilities.csv")
  if err != nil {
    fmt.Printf("Error downloading CISA file: %v\n", err)
    return nil, err
  }
  defer response.Body.Close()

  body, err := io.ReadAll(response.Body)
  if err != nil {
    log.Error().Err(err).Msg("failed to read cwe data")
    return nil, err
  }

  buf := bytes.NewReader(body)

  // Create a new CSV reader
  csvReader := csv.NewReader(buf)

  csvReader.FieldsPerRecord = 9

  // The data looks like this:
  // "cveID","vendorProject","product","vulnerabilityName","dateAdded","shortDescription","requiredAction","dueDate","notes"
  // "CVE-2021-27104","vendor","prod","vuln_name","2021-11-03","description","action","2021-11-17",""

  // Read the first header row
  _, err = csvReader.Read()
  if err != nil {
    fmt.Printf("Error reading CSV header: %v\n", err)
    return nil, err
  }

  // Read the rest of the rows
  rows, err := csvReader.ReadAll()
  if err != nil {
    fmt.Printf("Error reading CSV rows: %v\n", err)
    return nil, err
  }

  // Regex to verify that cvePair.Cve is a valid CVE
  cveRegex, err := regexp.Compile(`^CVE-\d{4}-\d+$`)

  dateRegex, err := regexp.Compile(`^\d{4}-\d{2}-\d{2}$`)

  cisaScores := make([]CisaKnownVulnerability, 0, len(rows))

  // Create an array of EpssVulnerability objects
  for _, row := range rows {
    cve := row[0]
    vendorProject := row[1]
    product := row[2]
    vulnerabilityName := row[3]
    dateAdded := row[4]
    shortDescription := row[5]
    requiredAction := row[6]
    dueDate := row[7]
    notes := row[8]

    // Validates that the CVE is not a SQL injection payload :)
    if !cveRegex.MatchString(cve) {
      return nil, fmt.Errorf("invalid cve %s", cve)
    }

    if !dateRegex.MatchString(dateAdded) {
      return nil, fmt.Errorf("invalid added date %s", dateAdded)
    }

    if !dateRegex.MatchString(dueDate) {
      return nil, fmt.Errorf("invalid due date %s", dueDate)
    }

    cisaScores = append(cisaScores, CisaKnownVulnerability{
      Cve:               cve,
      VendorProject:     vendorProject,
      Product:           product,
      VulnerabilityName: vulnerabilityName,
      DateAdded:         dateAdded,
      ShortDescription:  shortDescription,
      RequiredAction:    requiredAction,
      DueDate:           dueDate,
      Notes:             notes,
    })
  }

  return cisaScores, nil
}
