import React from 'react'
import { MdInsertPageBreak } from "react-icons/md";
import '../Styles/NoTransactions.css'


function NoTransaction() {
  return (
    <div className="no-transactions">
      <MdInsertPageBreak  className='no-transactions-icon'/>
      <h3>No Transactions Found</h3>
      <p>Add some transactions to see report and analysis.</p>
    </div>
  );
}

export default NoTransaction