import React from 'react'

import {Container} from 'react-bootstrap'

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            remainingTime: 1800
        }
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {

            this.props.onTimeState(this.state.remainingTime);

            this.setState(prevState => ({
                remainingTime: prevState.remainingTime - 1
            }))
        }, 1000);

        

    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {

        if (this.state.remainingTime === 0) {
            this.props.onPageState(false)
        }
        
        return (
            <div>
                <Container>
                    <h1>剩餘作答時間: {this.state.remainingTime}秒</h1>
                </Container>
            </div>
        );
    }
}

export default Timer