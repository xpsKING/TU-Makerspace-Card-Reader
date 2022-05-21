import React from 'react';

// just an input to easily use and customize
export default class Inputs extends React.Component {
    constructor(props) {
        super(props);

        this.state=({
            value: props.value,
            placeholder: props.placeholder || '',
            className: props.className || '',
            id: props.id || '',
            type: props.type || '',
            variable: props.variable,
        })
    }

    handleUpdate(e) {
        const value = e.target.value;
        this.setState({
            value: value,
        })
        console.log({[this.state.variable]:value});
        this.props.parentCallBack(this.state.variable, value);
    }

    render() {
        return (
            <input
                className={this.state.className}
                id={this.state.id}
                value={this.state.value}
                placeholder={this.state.placeholder}
                type={this.state.type}
                onChange={(e) => this.handleUpdate(e)}
                autoComplete="off"
            />
        )
    }
}
/*
<Inputs
    className=
    type=
    id=
    placeholder=
    value=
    variable=
    parentCallBack=
    />
*/                          