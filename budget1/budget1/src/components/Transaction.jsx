export default function Transaction(props) {
  const { wie, bedrag, waar } = props;
  return (
    <div className="bg-red-400 text-left">{wie} betaalt {bedrag}€ bij {waar}.</div>
  )
}