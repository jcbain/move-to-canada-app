import React, { Component } from 'react';

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
                <button onClick={this.handleChange}>{buttonLabel}</button>
            </div>
        )
    }
 }

export default ProgressionButton;