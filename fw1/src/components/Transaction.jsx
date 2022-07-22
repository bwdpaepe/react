import React from "react";
export default React.memo(function Transaction(props) {
  console.log('Render transaction');
  return (<div className="card">
    <div className="card-body">
      <div className="card-text display-1">
        {props.user} gaf {props.amount}€ uit bij de {props.place}.
      </div>
    </div>
  </div>);
}
)