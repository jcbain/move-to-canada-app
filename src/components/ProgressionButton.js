import React, { useState, Component } from 'react';


// function ProgressionButton(props){
//     const [count, setCount] = useState(0);
//     const direction = (props.direction === 'forward') ? 1 : -1; 
// return(
//     <div>
//         <p>You clicked {count} times</p>
//         <button onClick={() => setCount(count + 1 * direction)}>Click Me</button>
//     </div>
//     )
// }

class ProgressionButton extends Component{
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.props.onStepChange();
    }

    render(){
        const buttonLabel = `Go ${this.props.direction}`
        return (
            <div>
                <p>The step is on: {this.props.step}</p>
        <button onClick={this.handleChange}>{buttonLabel}</button>
            </div>
        )
    }
 }

export default ProgressionButton;