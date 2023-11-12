//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import Config from "../config/config.js";
import Item from "./item";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      display: "inline-block",
      width: 320,
    }),
};
//@@viewOff:css

const ItemList = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ItemList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const { data, onCheck, onNameChange, onDelete } = props;

    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    //@@viewOn:render
    return (
      <div {...attrs}>
        {data.map((item, i) => (
          <Item
            key={item.id || i}
            {...item}
            onCheck={() => onCheck(item.id)}
            onNameChange={(newName) => onNameChange(item.id, newName)}
            onDelete={onDelete ? () => onDelete(item.id) : undefined}
          />
        ))}
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ItemList };
export default ItemList;
//@@viewOff:exports
