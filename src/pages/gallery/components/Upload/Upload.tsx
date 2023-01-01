/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { DragEvent, useMemo, useRef, useState } from "react";
import "./Upload.scss";

import { useMutation } from "react-query";

import { uploadPhoto } from "../../../../services/app.service";

import { svgImg } from "../../../../assets/svgs";
import uploadOk from "../../../../assets/images/upload_ok.png";
import uploadErr from "../../../../assets/images/upload_err.png";

function Upload() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const { mutate, isLoading, isSuccess, isError } = useMutation(uploadPhoto, {
    onSuccess() {
      setFile(undefined);
    },
  });

  const previewUrl = useMemo(
    () => file && window.URL.createObjectURL(file),
    [file]
  );

  const handleInputFileClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };
  const handleChangeInputFile = (event: any) => {
    setFile(event.target.files[0]);
  };
  const handleDragDropFile = (event: DragEvent) => {
    const dt = event.dataTransfer;
    setFile(dt.files[0]);
    event.preventDefault();
  };

  return (
    <div className="upload">
      <h4 className="upload__title">Upload a .jpg or .png Cat Image</h4>
      <p className="upload__subTitle">
        Any uploads must comply with the{" "}
        <a href="https://thecatapi.com/privacy">upload guidelines</a> or face
        deletion.
      </p>
      <div
        className="upload__img"
        onClick={handleInputFileClick}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDragDropFile}
      >
        <input
          type="file"
          ref={inputFileRef}
          accept="image/*, .jpg, .jpeg, .png"
          onChange={handleChangeInputFile}
        />
        {file ? (
          <img
            className="upload__img__full"
            src={previewUrl}
            alt="uploaded data"
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
      </div>
      <div className="upload__controls">
        {file ? (
          <div className="upload__controls__full">
            <p>Image File Name: {file.name}</p>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => mutate(file)}
            >
              UPLOAD PHOTO
            </button>
          </div>
        ) : (
          <p className="upload__controls__none">No file selected</p>
        )}
      </div>
      {(isSuccess || isError) && (
        <div className="upload__status">
          {isSuccess && (
            <>
              <img src={uploadOk} alt="upload ok" />
              <p className="upload__status__ok">
                Thanks for the Upload - Cat found!
              </p>
            </>
          )}
          {isError && (
            <>
              <img src={uploadErr} alt="upload err" />
              <p className="upload__status__err">
                No Cat found - try a different one.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Upload;
