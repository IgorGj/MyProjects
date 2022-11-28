interface Props {
  title: string;
}

const Suggestion = ({ title }: Props) => {
  return (
    <p
      className="px-2"
      style={{ borderRight: "1px solid black", cursor: "pointer" }}
    >
      {" "}
      {title}{" "}
    </p>
  );
};

export default Suggestion;
