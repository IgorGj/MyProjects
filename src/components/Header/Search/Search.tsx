import { HeaderProps } from "../types";
import { DebounceInput } from "react-debounce-input";

const Search = ({ setSearchTerm }: HeaderProps) => {
  return (
    <div className="mt-3">
      <DebounceInput
        minLength={2}
        debounceTimeout={500}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control w-25 mx-auto"
      />
    </div>
  );
};

export default Search;
