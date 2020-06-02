import React, { Component } from "react";
import { Link } from "react-router-dom";
import SortingHOC from "../Utils/SortingHOC";
function Transaction(props) {
  const {
    airportData,
    backToHome,
    aircraftData,
    newTransaction,
    handleTransaction,
    onChangeTransaction,
    allTransaction,
    onReverseTransaction,
    aircraftRequired } = props;
  var summaryReport = false;
  const groupBy = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
    
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  };

  // Group by color as key to the person array
 
  const fuelConsumptionPerAirport = groupBy(allTransaction, "airport_id");
  if(fuelConsumptionPerAirport !== []){
    //console.log("trasnsaction per airport", fuelConsumptionPerAirport);
    summaryReport = true;
  }
 
  //console.log(airportData);
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-sm-6">
          <h3> Welcome to Transaction Page</h3>
        </div>
        <div className="col-sm-6">
          <div className="right-content">
            <button className="btn btn-primary" onClick={backToHome}>
              Back
            </button>
            <Link to="/" className="btn btn-primary">
              Logout
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4">
          <div className="airport-form-content">
            <h4>Add New Transaction</h4>
            <form onSubmit={handleTransaction}>
              <div className="form-group">
                <label>
                  Transaction Type<span className="requiredAstrick">*</span>:
                </label>
                <select
                  required
                  className="form-control"
                  name="transaction_type"
                  value={newTransaction.transaction_type}
                  onChange={onChangeTransaction}
                >
                  <option value="">Select-Type</option>
                  <option value="IN">IN</option>
                  <option value="OUT">OUT</option>
                </select>
              </div>
              <div className="form-group">
                <label>
                  Airport<span className="requiredAstrick">*</span>:
                </label>
                <select
                  required
                  name="airport_id"
                  className="form-control"
                  value={newTransaction.airport_id}
                  onChange={onChangeTransaction}
                >
                  <option value="">Select Airport</option>
                  {props.airportData.map((airport) => (
                    <option value={airport.airport_id} key={airport.airport_id}>
                      {airport.airport_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Aircraft<span className="requiredAstrick">*</span></label>
                <select
                  name="aircraft_id"
                  className="form-control"
                  value={newTransaction.aircraft_id}
                  onChange={onChangeTransaction}
                disabled= {aircraftRequired} required>
                  <option value="">Select Aircraft</option>
                  {props.aircraftData.map((aircraft) => (
                    <option
                      value={aircraft.aircraft_id}
                      key={aircraft.aircraft_id}
                    >
                      {aircraft.airline}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>
                  Quantity<span className="requiredAstrick">*</span>:
                </label>
                <input
                  type="number"
                  required
                  name="quantity"
                  className="form-control"
                  value={newTransaction.quantity}
                  onChange={onChangeTransaction}
                />
              </div>
              <div className="right-content">
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-sm-8">
          <h3>Transaction List</h3>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th onClick={() => props.sortData(allTransaction, "transaction_date_time")}>Transaction Date</th>
                  <th>Transaction Type</th>
                  <th onClick={() => props.sortData(allTransaction, "quantity")}>Quantity</th>
                  <th onClick={() => props.sortData(allTransaction, "aircraft_id")}>Aircraft_Id</th>
                  <th onClick={() => props.sortData(allTransaction, "airport_id")}>Airport_Id</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allTransaction.map((item, index) => (
                  <tr key={index}>
                    <td>{item.transaction_date_time}</td>
                    <td>{item.transaction_type}</td>
                    <td>{item.quantity}</td>
                    <td>{item.aircraft_id}</td>
                    <td>{item.airport_id}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={(e) =>
                          onReverseTransaction(e, item.transaction_id)
                        }
                      >
                        Reverse
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row">
        <h3>Fuel Summary Report</h3>
        {/* <div className="table-responsive">
          {summaryReport ? (
            <div>
              {fuelConsumptionPerAirport.map((item) => (
                <ul>
                  {item.map((airport) => (
                    <li>{airport.transaction_type}</li>
                  ))}
                </ul>
              ))}
            </div>
          ) : (
            <di>No trasactions yet</di>
          )}
        </div> */}
      </div>
    </React.Fragment>
  );
}

export default SortingHOC(Transaction);
