import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Cookies from 'universal-cookie';
import Dashboard from "views/Dashboard/Dashboard.jsx";
import PageNotFound from "views/Error/PageNotFound.jsx";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import MaterialTable from 'material-table';
import { GET } from "utils/api";

export default function App() {
  const cookie = new Cookies().get('sales-app');
  const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route {...rest} render={props => (
        cookie ?
          <Component {...props} />
          : <Redirect to="/" />
      )} />
    );
  };

  const getTableData = async (query) => {
    let params = {
      page: query.page + 1
    }
    if (query.search) {
      params.packageName = query.search
    }
    return await GET(`v1/sales`, params).then(data => {
      return {
        data: data.data.data.row,
        page: query.page,
        totalCount: data.data.data.totalRow,
      }
    }).catch((err) => console.error(err));
  }
  const loading = () => {
    return (
      <div className="container-fluid">
        <div className="loading-box">
          <div className="middle">
            <div className="spinner-body text-primary" role="status">
              <span className="sr-only">Loading</span>
            </div>
            <p>data is loading...</p>
          </div>
        </div>
      </div>
    )
  }

  if (true) {
    return (
      <Router >
        {loading()}
        <Switch>
          <Route exact path="/" component={Dashboard} />
          {/* Set pivate route later */}
          <PrivateRoute exact path="/dashboard" component={Dashboard} />

          <Route exact path="/404" component={PageNotFound} />
          {/* capture invalid route */}
          <Route render={() => <Redirect to={{ pathname: "/404" }} />} />
        </Switch>

      </Router>
    )
  } else {
    return (
      <div className="App">
        <div>
          <MaterialTable title="Table Title" columns={[{
            title: "Action",
            searchable: false,
            sorting: false,
            width: 1,
            render: row => {
              return <DropdownButton id="dropdown-basic-button" title="Action">
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </DropdownButton>
            }
          },
          {
            title: "User ID",
            searchable: false,
            field: "user_id",
            hidden: true
          },
          {
            title: "User ID",
            field: "user_id"
          },
          {
            title: "Package Name",
            field: "package_name"
          },
          {
            title: "Quantity",
            field: "quantity"
          },
          {
            title: "Sale Date",
            field: "sales_date"
          },
          {
            title: "Attachment",
            field: "attachment",
            render: (row) => {
              return row.attachment ? <a href={row.attachment} target="_blank">View</a> : <i>No attachment available</i>
            }
          }
          ]} data={(query) => getTableData(query)} options={{ pageSize: 10, pageSizeOptions: [], draggable: false }} />
        </div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
      </div>
    );
  }

}

