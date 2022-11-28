import Suggestion from "../Suggestion/Suggestion";

interface Props {
  data: string[];
}

const SuggestionList = ({ data }: Props) => {
  return (
    <div className="container">
      <div className="row">
        {data.length > 0 ? <h5>Explore Titles Related To: </h5> : ""}
        {data.map((title) => (
          <Suggestion title={title} />
        ))}
      </div>
    </div>
  );
};

export default SuggestionList;
