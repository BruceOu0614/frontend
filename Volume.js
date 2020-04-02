import React from 'react'

import { Container, Form, Button } from 'react-bootstrap'

import {Layout, Menu, Empty, Progress, DatePicker} from 'antd'    
import { Avatar, Badge, PageHeader, Breadcrumb, Card, Col, Row, Affix, Transfer, Tree } from 'antd';
import { Steps, message, Checkbox } from 'antd';
// import { Header, Sider, Content } from '@antd-design/layout'
import { UserOutlined, EditOutlined, BookOutlined, HistoryOutlined, SettingOutlined, MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons';
import { QuestionCircleOutlined, BellOutlined, DownOutlined } from '@ant-design/icons';
import './Volume.css'
import school_logo_url from '../SHCH.png';
import tera_thinker_logo_url from '../tera_thinker_logo.png';
import avatar_photo from '../ellipse.png';
import { useState } from 'react';

const { Header, Sider, Content } = Layout;
const { TreeNode } = Tree;
const { Step } = Steps;

class Volume extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			collapsed: false,
			targetKeys: [],
			current: 0,
		}
		
		this.toggle = this.toggle.bind(this);
		this.transferOnChange = this.transferOnChange.bind(this);
		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);
	}

	

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};

	transferOnChange = targetKeys => {
		console.log('Target Keys:', targetKeys);
		this.setState({ targetKeys });
	};

	next() {
		const current = this.state.current + 1;
		this.setState({ current });
	}

	prev() {
		const current = this.state.current - 1;
		this.setState({ current });
	}

	handleSearch(direction, value) {
		console.log('direction:', direction, 'value', value);
	}

	handlefilterOption(inputValue, option) {
		return option.title.indexOf(inputValue) > -1;
	}

	render() {

		let school_logo;
		let tera_thinker_logo;

		const routes = [
			{
				path: 'index',
				breadcrumbName: '首頁',
			},
			{
				path: 'first',
				breadcrumbName: '組卷精靈',
			},
		];

		const generateTree = (treeNodes = [], checkedKeys = []) => {
			return treeNodes.map(({ children, ...props }) => (
				<TreeNode {...props} disabled={checkedKeys.includes(props.key)} key={props.key}>
					{console.log("props.key.length: "), props.key.length>1}
					{generateTree(children, checkedKeys)}
				</TreeNode>
			));
		};

		const generateTree2 = (treeNodes = [], checkedKeys = [], le) => {
			return treeNodes.map(({ children, ...props }) => (
				<TreeNode {...props} disabled={checkedKeys.includes(props.key)} key={props.key}>
					{console.log("key:", props.key.length)}
					{console.log("le:", le)}
					if (props.key.length > le) {generateTree2(children, checkedKeys, le+2)}
					else return;
				</TreeNode>
			));
		};

		const isChecked = (selectedKeys, eventKey) => {
			return selectedKeys.indexOf(eventKey) !== -1;
		};

		const treeData = [
			{ key:'1', title:'1 地圖概說', children:
																		[{key:'1-1', title:'1-1 地圖要素'}, {key:'1-2', title:'1-2 地圖投影', children:
																																																				[{key:'1-2-1', title:'1-2-1 投影原理'}, {key:'1-2-2', title:'1-2-2 臺灣橫麥卡托二度分帶座標系統'}],},
																		{key:'1-3', title:'1-3 地圖的種類與判讀', children:
																																						[{key:'1-3-1', title:'1-3-1 地圖種類'}, {key:'1-3-2', title:'1-3-2 地圖判讀'}],
																		},

																		],},
			{
				key: '2',
				title: '2 地理資訊系統(GIS)',
				children: [{ key: '2-1', title: '2-1 地理資料的處理' }, { key: '2-2', title: '2-2 GIS的分析與應用' }],
			},
			{ key: '3', 
				title: '3 地形',
				children: [{ key: '3-1', title: '3-1 風化與崩壞作用'}, { key: '3-2', title: '3-2 火山地形' }, { key: '3-3', title: '3-3 冰河地形'}, { key: '3-4', title: '3-4 海岸地形' }], },
		];

		const TreeTransfer = ({ dataSource, targetKeys, ...restProps }) => {
			const transferDataSource = [];
			function flatten(list = []) {
				list.forEach(item => {
					transferDataSource.push(item);
					flatten(item.children);
				});
			}
			flatten(dataSource);

			console.log('dataSource: ', dataSource);
			console.log('transferDataSource: ', transferDataSource);
			// console.log('Tree: ', generateTree(dataSource, targetKeys));

			const handlefilterOption = (inputValue, option) =>  option.title.indexOf(inputValue) > -1;
			
			// const handleSearch = (direction, value) => filteredItems= (TransferItem) => TransferItem(value);

			return (
				<Transfer
					{...restProps}
					targetKeys={targetKeys}
					dataSource={transferDataSource}
					className="tree-transfer"
					render={item => (item.title)}
					showSelectAll={false}
					showSearch
					filterOption={this.handlefilterOption}
					onSearch={this.handleSearch}
					// filteredItems
				>
					{({ direction, onItemSelect, selectedKeys ,filteredItems}) => {
						if (direction === 'left') {
							const checkedKeys = [...selectedKeys, ...targetKeys];
							return (
								<Tree
									blockNode
									checkable
									checkStrictly
									defaultExpandAll
									checkedKeys={checkedKeys}
									onCheck={(
										_,
										{
											node: {
												props: { eventKey },
											},
										},
									) => {
										onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
									}}
									onSelect={(
										_,
										{
											node: {
												props: { eventKey },
											},
										},
									) => {
										onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
									}}
								>
									{console.log("filteredItems:", (filteredItems))}
									
									
									{generateTree(dataSource, targetKeys)}
									
									{console.log("dataSource2:", dataSource)}
									{console.log("Tree2:", generateTree2((filteredItems), targetKeys, filteredItems[0].key.length))}
								</Tree>
							);
						}
					}}
				</Transfer>
			);
		};

		const steps = [
			{
				title: '選擇出題範圍',
			},
			{
				title: '指定題目或配額',
			},
			{
				title: '預覽',
			},
		];

		const current = this.state.current;

		if (!this.state.collapsed) {
			school_logo = <div className="school-logo-wraper-uncollapsed">
											<img className="logo-img-uncollapsed" src={school_logo_url} alt="logo" />
											<span className="school-name">國立中興大學附屬高級中學</span>
										</div>
			tera_thinker_logo = <img className="tera-logo-img-uncollapsed" src={tera_thinker_logo_url} alt="logo" />
		}
		else {
			school_logo = <div >
											<img className="logo-img-collapsed" src={school_logo_url} alt="logo" />
										</div>
			tera_thinker_logo = <img className="tera-logo-img-collapsed" src={tera_thinker_logo_url} alt="logo" />
		}

		return ( 
			<Layout className="whole-layout">
				<Sider className="left-sider-layout" width="256" collapsedWidth="80" theme="light" trigger={null} collapsible collapsed={this.state.collapsed}>
					{school_logo}
					<Menu className="left-menu-layout" style={{color: 'black'}} inlineCollapsed={this.state.collapsed} inlineIndent="20" theme="light" mode="inline" defaultSelectedKeys={['1']}>
						<Menu.Item key="1">
							<UserOutlined />
							<span>個人總覽</span>
						</Menu.Item>
						<Menu.Item key="2">
							<EditOutlined />
							<span>線上練習</span>
						</Menu.Item>
						<Menu.Item key="3">
							<BookOutlined />
							<span>指定作業</span>
						</Menu.Item>
						<Menu.Item key="4">
							<HistoryOutlined />
							<span>測驗歷史</span>
						</Menu.Item>
						<Menu.Item key="5">
							<SettingOutlined />
							<span>個人設定</span>
						</Menu.Item>
					</Menu>
					{tera_thinker_logo}
					
				</Sider>
				<Layout className="site-layout">
					<Header className="site-layout-header" style={this.state.collapsed ? {left: 80} : {}}>
						{React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
							className: 'trigger',
							onClick: this.toggle,
						})}
						<span className="group-18">
							
							<span className="question-circle">
								<QuestionCircleOutlined className="vector" style={{fontSize:'20px'}}/>
							</span>
							
							<span className="group-17">
								<Badge count={12} className="badge">
									<BellOutlined /*className="bell"*/ style={{fontSize:'20px'}}/>
								</Badge>
							</span>

							
							<span className="user">
								<Avatar src={avatar_photo} size="small" className="avatar-photo" />
								<span className="frame-15">
									<span className="frame-15-text">
										楊淳佑
									</span>
									<span>
										<DownOutlined className="frame-15-icon"/>
									</span>
								</span>
							</span>
						</span>

						
					</Header>
					
					<PageHeader
						className="site-page-header"
						title="組卷精靈"
						breadcrumb={{ routes }}
						style={this.state.collapsed ? {left: 80} : {}}
					/>

					<Content className="site-layout-content">
							
						
						
						<div className='main-content' style={this.state.collapsed ? {left: 104} : {}}>
							<Steps current={current} className="steps-bar" style={{marginBottom:'0px', paddingBottom:'0px', bottom:'0px'}}>
								{steps.map(item => (
									<Step key={item.title} title={item.title} />
								))}
							</Steps>
							<div className="steps-content">
								<TreeTransfer className="transfer" titles={['所有章節','已選章節']} dataSource={treeData} 
									targetKeys={this.state.targetKeys} onChange={this.transferOnChange} 
									style={{marginTop:'0px', paddingTop:'0px'}} 
										listStyle={{
									width: 250,
									// height: 3000,
									top: 0,
									marginTop: 0,
									// paddingTop: 100
								}}/>
							</div>
							<div className="steps-action">
								{current < steps.length - 1 && (
									<Button type="primary" onClick={() => this.next()}>
										Next
									</Button>
								)}
								{current === steps.length - 1 && (
									<Button type="primary" onClick={() => message.success('Processing complete!')}>
										Done
									</Button>
								)}
							</div>
						</div>

					</Content>
				</Layout>
			</Layout>
		);
	
	}
}

export default Volume
