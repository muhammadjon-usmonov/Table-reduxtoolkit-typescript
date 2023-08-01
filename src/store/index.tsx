import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface IList {
	first_name: string;
	last_name: string;
	username: string;
	count: number;
	active: boolean;
	id: string;
}
export interface CounterState {
	list: IList[];
	notIncludedIds: string[];
	editingId: null | string;
}
const initialState: CounterState = {
	list: [
		{
			id: crypto.randomUUID(),
			first_name: "Anna",
			last_name: "McAlister",
			username: "@mnfo",
			count: 3,
			active:false,
		},
		{
			id: crypto.randomUUID(),
			first_name: "John",
			last_name: "Kevin",
			username: "@talfdj",
			count: 2,
			active: false,
		},
		{
			id: crypto.randomUUID(),
			first_name: "Alisa",
			last_name: "Dragon",
			username: "@kalvin",
			count: 7,
			active: false,
		},
		{
			id: crypto.randomUUID(),
			first_name: "Janna",
			last_name: "Polava",
			username: "@uayt",
			count: 9,
			active: false,
		},
	],
	notIncludedIds: [],
	editingId: null,
};
export const main = createSlice({
	name: "main",
	initialState,
	reducers: {
		setCount: (
			state,
			{
				payload,
			}: PayloadAction<{ id: string; type: "increment" | "decrement" }>,
		) => {
			state.list = state.list.map((item,_key) =>
				item?.id === payload.id
					? {
						...item,
						count:
							payload.type === "increment"
								? item.count + 1
								: item.count - 1,
					  }
					: item)},
		addUser: (
			state,
			{
				payload,
			}: PayloadAction<{
				first_name: string;
				last_name: string;
				username: string;
			}>,
		) => {
			state.list.push({
				id: crypto.randomUUID(),
				count: 0,
				active: true,
				...payload,
			});
		},
		deleteUser: (state, { payload }: PayloadAction<{ id: string }>) => {
			state.list = state.list.filter((item,_key) => item?.id !== payload.id);
		},
		searchUser: (
			state,
			{
				payload,
			}: PayloadAction<{ id: string; active: boolean; ignore: boolean }>,
		) => {
			state.notIncludedIds = [];
			const regex = new RegExp(`.*${payload.id}.*`, "gi");
			for (const item of state.list) {
				if (
					!(
						regex.test(item.first_name) ||
						regex.test(item.last_name) ||
						regex.test(item.username)
					)
				) {
					state.notIncludedIds.push(item.id);
				} else {
					if (payload.active !== item.active) {
						state.notIncludedIds.push(item.id);
					}
				}
			}
		},
		editActive: (
			state,
			{ payload }: PayloadAction<{ id: string; is_active: boolean }>,
		) => {
			state.list = state.list.map((item,_key) =>
				item.id === payload.id
					? { ...item, active: payload.is_active }
					: item,
			);
		},
		editUser: (
			state,
			{ payload }: PayloadAction<Omit<IList, "active" | "count">>,
		) => {
			state.list = state.list.map((item,_key) =>
				{
					return item.id === payload.id ? { ...item, ...payload } : item;
				},
			);
		},
		setEditId: (state, { payload }: PayloadAction<null | string>) => {
			state.editingId = payload;
		},
	},
});
export const {setCount,addUser,deleteUser,searchUser,editActive,editUser,setEditId,} = main.actions;
export default main.reducer;
