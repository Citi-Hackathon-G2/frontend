import React, { Component } from "react";
import "../index.css";
import BottomNav from "../sharedcomponents/BottomNav";
import { Container, Row, Col, Table } from "react-bootstrap";
import * as ReactBootStrap from "react-bootstrap";
import Like from "../sharedcomponents/Like";

class homeStaff extends Component {
  state = {
    datas: [{ id: 1, note: "re", liked: true }],
  };

  //get data from firestore
  /* async componentDidMount() {
        const { datas: movies } = await getMovies();
        this.setState({ datas });
      }*/

  handleLike = (data: any) => {
    const datas = [...this.state.datas];
    const index = datas.indexOf(data); //find index of chosen movie from cloned array

    datas[index] = { ...datas[index] };

    datas[index].liked = !datas[index].liked; //toggle
    this.setState({ datas });
    console.log(datas);
  };

  render() {
    console.log();
    return (
      <div>
        <div className="header-style">Hi Staff,</div>
        <div className="mid-header-style">Welcome Back!</div>

        <div style={{ backgroundColor: "#edf67d" }}>
          <h3 className="header-title">Transaction History</h3>
        </div>
        
        <Table className="table-style">
          <thead>
            <tr>
              <th>User</th>
              <th>Voucher Amount</th>
              <th>Date&Time</th>
              <th>Highlighted</th>
            </tr>
          </thead>
          <tbody>
            {/*this.state.datas needs to be replaced after api code */}
            {this.state.datas.map((prop: any) => (
              <tr key={prop.id}>
                <td>{prop.note}</td>
                <td>{prop.note}</td>
                <td>{prop.note}</td>
                <td>
                  <Like
                    onClick={() => this.handleLike(prop)}
                    liked={prop.liked}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <BottomNav />
      </div>
    );
  }
}

export default homeStaff;

//map the array of QR codes scanned to show history of transaction
//liked={prop.liked}
