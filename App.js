import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Row, Jumbotron} from 'react-bootstrap'

import Home from './component/Home'
import Volume from './component/Volume'
import Examination from './component/Examination';
// import Clock from './componennt/Clock'
import Timer from './component/Timer'

import {Layout, Menu} from 'antd'    
import { UserOutlined, VideoCameraOutlined, UploadOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

class App extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			error: null,
			errorMsg: null,
			isBeginFlag: false,
			userProfile: "",
			currentTime: null,
			isVolumeFlag: true
		}

		this.pageControlFunc = this.pageControlFunc.bind(this);
		this.handleExaminationTime = this.handleExaminationTime.bind(this);
		this.addUserProfile = this.addUserProfile.bind(this);

		this.pageControlFunc2 = this.pageControlFunc2.bind(this);
	}

	componentDidCatch(err, errInfo) {
		this.setState({
			error: err,
			errorMsg: errInfo
		})
		console.log(errInfo);
	}

	pageControlFunc(token) {
		this.setState({isBeginFlag: token})
	}

	pageControlFunc2(token) {
		this.setState({isVolumeFlag: token})
	}

	handleExaminationTime(currentSec) {
		this.setState({currentTime: currentSec})
	}

	addUserProfile(studentID) {
		this.setState({userProfile: studentID})
	}

	render() {
		
		const error_flag = this.state.error;
		const begin_flag = this.state.isBeginFlag;
		const volume_flag = this.state.isVolumeFlag;
		//const loading_flag = this.state.isLoading;
		let page;

		const studentID = this.state.userProfile;
		const currentSec = this.state.currentTime;

		// console.log("Student ID is " + studentID);
		// console.log("Current Time is " + currentSec + " in App.js");

		if (!volume_flag) {
			page = <div><Home onUserProfile={this.addUserProfile} onPageState={this.pageControlFunc} onVolumeState={this.pageControlFunc2}></Home></div>;
		}
		else {
			// page = <div><Timer onTimeState={this.handleExaminationTime} onPageState={this.pageControlFunc}></Timer><Examination currentTime={currentSec} testProfile={studentID}  onPageState={this.pageControlFunc}></Examination></div>;
			page = <div><Volume></Volume></div>
		}


		if (error_flag) {
			return <div>Error happen</div>
		}
		else {
			return (
				<div>
					{page}
				</div>
				);
		}

	}
	
}

	

export default App

