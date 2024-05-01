import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
const SearchBar = () => {
  return (
    <div className="w-96">
      <Input
        label="Search"
        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
      />
    </div>
  );
};
export default SearchBar;
