/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { createStoreContext, createUseQueryHook } from "mst-gql"
import * as React from "react"
import { RootStoreType } from "./RootStore"

export const StoreContext = createStoreContext<RootStoreType>(React)

export const useQuery = createUseQueryHook(StoreContext, React)
