import React from 'react'

import {Container, Row, Col, Button, Spinner} from 'react-bootstrap'
import {  Radio, Input  } from 'antd';

class Examination extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			error: 'null',
			preTime: 1800,
			question_text: "題幹",
			numOfOption: 4,
			option_set: ["sg","ga","a","c"],
			questionID: 1,
			isLoading: true,
			answer: [],
			ratio_value: 2
		}

		this.handleClick = this.handleClick.bind(this);
		this.fetchOptionText = this.fetchOptionText.bind(this);
		this.handleQuestionResult = this.handleQuestionResult.bind(this);
		this.IncreseQuestionID = this.IncreseQuestionID.bind(this);
		this.handleEnd = this.handleEnd.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	fetchOptionText() {

		// console.log("Question ID is: " + this.state.questionID)


		const url = "/question/" + this.state.questionID;
		fetch(url,{
			mode: 'no-cors'
		})
		.then(res => res.json())
		.then(
			(result) => {
				// console.log('good')
				if (this.state.questionID < 13) {
				this.setState({
					question_text: result[0].question_text,
					numOfOption: result[0].num_options,
				});
				} else {
					this.setState({
						question_text: [],
						numOfOption: [],
					});
				}

				let option_set;

				for (var i = 0; i < this.state.numOfOption; i++) {
					option_set = this.state.option_set;
					option_set.push(result[i+1])
				}
				
				this.setState({
					isLoading: false
				});
				
				this.IncreseQuestionID();

				// console.log("After edit. question ID is: " + this.state.questionID);
				
				// console.log(result)
				// console.log(this.state.numOfOption)
				// console.log(this.state.option_set)
			},
			(error) => {
				// console.log('error')
				this.setState({
					error: 'error'
				});
				// console.log(error)
			}
		)
	}
	
	componentDidMount() {

		this.fetchOptionText()
		
		/*
		fetch("http://127.0.0.1:5000/api/v1/question", {
			method: 'GET',
			mode: 'no-cors'
		})
		// .then(res => res.json())
		.then(
			(result) => {
				console.log(result.QuestionEntry)
				this.setState({
					contentOfTest: result.QuestionEntry
				});
			},
			(error) => {
				this.setState({
					error
				});
			}
		)
		*/
	}

	handleQuestionResult(question_result, total_time, confidence_value) {

		const submit_student_id = this.props.testProfile;
		const submit_qid = this.state.questionID - 1;
		
		const data = {"student_id": submit_student_id, "qid": submit_qid,"confidence": confidence_value,"time": total_time,"answer": question_result.join('')};

		// console.log(JSON.stringify(data));
		// console.log(typeof(JSON.stringify(data)));

		fetch('/question/1', {
				method: 'POST',
			mode: 'no-cors',
				body: JSON.stringify(data),
			//body: data,
			headers: {
				
				"Content-Type": "application/json"
			}

			})
		.then(
			(result) => {
				// console.log("In result")
				// console.log(result)

			},
			(error) => {
				// console.log("In error")
				// console.log(error)
			}
		)

	}

	async IncreseQuestionID() {
		await this.setState((state) => {
			return {questionID: state.questionID + 1}
		});
		// console.log("I will wait until finising editing.")
	}

	handleClick() {
	
	 //let data = {student_id: 123, confidence: 3, time: 12, ans: "A" };
		
		// console.log("Current Time: " + this.props.currentTime);

		let option_set = document.getElementsByName('option');
		let answer_set = [];

		let confidence_input_group = document.getElementsByName('confidence');
		let confidence_value;
		let confidence_checked_token = false;

		for (var q = 0; q < confidence_input_group.length; q++) {
			if (confidence_input_group[q].checked) {
				//console.log(confidence_input_group[q].value)
				confidence_value = confidence_input_group[q].value;
			}
			confidence_checked_token = confidence_checked_token || confidence_input_group[q].checked;
		}

		let option_check_token = false;

		for (var j = 0; j < this.state.numOfOption; j++) {
			//console.log(option_check_token, option_set[j].checked);
			option_check_token = option_check_token || option_set[j].checked
		}

		// console.log(option_check_token);

		if (option_check_token && confidence_checked_token) {

			for (var k = 0; k < option_set.length; k++) {
				if (option_set[k].checked) answer_set.push(option_set[k].value);
			}

			for (var p = 0; p < option_set.length; p++) {
				option_set[p].checked = false;
			}

			
			// console.log(answer_set);

			const total_time_usage = this.state.preTime - this.props.currentTime;
			this.setState({preTime: this.props.currentTime})

			this.handleQuestionResult(answer_set, total_time_usage, confidence_value);
			
		
		this.setState({
			option_set: [],
			isLoading: true
		});

		

		this.fetchOptionText();

		}

	}

	handleEnd() {
		this.props.onPageState(false);
	}

	onChange(e) {
		this.setState({
		  ratio_value: e.target.value
		});
	};

	render() {

		// console.log()

		// if (this.state.questionID > 13)
		// {
		//     this.props.onPageState(false);
		// }

	//let question_text = this.state.contentOfTest[0].question_text;

	//let option_text = this.state.contentOfTest.shift();

		const current_id = this.state.questionID;
	
		if (current_id > 13)
		{
			return (
				<Container>
					<h1>End</h1>
					<Button onClick={this.handleEnd}>回首頁</Button>
				</Container>
			);
		}
		/*else if (this.state.isLoading) {
			return (<Spinner animation="border" role="status">
						<span className="sr-only">Loading...</span>
						<h1>HELLO1,{this.state.error}</h1>
					</Spinner>);
		}*/
		else if(current_id < 14) {

			const option_set = this.state.option_set;
			let question_body;
			const radioStyle = {
			  display: 'block',
			  height: '30px',
			  lineHeight: '30px',
			};

			/*question_body = option_set.map((element, index) =>
				<div>
				<Col>
					<input type="checkbox" value={String.fromCharCode("A".charCodeAt(0) + index)} id={index} name="option"/>
				</Col>
				<Col>
					<label>{element}</label>
				</Col>
				</div>
			);*/
			question_body = option_set.map((element, index) =>
				<Radio style={radioStyle} value={index}     >
				  {element}
				</Radio>	
			);

		// console.log("The props is: ");
		// console.log(this.props);

			// console.log(option_set);
			// console.log(question_body);

			return (
				<div>
					<Container>
						<Row>
					<h1>Hello, {this.props.testProfile}</h1>
							<Container>
								<Row>
									<label>
										題目 No.{this.state.questionID}
									</label><br/>
									<label>
									{this.state.question_text}
									</label>
											
									<div required>
										{/* <Col>
											<label>一</label>
											<input type="checkbox" id="option_1" value="A" name="option"/>
										</Col>
										<Col>
											<label>二</label>
											<input type="checkbox" id="option_2" value="B" name="option"/>
										</Col>
										<Col>
											<label>三</label>
											<input type="checkbox" id="option_3" value="C" name="option"/>
										</Col>
										<Col>
											<label>四</label>
											<input type="checkbox" id="option_4" value="D" name="option"/>
										</Col>
										<Col>
											<label>五</label>
											<input type="checkbox" id="option_5" value="E" name="option"/>
										</Col> */}
										<div>
											<Radio.Group onChange={this.onChange} name='option'>
												{question_body}
											</Radio.Group>
											{this.state.option_set}
											{this.state.question_text}
											{this.state.numOfOption}
										</div>
									</div>
								</Row>
								<Row>
									<h3>對本題的信心水準(1到5分由低到高)</h3>
									<Col>
										<input type="radio" name="confidence" value="1"/><span>1</span>
										<input type="radio" name="confidence" value="2"/><span>2</span>
										<input type="radio" name="confidence" value="3"/><span>3</span>
										<input type="radio" name="confidence" value="4"/><span>4</span>
										<input type="radio" name="confidence" value="5"/><span>5</span>
									</Col>
								</Row>
							</Container>
						</Row>
						<Button onClick={this.handleClick}>下一題</Button>
					</Container>
				</div>
			);
		}
		else {
			return (
			<Container>
				<h1>Error</h1>
			</Container>
		);
		}
	}
}

export default Examination
