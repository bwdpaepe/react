export default function Transaction(props) {
  const { user, amount, place } = props;
  return <div>{user} gaf €{amount} uit bij {place}</div>;
}