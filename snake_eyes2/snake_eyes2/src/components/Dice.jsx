import { useState } from "react";
export default function Dice() {

  const [eyes, setEyes] = useState(1);

  const role = () => {
    const newValue = Math.floor(Math.random() * 6 + 1)
    const newEyes = newValue;
    setEyes(newEyes);


  }


  return (<div
    className="border inline-flex w-24 h-24 "
    onClick={role}
  >{eyes}</div>);
}