export default function Dobbelsteen() {
  let worp = 0;
  const gooiDobbelsteen = () => {
    worp = Math.ceil(Math.random() * 6)
  };


  return (
    <button
      className="snakeEye"
      onClick={gooiDobbelsteen}
      disabled={worp === 1}>
      {worp}
    </button>
  )
}