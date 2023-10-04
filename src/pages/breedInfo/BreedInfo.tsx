import "./BreedInfo.scss";

import { useLocation } from "react-router-dom";

import { LINK } from "../../routes/links";
import ICategory from "../../models/ICategory";

import Breadcrumbs from "../../components/UI/Breadcrumbs/Breadcrumbs";
import Loader from "../../components/UI/Loader/Loader";
import useMatchMedia from "../../hooks/useMatchMedia";
import useBreedInfo from "../../hooks/useBreedInfo";

interface ILocacation {
  state: {
    index: number;
    item: ICategory;
  };
}

function BreedInfo() {
  const {
    state: { item, index },
  }: ILocacation = useLocation();
  const { data, isFetching } = useBreedInfo(item.id);
  const { isMobile } = useMatchMedia();

  return (
    <section className="pages breed-info">
      <Breadcrumbs pageName={LINK.breeds} crumbs={[item.id]} />
      <div className="breed-info__img">
        <img src={item.url} alt={`breed info by id:${item.id}`} />
        <div
          className={`breed-info__img__position breed-info__img__position-${index}-active`}
        >
          {Array(5)
            .fill(null)
            .map((_, idx) => (
              <span
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                className={idx === index ? "active" : ""}
              />
            ))}
        </div>
      </div>
      {isFetching && !data ? (
        <Loader addClass={["mini-cat"]} />
      ) : (
        <div
          className={`breed-info__content ${
            isMobile ? "breed-info__content-adaptive" : ""
          }`}
        >
          {data?.breeds.length ? (
            <>
              <h3 className="breed-info__content__breed">
                {data.breeds[0].name}
              </h3>
              <h5 className="breed-info__content__name">
                {data.breeds[0].description}
              </h5>
              <div className="breed-info__content__info">
                <div className="breed-info__content__info__left">
                  <p>
                    Temperament: <br />
                    <span>{data.breeds[0].temperament}</span>
                  </p>
                </div>
                <div className="breed-info__content__info__right">
                  <p>
                    Origin: <span>{data.breeds[0].origin}</span>
                  </p>
                  <p>
                    Weight: <span>{data.breeds[0].weight.metric} kgs</span>
                  </p>
                  <p>
                    Life span: <span>{data.breeds[0].life_span} years</span>
                  </p>
                </div>
              </div>
            </>
          ) : (
            <p className="breed-info__empty">Information not found</p>
          )}
        </div>
      )}
    </section>
  );
}

export default BreedInfo;
