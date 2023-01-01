import { useCallback, useReducer } from "react";
import "./Breeds.scss";

import setActiveItem from "../../helpers/setActiveItem";

import useBreeds from "../../hooks/useBreeds";
import useBreedsList from "../../hooks/useBreedsList";

import { LINK } from "../../routes/links";

import { svgSordUp, svgSortDown } from "../../assets/svgs";
import DropDownList from "../../components/UI/DropDownList/DropDownList";
import Breadcrumbs from "../../components/UI/Breadcrumbs/Breadcrumbs";
import Loader from "../../components/UI/Loader/Loader";
import Gallery from "../../components/Gallery/Gallery";

const initialState = {
  limit: {
    list: [
      { name: 5, active: true },
      { name: 10, active: false },
      { name: 15, active: false },
      { name: 20, active: false },
    ],
    active: 5,
  },
  order: {
    active: "Random",
  },
};

type TInitialState = typeof initialState;

function reducers(
  state: TInitialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "limit":
      return {
        ...state,
        limit: {
          active: action.payload,
          list: setActiveItem(state.limit.list, action.payload, "name").newList,
        },
      };
    case "order":
      return {
        ...state,
        order: {
          active: action.payload,
        },
      };

    default:
      return state;
  }
}

function Breeds() {
  const [{ limit, order }, dispatch] = useReducer(reducers, initialState);

  const { breeds, isFetchedBreeds, reducedBreedsId, setActiveBreeds } =
    useBreeds();
  const { breedsList, isFetchingList, refetchList } = useBreedsList({
    reducedBreedsId,
    isFetchedBreeds,
    params: {
      limit: limit.active,
      order: order.active,
    },
    queryTags: ["breeds-page-list", order.active, reducedBreedsId],
  });

  const setLimit = useCallback(
    async (arg: number | string) => {
      await dispatch({ type: "limit", payload: arg });
      refetchList();
    },
    [refetchList]
  );
  const sortList = useCallback((type: "ASC" | "DESC") => {
    dispatch({ type: "order", payload: type });
  }, []);

  return (
    <section className="pages breeds">
      {isFetchedBreeds && breeds && !isFetchingList && breedsList ? (
        <>
          <Breadcrumbs pageName={LINK.breeds}>
            <>
              <DropDownList listItmes={breeds} click={setActiveBreeds} />
              <DropDownList
                listItmes={limit.list}
                dropName="Limit: "
                dropWidthClass="small"
                click={setLimit}
              />
              <button
                type="button"
                onClick={() => sortList("ASC")}
                className="breeds__btn__sort"
              >
                {svgSortDown}
              </button>
              <button
                type="button"
                onClick={() => sortList("DESC")}
                className="breeds__btn__sort"
              >
                {svgSordUp}
              </button>
            </>
          </Breadcrumbs>
          <Gallery list={breedsList} isOpen isFavorite={false} />
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
}

export default Breeds;
