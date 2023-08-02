import { ColumnsType } from "antd/es/table";
import {IList,deleteUser,setCount,editActive,searchUser,setEditId,} from "../../store";
import {Table as AntdTable,Button,Space,Checkbox,Row,Col,Input,} from "antd";
import { RootState, store } from "../../store/store";
import { useSelector } from "react-redux";
import { Minus, Plus } from "../../assets/icons";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useState } from "react";
import AddModal from "../modal/Modal";
function increment(id: string) {
	store.dispatch(setCount({ id, type: "increment" }));
}
function decrement(id: string) {
	store.dispatch(setCount({ id, type: "decrement" }));
}
function removeUser(id: string) {
	store.dispatch(deleteUser({ id }));
}
function onActiveChange(e: CheckboxChangeEvent, id: string) {
	store.dispatch(
		editActive({
			id,
			is_active: e.target.checked,
		}),
	);
}
const columns: ColumnsType<IList> = [
	{ title: "FirstName", dataIndex: "first_name", key: "first_name" },
	{ title: "LastName", dataIndex: "last_name", key: "last_name" },
	{ title: "UserName", dataIndex: "username", key: "username" },
	{
		title: "Count",
		dataIndex: "count",
		key: "count",
		render: (count, record, _key) => {
			return (
				<Space>
					<Button 
						type='primary'
						icon={<Minus />}
						danger
						onClick={() => decrement(record?.id)}
					/>
					{count}
					<Button
						type='primary'
						icon={<Plus />}
						onClick={() => increment(record?.id)}
					/>
				</Space>
			);
		},
	},
	{
		title: "Active",
		dataIndex: "active",
		key: "active",
		render: (is_active, record, _key) => {
			return (
				<Checkbox
					onChange={(e) => onActiveChange(e, record?.id)}
					checked={is_active}></Checkbox>
			);
		},
	},
	{
		title: "Action",
		render: (record, _key) => (
			<>
				<Button
					size='small'
					type='primary'
					onClick={() => store.dispatch(setEditId(record?.id))}>
					Edit
				</Button>
				<Button
					style={{ marginLeft: "10px" }}
					size='small'
					type='primary'
					danger
					onClick={() => removeUser(record?.id)}>
					Delete
				</Button>
			</>
		),
	},
];
function Table() {
	const list = useSelector((s: RootState) => s.main.list);
	const notIcludedIds = useSelector((s: RootState) => s.main.notIncludedIds);
	const [text, setText] = useState("");
	const [active, setActive] = useState(false);
	return (
		<>
			<Row style={{ margin: "10px", marginBottom:"5px"  }}>
				<Col span={8}>
					<Input
						type='text'
						bordered={true}
						name=''
						placeholder='search'
						size='middle'
						id=''
						value={text}
						onChange={(e) => {
							setText(e.target.value);
							store.dispatch(
								searchUser({
									id: e.target.value,
									active: active,
									ignore: true,
								}),
							);
						}}
					/>
				</Col>
				<Col span={8}>
					<Checkbox
						style={{  marginTop:"5px",marginLeft:"20px" }}
						type='checkbox'
						name=''
						id=''
						checked={active}
						onChange={(e) => {
							setActive(e.target.checked);
							store.dispatch(
								searchUser({
									id: text,
									active: e.target.checked,
									ignore: false,
								}),
							);
						}}
					/>
				</Col>
				<AddModal />
			</Row>
			<AntdTable 
				columns={columns}
				dataSource={list.filter(
					(item,_key): boolean => !notIcludedIds.find((i) => item.id === i),
				)}
				size='small'
				pagination={false}
			/>
		</>
	);
}
export default Table;
