import React, { useState } from "react";
import Dobbelsteen from "./Dobbelsteen";

export default function Spel({ numberOfEyes = 2 }) {

  const emptyArray = new Array(numberOfEyes).fill(6)

  const [eyes, setEyes] = useState(emptyArray)
  const [total, setTotal] = useState(0)
  const [maxTotal, setMaxTotal] = useState(0)
  


  return (
    <>
      <h1>Snake Eyes</h1>
      <p>Keep going but don't get {numberOfEyes} one's</p>
      <p>Click on a dice to roll</p>
      <p>

      </p>
      {
        eyes.map((eye, index) => {
          <Dobbelsteen key={index} eye={eye} rolDobbelsteen={() => play(index)}/>
        })
      }
      <p>Total: {total}</p>
    </>
  )
}