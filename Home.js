import React from 'react'

// import { Container, Form, Button } from 'react-bootstrap'

import {Layout, Menu, Empty, Progress, DatePicker} from 'antd'    
import { Avatar, Badge, PageHeader, Card, Col, Row } from 'antd';
// import { Header, Sider, Content } from '@antd-design/layout'
import { UserOutlined, EditOutlined, BookOutlined, HistoryOutlined, SettingOutlined, MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons';
import { QuestionCircleOutlined, BellOutlined, DownOutlined } from '@ant-design/icons';
import './Home.css'
import school_logo_url from '../THHS.png';
import tera_thinker_logo_url from '../tera_thinker_logo.png';
// import { useState } from 'react';

const { Header, Sider, Content } = Layout;

// function demo  ()  {
  
//   const [container, setContainer] = useState(null);
//   return (
//     <div className="scrollable-container" ref={setContainer}>
//       <div className="background">
//         <Affix target={() => container}>
//           <Button type="primary">Fixed at the top of container</Button>
//         </Affix>
//       </div>
//     </div>
//   );
// };

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			studentID: '',
			collapsed: false
		}
		
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.toggle = this.toggle.bind(this);
		this.handleMenuClick = this.handleMenuClick.bind(this);
	}

	handleChange(event) {
		this.setState({
			studentID: event.target.value
		});
	}
	
	handleClick(event) {

		event.preventDefault();
		// fetch("http://127.0.0.1:5000/api/v1/test", {
		//     method: 'POST',
		//     body: JSON.stringify(this.state.studentID),
		//     mode: 'no-cors'

		// })
		// .then(
		//     (result) => {
		//         console.log("OK")
		//     },
		//     (error) => {
		//         console.log("Error")
		//     }
		// )
	
		this.props.onUserProfile(this.state.studentID)

		this.props.onPageState(true)
	}

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};

	handleMenuClick(event) {
		if (event.key===3) {
			this.props.onVolumeState(true)
		}

	}



	render() {
		
		// return (
		//  <div>
		//    <Container>
		//        <Col>
		//          <Form >
		//          {this.state.studentID}
		//            <Form.Group controlId="formBasicUserID">
		//              <Form.Label>學號</Form.Label>
		//              <Form.Control
		//                as="input"
		//                type="text"
		//                value={this.state.studentID}
		//                onChange={this.handleChange}
		//                placeholder="學號"
		//                required
		//              />
		//            </Form.Group>
		//            <Button type="submit" onClick={this.handleClick} variant="primary">開始作答</Button>
		//          </Form>
		//        </Col>
		//    </Container>
		//  </div>
		// );

		// const icons =  { 
		//   MenuUnfoldOutlined,
		//   MenuFoldOutlined,
		//   UserOutlined,
		//   VideoCameraOutlined,
		//   UploadOutlined,
		//  };
		// const Layout = { Header, Sider, Content };

		let school_logo;
		let tera_thinker_logo;

		const routes = [
			{
				path: 'index',
				breadcrumbName: '首頁',
			},
			{
				path: 'first',
				breadcrumbName: '個人總覽',
			},
		];

		

		if (!this.state.collapsed) {
			school_logo = <div className="school-logo-wraper-uncollapsed">
											<img className="logo-img-uncollapsed" src={school_logo_url} alt="logo" />
											<span className="school-name">東海大學附屬高級中學</span>
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
					<Menu className="left-menu-layout" style={{color: 'black'}} inlineCollapsed={this.state.collapsed} inlineIndent="20" theme="light" mode="inline" defaultSelectedKeys={['1']} onClick={this.handleMenuClick}>
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
								<QuestionCircleOutlined className="vector" style={{width:21}}/>
							</span>
							
							<span className="group-17">
								<Badge count={12} className="badge">
									<BellOutlined className="bell" /*style={{width:20, height:20}}*//>
								</Badge>
							</span>

							
							<span className="user">
								<Avatar src="../ellipse.png" size="small" className="avatar-photo" />
								<span className="frame-15">
									<span className="frame-15-text">
										楊淳佑
									</span>
									<span>
										<DownOutlined className="frame-15-icon" />
									</span>
								</span>
							</span>
						</span>

						
					</Header>
					
					<PageHeader
				    className="site-page-header"
				    title="個人總覽"
				    breadcrumb={{ routes }}
				    style={this.state.collapsed ? {left: 80} : {}}
				  />

					<Content className="site-layout-content">
							
						
						<div className="my-class" style={this.state.collapsed ? {left: 112} : {}}>
							我的課程
						</div>

						<div className="card-wrapper" style={this.state.collapsed ? {left: 112} : {}}>
							<Row gutter={16}>
		            <Col span={6}>
		              <Card title="高一國文" extra={<a href="#">More</a>} bordered={false} className="card-medium">
		                Card content
		              </Card>
		            </Col>
		            <Col span={6}>
		              <Card title="高一數學" extra={<a href="#">More</a>} bordered={false} className="card-medium">
		                Card content
		              </Card>
		            </Col>
		            <Col span={6}>
		              <Card title="高一物理" extra={<a href="#">More</a>} bordered={false} className="card-medium">
		                Card content
		              </Card>
		            </Col>
		            <Col span={6}>
		              <Card title="高一化學" extra={<a href="#">More</a>} bordered={false} className="card-medium">
		                Card content
		              </Card>
		            </Col>
		          </Row>
	          </div>

						

						<div className="class-activity" style={this.state.collapsed ? {left: 112} : {}}>
							課程活動
						</div>
						
						<div className="empty" style={this.state.collapsed ? {left: 112} : {}}>
							<Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
						</div>

						<div className="learning-situation" style={this.state.collapsed ? {left: 112} : {}}>
							學習概況
						</div>

						<div className="frame-26" style={this.state.collapsed ? {left: 112} : {}}>
							
							<span className="frame-24">
								<span className="learning-time-day">
									本日學習時間
								</span>
								<Progress className="progress-day" type="circle" strokeColor="orange" percent={30} format={() => '0:30:00'} />
							</span>
							<span className="frame-25">
								<span className="learning-time-week">
									本週學習時間
								</span>
								<Progress className="progress-week" type="circle" percent={75} format={() => '3:30:00'} />
							</span>
						</div>
						
						<div className="calender" style={this.state.collapsed ? {left: 956} : {}}>
							行事曆
						</div>
						<div className="date-picker" style={this.state.collapsed ? {left: 956} : {}}>
							<DatePicker className="date-picker-line" dropdownClassName="date-picker-pop" />
						</div>
					</Content>
				</Layout>
			</Layout>
		);
	
	}
}

export default Home
