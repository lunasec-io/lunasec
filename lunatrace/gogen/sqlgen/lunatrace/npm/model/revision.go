//
// Code generated by go-jet DO NOT EDIT.
//
// WARNING: Changes to this file may cause incorrect behavior
// and will be lost if the code is regenerated
//

package model

type Revision struct {
	Rev     string
	ID      string
	Doc     string
	Deleted bool
	Seq     int32 `sql:"primary_key"`
}