//@@viewOn:imports
import { createComponent, Utils } from "uu5g05";
import Config from "../config/config.js";
//@@viewOff:imports

const ListProvider = createComponent({
    //@@viewOn:statics
    uu5Tag: Config.TAG + "ListProvider",
    //@@viewOff:statics
  
    //@@viewOn:propTypes
    propTypes: {},
    //@@viewOff:propTypes
  
    //@@viewOn:defaultProps
    defaultProps: {},
    //@@viewOff:defaultProps
  
    render(props) {

     
      let ListList = props.ListList 
      function remove(list) {
        ListList = listList.filter((item) => item.id !== list.id);
      }
  
      function update() {
        throw new Error("List update is not implemented yet.");
      }
      //@@viewOff:private
  
      //@@viewOn:render
      const value = { ListList, remove, update };
      return typeof props.children === "function" ? props.children(value) : props.children;
      //@@viewOff:render
    },
  });
  
  //@@viewOn:exports
  export { ListProvider };
  export default ListProvider;
  //@@viewOff:exports