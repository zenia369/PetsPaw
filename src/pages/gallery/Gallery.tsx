import { useReducer } from "react";
import "./Gallery.scss";

import useBreeds from "../../hooks/useBreeds";
import useBreedsList from "../../hooks/useBreedsList";

import setActiveItem from "../../helpers/setActiveItem";

import { svgArrowCircle, svgUpload } from "../../assets/svgs";
import Breadcrumbs from "../../components/UI/Breadcrumbs/Breadcrumbs";
import DropDownList from "../../components/UI/DropDownList/DropDownList";
import Loader from "../../components/UI/Loader/Loader";
import Modal, { useModal } from "../../components/UI/Modal/Modal";
import Gallery from "../../components/Gallery/Gallery";
import Upload from "./components/Upload/Upload";

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
    list: [
      { name: "Random", active: true },
      { name: "Desc", active: false },
      { name: "Asc", active: false },
    ],
    active: "Random",
  },
  type: {
    list: [
      { name: "All", active: true },
      { name: "Static", active: false },
      { name: "Animated", active: false },
    ],
    active: "jpg,gif,png",
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
          list: setActiveItem(state.order.list, action.payload, "name").newList,
          active: action.payload,
        },
      };
    case "type":
      return {
        ...state,
        type: {
          list: setActiveItem(state.type.list, action.payload, "name").newList,
          active:
            // eslint-disable-next-line no-nested-ternary
            action.payload === "All"
              ? "jpg,gif,png"
              : action.payload === "Static"
              ? "jpg,png"
              : "gif",
        },
      };
    default:
      return state;
  }
}

const DEFAULTDropWidthStyles = { background: "white" };

function GalleryPage() {
  const [{ limit, order, type }, dispatch] = useReducer(reducers, initialState);
  const { breeds, isFetchedBreeds, reducedBreedsId, setActiveBreeds } =
    useBreeds();
  const { breedsList, isFetchingList, refetchList } = useBreedsList({
    reducedBreedsId,
    isFetchedBreeds,
    params: {
      limit: limit.active,
      order: order.active,
      mime_types: type.active,
    },
    queryTags: ["gallery-page-list"],
  });
  const [modal, setModal] = useModal();

  return (
    <section className="pages gallery">
      {modal ? (
        <Modal closeHandler={setModal}>
          <Upload />
        </Modal>
      ) : null}
      <Breadcrumbs pageName="gallery">
        <button
          className="gallery__upload-btn"
          type="button"
          onClick={setModal}
        >
          {svgUpload}
          upload
        </button>
      </Breadcrumbs>
      {isFetchedBreeds && breeds && !isFetchingList && breedsList ? (
        <>
          <div className="gallery__controls">
            <DropDownList
              click={(arg: string | number) =>
                dispatch({ type: "order", payload: arg })
              }
              listItmes={order.list}
              label="ORDER"
              dropWidthStyles={DEFAULTDropWidthStyles}
              dropWidthClass="infinity"
            />
            <DropDownList
              click={(arg: string | number) =>
                dispatch({ type: "type", payload: arg })
              }
              listItmes={type.list}
              label="TYPE"
              dropWidthStyles={DEFAULTDropWidthStyles}
              dropWidthClass="infinity"
            />
            <DropDownList
              click={setActiveBreeds}
              listItmes={breeds}
              label="BREED"
              dropWidthStyles={DEFAULTDropWidthStyles}
              dropWidthClass="infinity"
            />
            <div>
              <DropDownList
                click={(arg: string | number) =>
                  dispatch({ type: "limit", payload: arg })
                }
                listItmes={limit.list}
                label="LIMIT"
                dropWidthStyles={DEFAULTDropWidthStyles}
                dropWidthClass="infinity"
              />
              <button type="button" onClick={() => refetchList()}>
                {svgArrowCircle}
              </button>
            </div>
          </div>
          {breedsList.length ? (
            <Gallery list={breedsList} isFavorite={false} isOpen />
          ) : (
            <p>Empty list</p>
          )}
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
}

export default GalleryPage;
