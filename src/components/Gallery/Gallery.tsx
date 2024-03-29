import { useCallback, useId } from "react";
import "./Gallery.scss";

import { Link } from "react-router-dom";

import galleryList from "../../helpers/galleryList";
import useMatchMedia from "../../hooks/useMatchMedia";

import IBreed from "../../models/IBreed";
import { IReaction } from "../../models/IReaction";

import Button from "../UI/Button/Button";
import { sgvFavourites } from "../../assets/svgs";

interface IGallery {
  list: IBreed[] | IReaction[];
  isOpen: boolean;
  isFavorite: boolean;
  // eslint-disable-next-line react/require-default-props
  removeFavourite?: (arg: string) => void;
}

function Gallery({ list, isOpen, isFavorite, removeFavourite }: IGallery) {
  const gSectionId = useId();
  const { isMobile } = useMatchMedia();

  const gList = galleryList(list);

  const handleRemoveFavourite = useCallback(
    (id: string) => {
      if (typeof removeFavourite === "function") {
        removeFavourite(id);
      }
    },
    [removeFavourite]
  );

  return (
    <div className={`gallery-ui ${isMobile ? "gallery-ui-mobile" : ""}`}>
      {gList.length ? (
        gList.map((gItem, idx) => (
          <ul
            // eslint-disable-next-line react/no-array-index-key
            key={`${gSectionId}-${idx}`}
            className={`gallery-ui__section ${
              idx % 2 ? "gallery-ui__section-revers" : ""
            }`}
          >
            {gItem.map((el, edx) => (
              <li
                key={el.id}
                className={`gallery-ui__section__item gallery-ui__section__item-${edx}`}
                aria-label="gallery item"
              >
                <img
                  loading="lazy"
                  src={el.url}
                  alt={`gallery item by id:${el.id}`}
                />
                {isOpen && (
                  <div className="gallery-ui__section__item__hover gallery-ui__section__item__hover-open">
                    <Link
                      to={`/breeds/${el.id}`}
                      state={{ index: edx, item: el }}
                    >
                      {el.categories
                        ? el.categories[0].name
                        : el.breeds[0].name}
                    </Link>
                  </div>
                )}
                {isFavorite && (
                  <div className="gallery-ui__section__item__hover">
                    <Button
                      type="small_btn"
                      click={() => handleRemoveFavourite(el.id)}
                      svg={sgvFavourites}
                      styles={{
                        background: "var(--pink50-black)",
                      }}
                      aria-label="remove favourite"
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        ))
      ) : (
        <p className="gallery-ui__empty">No item found</p>
      )}
    </div>
  );
}

export default Gallery;
