import { useCallback, useState } from "react";
import "./Search.scss";

import { useNavigate } from "react-router-dom";

import useMatchMedia from "../../hooks/useMatchMedia";
import { LINK } from "../../routes/links";

import { svgSearch } from "../../assets/svgs";
import Button from "../UI/Button/Button";

function Search() {
  const [search, setSearch] = useState("");
  const navigation = useNavigate();
  const { isMobile } = useMatchMedia();

  const handleClick = useCallback(() => {
    if (search.length) {
      navigation(LINK.pageSearch, {
        state: { search: search.split(/,|and/).map((s) => s.trim()) },
      });
      setSearch("");
    }
  }, [search, navigation]);

  return (
    <div className={`search-ui ${isMobile ? "search-ui-mobile" : ""}`}>
      <input
        placeholder="Search for breeds by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button type="small_btn" click={handleClick} svg={svgSearch} />
    </div>
  );
}

export default Search;
