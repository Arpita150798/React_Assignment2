import React, { Component } from 'react'

class TransactionList extends Component {
    render() {
        const { allTransaction, onReverseTransaction } = this.props
        return (
            <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Transaction Date</th>
                  <th>Transaction Type</th>
                  <th>Quantity</th>
                  <th>Aircraft_Id</th>
                  <th>Airport_Id</th>
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
                    <td><button className="btn btn-primary" onClick={onReverseTransaction}>Reverse</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
    }
}

export default TransactionList
