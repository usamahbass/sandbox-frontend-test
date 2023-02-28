import { Controller } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import EditorBuildClassic from "@ckeditor/ckeditor5-build-classic";
import PropTypes from "prop-types";

const Editor = ({
  name,
  control,
  defaultValue,
  required,
  setValue,
  ...rest
}) => {
  return (
    <Controller
      defaultValue=""
      name={name}
      control={control}
      rules={{ required: required }}
      render={({ field: { onChange, value } }) => {
        return (
          <CKEditor
            data={value ?? ""}
            editor={EditorBuildClassic}
            onChange={(_, editor) => {
              const data = editor.getData();
              onChange(data);
            }}
            {...rest}
          />
        );
      }}
    />
  );
};

Editor.defaultProps = {
  control: () => {},
  defaultValue: "",
  required: false,
  setValue: () => {},
};

Editor.propTypes = {
  name: PropTypes.string,
  control: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  required: PropTypes.bool,
  setValue: PropTypes.func,
};

export default Editor;
