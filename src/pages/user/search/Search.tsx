/* eslint-disable no-nested-ternary */
import "./Search.scss";

import { Link, useLocation } from "react-router-dom";
import { useQuery } from "react-query";

import { getBreedsByQuery } from "../../../services/app.service";

import { LINK } from "../../../routes/links";
import IBreed from "../../../models/IBreed";
import Breadcrumbs from "../../../components/UI/Breadcrumbs/Breadcrumbs";
import Loader from "../../../components/UI/Loader/Loader";
import Gallery from "../../../components/Gallery/Gallery";

function Search() {
  const {
    state: { search },
  }: { state: { search: string[] } } = useLocation();
  const { data, isFetching } = useQuery<IBreed[]>(
    [LINK.search, search.toString()],
    () => getBreedsByQuery(search),
    {
      refetchOnMount: false,
    }
  );

  return (
    <section className="pages search">
      <Breadcrumbs pageName="search" />
      <h4 className="search__title">
        Search results for: <span>{search.toString()}</span> (or try:{" "}
        <Link to={LINK.pageSearch} state={{ search: "beng" }}>
          Beng
        </Link>
        ,{" "}
        <Link to={LINK.pageSearch} state={{ search: "abys" }}>
          Abys
        </Link>
        )
      </h4>
      {!isFetching && data ? (
        data.length ? (
          <Gallery list={data} isOpen isFavorite={false} />
        ) : (
          <p className="search__empty">Information not found</p>
        )
      ) : (
        <Loader />
      )}
    </section>
  );
}

export default Search;
