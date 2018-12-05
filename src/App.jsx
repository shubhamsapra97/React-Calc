// importing react modules from react.
import React, { Component } from "react";

// class component
export default class App extends Component {

    // constructor function
    constructor(props) {

        // props passed to parent constructor.
        super(props);

        // state object
        this.state = {

            firstOperand: 0,
            operator: '',
            secondOperand: '',
            expression: 0

        };

    }

    // component lifecycle function.
    componentDidMount() {

        console.log("mounted");

    }

    // clear the display screen
    onClear = (e) => {

        // setting state object to initial values
        this.setState({

            firstOperand: 0,
            operator: '',
            secondOperand: '',
            expression: 0

        });

    }

    // count the decimals in the string passed.
    // @params: 
    //      value: String
    countDecimals = (value) => {

        if ((value % 1) != 0)
            return value.toString().split(".")[1].length;
        return 0;

    }

    // calculate sqroot of function.
    onSqRoot = (e) => {

        // var to store the root  
        let root = 0;

        // if expression conatins only a single number (no operators) eg: 99
        if (!this.state.operator) {

            root = Math.sqrt(this.state.firstOperand);

            // count the number of decimals in number
            let decimals = this.countDecimals(root);


            // if decimal count > 3, reduce it to 3
            if (decimals > 3) {

                root = root.toFixed(3);

            }

            // setting the result 
            this.setState({
                firstOperand: root,
                expression: root
            });

        }
        else {

            // first evaluate the expression 
            try {

                let result = eval(this.state.expression);

                // then calculate the root.
                root = Math.sqrt(parseInt(result));

                // count the number of decimals in number
                let decimals = this.countDecimals(root);


                // if decimal count > 3, reduce it to 3
                if (decimals > 3) {

                    root = root.toFixed(3);

                }

                // setting the result 
                this.setState({
                    firstOperand: root,
                    expression: root
                });
            }
            catch (e) {

                // setting the Err result 
                this.setState({
                    firstOperand: 0,
                    expression: 'Root of -ve'
                });

            }

        }



    }

    // function to set the operator item of state object
    setOperator = (e) => {

        // current operator pressed
        let val = e.target.value;

        // clear the secondOperand key in state object
        // if user enters multiple operator expression eg: 3*4+5
        // clearing the second operator key to store the value (5) entered after the latest operator(+)
        this.setState({

            secondOperand: ''

        });

        // get the last value entered by user.
        let lastChar = this.state.expression.toString().charAt(this.state.expression.length - 1);

        // Conditions Checked before setting the operator:
        // first operand is not empty
        // the entered operator is amongst selected operators: +,-,/,*,%
        // prevent user from entering consecutive operators in expression
        if (

            (this.state.firstOperand != 0) &&
            (val == '%' || val == '/' || val == '+' || val == '-' || val == '*') &&
            (lastChar != '%' && lastChar != '/' && lastChar != '+' && lastChar != '-' && lastChar != '*')

        ) {

            this.setState({
                operator: e.target.value,
                expression: this.state.expression + e.target.value
            });

        }

        // override the last operator if new operator is clicked immediately.
        if (lastChar == '%' || lastChar == '/' || lastChar == '+' || lastChar == '-' || lastChar == '*') {

            this.setState((prevState) => {
                return {
                    operator: val,
                    expression: prevState.expression.substring(0, prevState.expression.length - 1) + val
                }
            });

        }

    }

    // function to set the first and second operand values in the state object
    setOperand = (e) => {

        // set the firstOperand key in state object if operator not set. 
        if (!this.state.operator.trim().length != 0) {

            // fetch the current value entered by user.
            let val = e.target.value;


            // overwrite the initial value on display Screen if:
            // firstOperand Value is 0(default)

            // overwrite the initial value(0) with decimal only if no decimal is present earlier.
            if (this.state.firstOperand == 0 &&
                this.state.firstOperand.toString().indexOf('.') == -1) {

                this.setState((prevState) => {

                    return {

                        firstOperand: val,
                        expression: val

                    }

                });

            }
            else {

                // runs if the firstOperand's value is not 0,
                // enter decimal if not present earlier
                // append chars other than decimal in firstOperand
                if (

                    (val == '.' && this.state.firstOperand.toString().indexOf('.') == -1)

                    ||

                    (val != '.')

                ) {

                    this.setState((prevState) => {

                        return {

                            firstOperand: prevState.firstOperand + val,
                            expression: prevState.firstOperand + val

                        }

                    });
                }

            }



        }
        // update the secondOperand Value if: 
        // operator present
        else {

            // fetch the value entered by user.
            let val = e.target.value;

            // overwrite the initial value of secondOperand on display Screen if:
            // length of secondOperand Value is 0(default)

            // overwrite the initial value(0) with decimal only if no decimal is present earlier.
            if (this.state.secondOperand.trim().length == 0 &&
                this.state.firstOperand.toString().indexOf('.') == -1){

                this.setState((prevState) => {

                    return {

                        secondOperand: val,
                        expression: prevState.expression + val

                    }

                });

            }
            else {

                // runs if the secondOperand's value is not '',
                // enter decimal if not present earlier
                // append chars other than decimal in secondOperand

                if (

                    (val == '.' && this.state.secondOperand.toString().indexOf('.') == -1)

                    ||

                    (val != '.')


                ) {

                    this.setState((prevState) => {

                        return {

                            secondOperand: prevState.secondOperand + val,
                            expression: prevState.expression + val

                        }

                    });
                }

            }

        }


    }

    // calc the final result on '=' operator click.
    calcResult = (e) => {

        // calc result if:
        // firstOpearnd not 0,
        // secondOparand not '',
        // operator present
        // selected operator is '='
        if (this.state.firstOperand != 0 && this.state.secondOperand && this.state.operator &&
            e.target.value == '=') {

            // store result var
            let result = 0;
            // variable to store the number of decimals.
            let decimals = 0;

            // set result only if no error 
            try {

                // calc result
                result = eval(this.state.expression);
                // find number of decimals
                decimals = this.countDecimals(result);

                // check if decimals number less than 3
                if (decimals > 3) {

                    result = result.toFixed(3);

                }

                // store result in expression, firstOperand
                this.setState({

                    firstOperand: result,
                    operator: '',
                    secondOperand: '',
                    expression: result

                });
            }
            catch (err) {

                // display err
                this.setState({

                    firstOperand: 0,
                    operator: '',
                    secondOperand: '',
                    expression: ':('

                });

            }

        }

    }


    render() {

        return (
            <div className="container">

                {/* heading */}
                <h3 className="heading">Calculator</h3>

                <div className="calcContainer">

                    {/* Display Screen */}
                    <div className="displayScreen">

                        {this.state.expression.length > 13 ? "Length > 13" : this.state.expression}

                    </div>

                    {/* Buttons DIV */}
                    <div className="calcButtons">

                        <input className="calcButtons__button" type="button" value="&#x221a;"
                            onClick={this.onSqRoot}
                        />

                        <input className="calcButtons__button" type="button" value="%"
                            onClick={this.setOperator}
                        />

                        <input className="calcButtons__button" type="button" value="+"
                            onClick={this.setOperator}
                        />

                        <input className="calcButtons__button sideBtn" type="button" value="AC"
                            onClick={this.onClear}
                        />

                        <input className="calcButtons__button" type="button" value="7"
                            onClick={this.setOperand}
                        />

                        <input className="calcButtons__button" type="button" value="8"
                            onClick={this.setOperand}
                        />

                        <input className="calcButtons__button" type="button" value="9"
                            onClick={this.setOperand}
                        />

                        <input className="calcButtons__button sideBtn" type="button" value="/"
                            onClick={this.setOperator}
                        />

                        <input className="calcButtons__button" type="button" value="4"
                            onClick={this.setOperand}
                        />

                        <input className="calcButtons__button" type="button" value="5"
                            onClick={this.setOperand}
                        />

                        <input className="calcButtons__button" type="button" value="6"
                            onClick={this.setOperand}
                        />

                        <input className="calcButtons__button sideBtn" type="button" value="*"
                            onClick={this.setOperator}
                        />

                        <input className="calcButtons__button" type="button" value="1"
                            onClick={this.setOperand}
                        />

                        <input className="calcButtons__button" type="button" value="2"
                            onClick={this.setOperand}
                        />

                        <input className="calcButtons__button" type="button" value="3"
                            onClick={this.setOperand}
                        />

                        <input className="calcButtons__button sideBtn" type="button" value="-"
                            onClick={this.setOperator}
                        />

                        <input className="calcButtons__button" type="button" value="0"
                            onClick={this.setOperand}
                        />

                        <input className="calcButtons__button" type="button" value="."
                            onClick={this.setOperand}
                        />

                        <input className="calcButtons__button resultBtn" type="button" value="="
                            onClick={this.calcResult}
                        />

                    </div>

                </div>

            </div>
        );
    }
}
