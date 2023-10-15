import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

import { GroupingState, OrderingState } from "../types"

const initialGroupingState: GroupingState = {
	selectedGroupingValue: "status",
}

const initialOrderingState: OrderingState = {
	selectedOrderingValue: "priority",
}

let localStorageGroupingState: string | null = ""
let localStorageOrderingState: string | null = ""

const localStorageState = async () => {
	localStorageGroupingState = await storage.getItem("grouping")
	localStorageOrderingState = await storage.getItem("ordering")
}

localStorageState()

const persistedGroupingState = localStorageGroupingState
	? JSON.parse(localStorageGroupingState)
	: initialGroupingState

const persistedOrderingState = localStorageOrderingState
	? JSON.parse(localStorageOrderingState)
	: initialOrderingState

const GroupingSlice = createSlice({
	name: "grouping",
	initialState: persistedGroupingState,
	reducers: {
		setSelectedGroupingValue: (state, action: PayloadAction<string>) => {
			state.selectedGroupingValue = action.payload
		},
	},
})

const OrderingSlice = createSlice({
	name: "ordering",
	initialState: persistedOrderingState,
	reducers: {
		setSelectedOrderingValue: (state, action: PayloadAction<string>) => {
			state.selectedOrderingValue = action.payload
		},
	},
})

export const { setSelectedGroupingValue } = GroupingSlice.actions
export const { setSelectedOrderingValue } = OrderingSlice.actions

const persistConfig = {
	key: "root",
	storage,
}

const persistedGroupingReducer = persistReducer(persistConfig, GroupingSlice.reducer)
const persistedOrderingReducer = persistReducer(persistConfig, OrderingSlice.reducer)

export const store = configureStore({
	reducer: {
		grouping: persistedGroupingReducer,
		ordering: persistedOrderingReducer,
	},
})

export const persister = persistStore(store)
