/* eslint-disable no-nested-ternary */
import "./Search.scss";

import { Link, useLocation } from "react-router-dom";
import { useQuery } from "react-query";

import { getBreedsWithParams } from "../../../services/breeds.service";

import { LINK } from "../../../routes/links";
import IBreed from "../../../models/IBreed";
import Breadcrumbs from "../../../components/UI/Breadcrumbs/Breadcrumbs";
import Loader from "../../../components/UI/Loader/Loader";
import Gallery from "../../../components/Gallery/Gallery";

type TLocation = { state: { search: string[] } };

function Search() {
  const {
    state: { search },
  }: TLocation = useLocation();
  const { data, isFetching } = useQuery<IBreed[]>(
    [LINK.search, search.toString()],
    () => getBreedsWithParams({ limit: 10, breed_ids: search.toString() }),
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
        <Gallery list={data} isOpen isFavorite={false} />
      ) : (
        <Loader />
      )}
    </section>
  );
}

export default Search;
