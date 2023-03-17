//
// Code generated by go-jet DO NOT EDIT.
//
// WARNING: Changes to this file may cause incorrect behavior
// and will be lost if the code is regenerated
//

package table

import (
	"github.com/go-jet/jet/v2/postgres"
)

var Package = newPackageTable("package", "package", "")

type packageTable struct {
	postgres.Table

	//Columns
	ID                  postgres.ColumnString
	PackageManager      postgres.ColumnString
	CustomRegistry      postgres.ColumnString
	Name                postgres.ColumnString
	Description         postgres.ColumnString
	UpstreamData        postgres.ColumnString
	LastFailedFetch     postgres.ColumnTimestampz
	LastSuccessfulFetch postgres.ColumnTimestampz
	Internal            postgres.ColumnBool
	ReadmeText          postgres.ColumnString
	UseCaseSummary      postgres.ColumnString

	AllColumns     postgres.ColumnList
	MutableColumns postgres.ColumnList
}

type PackageTable struct {
	packageTable

	EXCLUDED packageTable
}

// AS creates new PackageTable with assigned alias
func (a PackageTable) AS(alias string) *PackageTable {
	return newPackageTable(a.SchemaName(), a.TableName(), alias)
}

// Schema creates new PackageTable with assigned schema name
func (a PackageTable) FromSchema(schemaName string) *PackageTable {
	return newPackageTable(schemaName, a.TableName(), a.Alias())
}

// WithPrefix creates new PackageTable with assigned table prefix
func (a PackageTable) WithPrefix(prefix string) *PackageTable {
	return newPackageTable(a.SchemaName(), prefix+a.TableName(), a.TableName())
}

// WithSuffix creates new PackageTable with assigned table suffix
func (a PackageTable) WithSuffix(suffix string) *PackageTable {
	return newPackageTable(a.SchemaName(), a.TableName()+suffix, a.TableName())
}

func newPackageTable(schemaName, tableName, alias string) *PackageTable {
	return &PackageTable{
		packageTable: newPackageTableImpl(schemaName, tableName, alias),
		EXCLUDED:     newPackageTableImpl("", "excluded", ""),
	}
}

func newPackageTableImpl(schemaName, tableName, alias string) packageTable {
	var (
		IDColumn                  = postgres.StringColumn("id")
		PackageManagerColumn      = postgres.StringColumn("package_manager")
		CustomRegistryColumn      = postgres.StringColumn("custom_registry")
		NameColumn                = postgres.StringColumn("name")
		DescriptionColumn         = postgres.StringColumn("description")
		UpstreamDataColumn        = postgres.StringColumn("upstream_data")
		LastFailedFetchColumn     = postgres.TimestampzColumn("last_failed_fetch")
		LastSuccessfulFetchColumn = postgres.TimestampzColumn("last_successful_fetch")
		InternalColumn            = postgres.BoolColumn("internal")
		ReadmeTextColumn          = postgres.StringColumn("readme_text")
		UseCaseSummaryColumn      = postgres.StringColumn("use_case_summary")
		allColumns                = postgres.ColumnList{IDColumn, PackageManagerColumn, CustomRegistryColumn, NameColumn, DescriptionColumn, UpstreamDataColumn, LastFailedFetchColumn, LastSuccessfulFetchColumn, InternalColumn, ReadmeTextColumn, UseCaseSummaryColumn}
		mutableColumns            = postgres.ColumnList{PackageManagerColumn, CustomRegistryColumn, NameColumn, DescriptionColumn, UpstreamDataColumn, LastFailedFetchColumn, LastSuccessfulFetchColumn, InternalColumn, ReadmeTextColumn, UseCaseSummaryColumn}
	)

	return packageTable{
		Table: postgres.NewTable(schemaName, tableName, alias, allColumns...),

		//Columns
		ID:                  IDColumn,
		PackageManager:      PackageManagerColumn,
		CustomRegistry:      CustomRegistryColumn,
		Name:                NameColumn,
		Description:         DescriptionColumn,
		UpstreamData:        UpstreamDataColumn,
		LastFailedFetch:     LastFailedFetchColumn,
		LastSuccessfulFetch: LastSuccessfulFetchColumn,
		Internal:            InternalColumn,
		ReadmeText:          ReadmeTextColumn,
		UseCaseSummary:      UseCaseSummaryColumn,

		AllColumns:     allColumns,
		MutableColumns: mutableColumns,
	}
}
