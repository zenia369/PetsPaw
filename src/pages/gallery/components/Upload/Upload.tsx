/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { DragEvent, useMemo, useRef, useState, ChangeEvent } from "react";
import "./Upload.scss";

import { useMutation } from "react-query";

import { uploadPhoto } from "../../../../services/app.service";

import { svgImg } from "../../../../assets/svgs";
import uploadOk from "../../../../assets/images/upload_ok.png";
import uploadErr from "../../../../assets/images/upload_err.png";
import useMatchMedia from "../../../../hooks/useMatchMedia";

function Upload() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const { mutate, isLoading, isSuccess, isError } = useMutation(uploadPhoto, {
    onSuccess() {
      setFile(undefined);
    },
  });
  const { isDesktop } = useMatchMedia();

  const previewUrl = useMemo(
    () => file && window.URL.createObjectURL(file),
    [file]
  );

  const handleInputFileClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };
  const handleChangeInputFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setFile(event.target.files[0]);
  };
  const handleDragDropFile = (event: DragEvent) => {
    const dt = event.dataTransfer;
    setFile(dt.files[0]);
    event.preventDefault();
  };

  return (
    <div className={`upload ${isDesktop ? "" : "upload-adaptive"}`}>
      <h4 className="upload__title">Upload a .jpg or .png Cat Image</h4>
      <p className="upload__subTitle">
        Any uploads must comply with the{" "}
        <a href="https://thecatapi.com/privacy">upload guidelines</a> or face
        deletion.
      </p>
      <button
        className="upload__img"
        onClick={handleInputFileClick}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDragDropFile}
        type="button"
        aria-label="uploader"
      >
        <input
          type="file"
          ref={inputFileRef}
          accept="image/*, .jpg, .jpeg, .png"
          onChange={handleChangeInputFile}
          data-testid="uploader"
        />
        {file ? (
          <img
            className="upload__img__full"
            src={previewUrl}
            alt="uploaded content"
          />
        ) : (
          <div className="upload__img__none">
            {svgImg}
            <p>
              <strong>Drag here</strong> your file or{" "}
              <strong>Click here</strong> to upload
            </p>
          </div>
        )}
      </button>
      <div className="upload__controls">
        {file ? (
          <div className="upload__controls__full">
            <p>Image File Name: {file.name}</p>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => mutate(file)}
              aria-label="upload photo"
            >
              UPLOAD PHOTO
            </button>
          </div>
        ) : (
          <p className="upload__controls__none" data-testid="no file selected">
            No file selected
          </p>
        )}
      </div>
      <div className="upload__status">
        {isSuccess && (
          <>
            <img src={uploadOk} alt="upload ok" />
            <p className="upload__status__ok" data-testid="successful uploaded">
              Thanks for the Upload - Cat found!
            </p>
          </>
        )}
        {isError && (
          <>
            <img src={uploadErr} alt="upload err" />
            <p className="upload__status__err" data-testid="fail uploaded">
              No Cat found - try a different one.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Upload;
