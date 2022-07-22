export default function TodoItem(props) {
  const { text, description, done } = props;
  /*const text = "boodschappen";
  const description = "koop brood en beleg";
  const done = true;*/
  return <div className="bg-blue-200 text-left"><div>{text}</div><div>{description}</div><div>{done}</div></div >;
}