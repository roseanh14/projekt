import React, { useState } from "react";
import { createVisualComponent, PropTypes, Utils } from "uu5g05";
import CreateForm from "./create-form.js";
import Config from "../config/config.js";
import { Button } from "uu5g05-elements";

const Mode = {
  BUTTON: "BUTTON",
  FORM: "FORM",
};

function CreateButton(props) {
  return (
    <Button {...props} colorScheme="primary" significance="highlighted">
      Create list
    </Button>
  );
}

const CreateView = createVisualComponent({
  uu5Tag: Config.TAG + "CreateView",

  propTypes: {
    onCreate: PropTypes.func,
    data: PropTypes.array,
    onDataUpdate: PropTypes.func,  
  },

  defaultProps: {
    onCreate: () => {},
    data: [],
    onDataUpdate: () => {},  
  },

  render(props) {
    const { elementProps } = Utils.VisualComponent.splitProps(props);
    const [mode, setMode] = useState(Mode.BUTTON);

    function handleSubmit(data) {
      try {
        
        props.onCreate(data);
      } catch (error) {
        throw new Utils.Error.Message("List create failed!", error);
      }

      setMode(Mode.BUTTON);
    }


    switch (mode) {
      case Mode.BUTTON:
        return <CreateButton {...elementProps} onClick={() => setMode(Mode.FORM)} />;
      default:
        return (
          <CreateForm
            {...elementProps}
            onSubmit={handleSubmit}
            onCancel={() => setMode(Mode.BUTTON)}
          />
        );
    }
  },
});
export default CreateView;