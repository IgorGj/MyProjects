import Search from "./Search/Search";
import { HeaderProps } from "./types";

const Header = ({ setSearchTerm }: HeaderProps) => {
  return (
    <div>
      <Search setSearchTerm={setSearchTerm} />
      <h3>Find Your Favorite Movie</h3>
    </div>
  );
};

export default Header;
