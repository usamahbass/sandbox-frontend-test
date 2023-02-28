import { renderToString } from "react-dom/server";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import { isFile } from "@app/utils/helper";
import DocumentUploadIcon from "@app/icons/DocumentUpload";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

const FileUpload = ({ files, onChange, ...rest }) => {
  // Register Filepond plugins
  registerPlugin(
    FilePondPluginFileValidateType,
    FilePondPluginFileValidateSize,
    FilePondPluginImagePreview,
    FilePondPluginImageCrop,
    FilePondPluginImageResize,
    FilePondPluginImageTransform
  );

  return (
    <FilePond
      {...rest}
      maxFileSize="50MB"
      className="file-uploader"
      files={files}
      onupdatefiles={(files) => {
        const isFilesFiltered = files?.map((elem) => {
          if (isFile(elem.file)) return elem?.file;
          return elem.source;
        });

        if (isFilesFiltered?.length > 0) {
          onChange(isFilesFiltered);
        }
      }}
      labelIdle={renderToString(
        <div className="filepond--wrapper">
          <DocumentUploadIcon />

          <p className="filepond--label-description">
            Silakan upload foto dalam format JPG atau PNG, gambar otomatis akan
            di resize sesuai ukuran.
          </p>

          <span className="mt-10 filepond--label-action">
            <i className="bi bi-arrow-up-square" /> Jelajahi
          </span>
        </div>
      )}
    />
  );
};

export default FileUpload;
