import { Button } from "react-bootstrap";
import React, { Component } from "react";
import QrReader from "react-qr-reader";
import { Link, NavLink, BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class scanQR extends Component {
  state = {
    delay: 100,
    result: "No result",
  };

  /*
  // TO ROUTE BACK TO PREVIOUS PAGE 
  static contextTypes = {
    router: () => true, // replace with PropTypes.object if you use them
  }
    */

  handleScan = (data: object) => {
    if (data) {
      this.setState({
        result: data,
      });
    }
  };
  handleError = (err: TypeError) => {
    console.error(err);
  };

  render() {
    return (
      <div>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "100%" }}
        />
        <div className="horizontal-container">
          <Link to="/">
            <Button
              style={{
                backgroundColor: "#B15983",
                border: "#B15983",
                position: "absolute",
                marginLeft: "5%",
              }}
            >
              Back
            </Button>
          </Link>

          <p style={{ position: "absolute", marginLeft: "50%" }}>
            {this.state.result}
          </p>
        </div>
      </div>
    );
  }
}

export default scanQR;
//onClick={this.context.router.history.goBack}

//once have result, put into firebase, then show in homepage
