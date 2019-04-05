import React, { Component } from 'react';
import { Container, Nav } from "./styled-components";

import config from '../config';

const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;

class App extends Component {
  constructor() {
    super();
    this.statte = {
      items: []
    };
  }

  componentDidMount() {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let batchRowValues = data.valueRanges[0].values;

        const rows = [];
        for (let i = 1; i < batchRowValues.length; i++) {
          let rowObject = {};
          for (let j = 0; j < batchRowValues[i].length; j++) {
            rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
          }
          rows.push(rowObject);
        }
        this.setState({ items: rows });
    });
  }


  render() {
    return (
      <Container>
        <Nav className="navbar navbar-expand-lg fixed-top is-white is-dark-text">
          <div className="navbar-brand h1 mb-0 text-large font-medium">
            Online Retail Dashboard
          </div>
          <div className="navbar-nav ml-auto">
            <div className="user-detail-section">
              <span className="img-container">
                <img src="" className="rounded-circle" alt="user" />
              </span>
            </div>
          </div>
        </Nav>

        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div className="card">
                <div className="card-heading">
                  <div>
                    Total Revenue
                  </div>
                </div>
                <div className="card-value">
                  <span>$</span>

                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default App;
