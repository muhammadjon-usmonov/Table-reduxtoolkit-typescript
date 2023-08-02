import { useEffect, useState } from "react";
import { Button, Modal, Form, Input} from "antd";
import { store, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { addUser,  editUser, setEditId, } from "../../store";
const AddModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const dispatch = useDispatch();
	const editingId = useSelector((state: RootState) => state.main.editingId);
	const [form] = Form.useForm();
	const showModal = () => {setIsModalOpen(true)};
	
	useEffect(() => {
		if (editingId) {
			const row = store.getState().main.list.find((item) => item.id === editingId);
			setIsModalOpen(true);
			form.setFieldsValue({
				username: row?.username,
				last_name: row?.last_name,
				first_name: row?.first_name,
			});
		}
		
	}, [editingId]);
	const handleOk = () => {
		if (!editingId) {
			form.validateFields().then((res) => {
				dispatch(addUser(res));
				setIsModalOpen(false);
			});	
		} else {
			form.validateFields().then((res) => {
				store.dispatch(editUser({
					first_name: res.first_name,
					last_name: res.last_name,
					username: res.username,
					id: editingId
				}))
				setIsModalOpen(false);	
			});	
		}
	};
	const handleCancel = () => {
		dispatch(setEditId(null))
		setIsModalOpen(false);
	};
	return (
		<>
			<Button
				type='primary'
				size="middle"
				
				style={{  display: "inline" }}
				onClick={showModal}>
				ADD
			</Button>
			<Modal
				title=  {editingId? "Edit": "ADD"}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}>
				<Form
					form={form}
					autoComplete='off'>
					<Form.Item
						name='first_name'
						required
						rules={[
							{
								required: true,
								message: "Please input your username!",
							},
						]}>
						<Input placeholder='First Name ...' />
					</Form.Item>
					<Form.Item 
						name='last_name'
						required
						rules={[
							{
								required: true,
								message: "Please input your username!",
							},
						]}>
						<Input placeholder='Last Name ...' />
					</Form.Item>
					<Form.Item
						name='username'
						required
						rules={[
							{
								required: true,
								message: "Please input your username!",
							},
						]}>
						<Input placeholder='User Name ...' />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
export default AddModal;
