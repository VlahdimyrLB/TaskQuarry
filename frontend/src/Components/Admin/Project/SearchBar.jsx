import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
const SearchBar = ({ handleSearchChange, searchQuery }) => {
  return (
    <Input
      type="text"
      icon={<MagnifyingGlassIcon className="h-5 w-5" />}
      label="Search for a Project"
      value={searchQuery}
      onChange={handleSearchChange}
    />
  );
};

export default SearchBar;
