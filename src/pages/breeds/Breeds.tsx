import { useReducer } from "react";
import "./Breeds.scss";

import setActiveItem from "../../helpers/setActiveItem";

import useBreeds from "../../hooks/useBreeds";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const { breeds, setActiveBreeds, petsPhotos, refetchPetsPhotos, isLoading } =
    useBreeds({
      pageQueryTag: "BREEDS_PAGE",
      params: {
        limit: limit.active,
        order: order.active,
      },
    });

  const setLimit = async (arg: number | string) => {
    await dispatch({ type: "limit", payload: arg });
    refetchPetsPhotos();
  };
  const sortList = async (orderType: "ASC" | "DESC") => {
    await dispatch({ type: "order", payload: orderType });
    refetchPetsPhotos();
  };

  return (
    <section className="pages breeds">
      <Breadcrumbs pageName={LINK.breeds}>
        {breeds && (
          <div className="breeds__controls">
            <DropDownList
              listItmes={breeds}
              click={setActiveBreeds}
              ariaLabel="category dropdown"
            />
            <DropDownList
              listItmes={limit.list}
              dropName="Limit: "
              dropWidthClass="small"
              click={setLimit}
              ariaLabel="limit dropdown"
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
          </div>
        )}
      </Breadcrumbs>
      {!isLoading && petsPhotos ? (
        <Gallery
          list={[...petsPhotos].slice(0, limit.active)}
          isOpen
          isFavorite={false}
        />
      ) : (
        <Loader />
      )}
    </section>
  );
}

export default Breeds;
