import React, { Component } from "react";
import history from "./history";
import AirportForm from "./AirportForm";
import AircraftForm from './AircraftForm';
import {Redirect} from 'react-router-dom';
import {
  AircraftModel,
  AirportModel,
  initialAirCrafts,
  intialAirports,
  TransactionModel,
} from "../Utils/Models";
import {  Link} from "react-router-dom";
import Transaction from "./Transaction";
import SortingHOC from "../Utils/SortingHOC";

export class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Airports: [],
      Aircrafts: [],
      newAirport: new AirportModel(),
      newAircraft: new AircraftModel(),
      newTransaction: new TransactionModel(),
      Transactions: [],
      aircraftRequired: true
    };
  }
  componentDidMount() {
    this.setState({
      Airports: intialAirports,
      Aircrafts: initialAirCrafts,
      transactionMode: false
    });
  }
  handleAirportForm = (e) => {
    e.preventDefault();
    //console.log('new airport', this.state.newAirport)
    this.setState({
      Airports: [...this.state.Airports, this.state.newAirport],
      newAirport: new AirportModel()
    })
  };
  changeToTransaction = (e) => {
    this.setState({
      transactionMode: true
    });
  };
  backToHome = () =>
  {
    this.setState({
      transactionMode: false
    });
  }
  handleAirportFormChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let currentAirport = { ...this.state.newAirport };
    currentAirport[name] = value;
    this.setState({
      newAirport: currentAirport,
    });
  };
  handleAircraftForm = (e) => {
    e.preventDefault();
    this.setState({
      Aircrafts: [...this.state.Aircrafts, this.state.newAircraft],
      newAircraft: new AircraftModel()
    })
    
  };
  handleAircraftFormChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let currentAircraft = { ...this.state.newAircraft};
    currentAircraft[name] = value;
    this.setState({
      newAircraft: currentAircraft,
    });
  };
  validateTransationForm = () => {
    let valid = true;
   this.state.Airports.forEach(airport => {
     if(airport.airport_id === Number(this.state.newTransaction.airport_id) &&
      this.state.newTransaction.transaction_type === "OUT"){
        if(airport.fuel_capacity_available < this.state.newTransaction.quantity){
          alert("Required fuel quantity exceeds availability");
          valid = false;
        }
      }
   })
    return valid;
}
  handleTransaction = (e) => {
    e.preventDefault();
    
    if (!this.validateTransationForm()) {
      return;
    }
    this.state.newTransaction.transaction_date_time = new Date().toLocaleString();
    this.state.Transactions.push(this.state.newTransaction);
    this.state.Airports.forEach(airport =>{
        if(airport.airport_id == this.state.newTransaction.airport_id){
          if(this.state.newTransaction.transaction_type == 'IN'){
            airport.fuel_capacity_available = parseInt(airport.fuel_capacity_available) +  
              parseInt(this.state.newTransaction.quantity)
          }
          else{
            airport.fuel_capacity_available = parseInt(airport.fuel_capacity_available) - 
              parseInt(this.state.newTransaction.quantity)
          }
        }
    })
    this.setState({
      newTransaction: new TransactionModel()
    })
  };
  onChangeTransaction = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let currentTransaction = { ...this.state.newTransaction};
    currentTransaction[name] = value;
    if(currentTransaction.transaction_type === "OUT"){
      this.setState({
        aircraftRequired: false,
      });
    }
    else{
      this.setState({
        aircraftRequired: true,
      });
    }
    this.setState({
      newTransaction: currentTransaction,
    });
  };
  onReverseTransaction = (e,reverseTransactionData) =>
  {
    //console.log('reverse', reverseTransactionData);
    let currentTransaction = new TransactionModel();
    currentTransaction.transaction_parent_id = reverseTransactionData;
    this.state.Transactions.forEach(transaction => {
      if(transaction.transaction_id === currentTransaction.transaction_parent_id){
        if(transaction.transaction_type === "IN"){
          currentTransaction.transaction_type = "OUT";
          currentTransaction.quantity = transaction.quantity;
          currentTransaction.transaction_date_time = new Date().toLocaleString();
          currentTransaction.aircraft_id = transaction.aircraft_id;
          currentTransaction.airport_id = transaction.airport_id;
          
         
        }
        else{
          currentTransaction.transaction_type = "IN";
          currentTransaction.quantity = transaction.quantity;
          currentTransaction.aircraft_id = transaction.aircraft_id;
          currentTransaction.transaction_date_time = new Date().toLocaleString();;
          currentTransaction.airport_id = transaction.airport_id;
         
        }
      }
     
    })
    this.state.Airports.forEach(airport =>{
      if(airport.airport_id == currentTransaction.airport_id){
        if(currentTransaction.transaction_type == "IN"){
          airport.fuel_capacity_available = parseInt(airport.fuel_capacity_available) +  
            parseInt(currentTransaction.quantity)
        }
        else{
          airport.fuel_capacity_available = parseInt(airport.fuel_capacity_available) - 
            parseInt(currentTransaction.quantity)
        }
      }
  })
  this.setState({
    Transactions: [...this.state.Transactions, currentTransaction],
    Airports: this.state.Airports
  })
  }
  render() {
    return (
      <React.Fragment>
        {
          !this.state.transactionMode ? 
          <div>
            <div className="row">
          <div className="col-sm-6">
            <h3> Welcome to Airport Fuel Inventory</h3>
          </div>
          <div className="col-sm-6">
            <div className="right-content">
            <button className="btn btn-primary" onClick={this.changeToTransaction}>Transaction</button>
              <Link to="/" className="btn btn-primary">Logout</Link>
             
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-4">
            <div className="airport-form-content">
              <AirportForm
                handleAirportForm={this.handleAirportForm}
                newAirport={this.state.newAirport}
                onAirportDataChanged={this.handleAirportFormChange}
              ></AirportForm>
            </div>
          </div>
          <div className="col-sm-4">
           
            <div className="airport-form-content">
            <AircraftForm
           handleAircraftForm={this.handleAircraftForm}
           newAircraft={this.state.newAircraft}
           onAircraftDataChanged={this.handleAircraftFormChange} >
                
            </AircraftForm>
            </div>
          </div>
        </div>
        <div className="row">
          <h2>Airport Summary Report</h2>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th onClick={() => this.props.sortData(this.state.Airports, "airport_name")}>Airport</th>
                  <th onClick={() => this.props.sortData(this.state.Airports, "fuel_capacity_available")}>Fuel Available</th>
                </tr>
              </thead>
              <tbody>
                {this.state.Airports.map((item, index) => (
                  <tr key={index}>
                    <td>{item.airport_name}</td>
                    <td>{item.fuel_capacity_available}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="row">
          <h2>Aircrafts Summary Report</h2>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th onClick={() => this.props.sortData(this.state.Aircrafts, "aircraft_no")}>Aircraft No</th>
                  <th onClick={() => this.props.sortData(this.state.Aircrafts, "airline")}>Airline</th>
                </tr>
              </thead>
              <tbody>
                {this.state.Aircrafts.map((item, index) => (
                  <tr key={index}>
                    <td>{item.aircraft_no}</td>
                    <td>{item.airline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
          </div> 
          :
          <Transaction backToHome={this.backToHome} airportData ={this.state.Airports} 
          aircraftData = {this.state.Aircrafts} handleTransaction={this.handleTransaction}
          newTransaction={this.state.newTransaction}
          onChangeTransaction={this.onChangeTransaction} allTransaction={this.state.Transactions}
          onReverseTransaction={this.onReverseTransaction} aircraftRequired={this.state.aircraftRequired}></Transaction>
        }
        
      </React.Fragment>
    );
  }
}

export default SortingHOC(Dashboard);
