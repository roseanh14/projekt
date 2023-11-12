//@@viewOn:imports
import { createVisualComponent, useSession, useState, Utils } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "../config/config.js";
import ItemList from "./item-list";
import TextInput from "./text-input";
import MemberManager from "./member-manager";
//@@viewOff:imports

//@@viewOn:constants
const INITIAL_DATA = {
  id: "cd8f0b48",
  name: "Kaufland",
  memberList: [{ id: "m01", name: "Karel Omáčka" }],
  itemList: [
    { id: Utils.String.generateId(), name: "Cukr" },
    { id: Utils.String.generateId(), name: "Mouka", checked: true },
  ],
  owner: { id: "7181-6875-5963-0000", name: "Thi Anh Tuyet Phan" },
};

// TODO work 1h 45min
//@@viewOff:constants

//@@viewOn:css
const Css = {
  panel: () =>
    Config.Css.css({
      marginTop: 32,
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ShoppingListDetail = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingListDetail",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    data: INITIAL_DATA,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { data } = props;

    const [name, setName] = useState(data.name);
    const [memberList, setMemberList] = useState(data.memberList);
    const [itemList, setItemList] = useState(data.itemList);

    const [modalOpen, setModalOpen] = useState(false);

    const { identity } = useSession();
    const isOwner = identity?.uuIdentity === data.owner.id;

    const uncheckedItemList = [];
    const checkedItemList = [];
    itemList.forEach((item) => {
      item.checked ? checkedItemList.push(item) : uncheckedItemList.push(item);
    });
    uncheckedItemList.push({});

    const [checkedOpen, setCheckedOpen] = useState(false);

    function handleCheckItem(id) {
      if (id) {
        setItemList(([...currItemList]) => {
          const index = currItemList.findIndex((item) => item.id === id);
          const item = currItemList[index];
          currItemList.splice(index, 1, { ...item, checked: !item.checked });
          return currItemList;
        });
      }
    }

    function handleChangeName(id, name) {
      setItemList(([...currItemList]) => {
        if (id) {
          const index = currItemList.findIndex((item) => item.id === id);
          const item = currItemList[index];
          currItemList.splice(index, 1, { ...item, name });
        } else {
          if (name) currItemList.push({ id: Utils.String.generateId(), name });
        }
        return currItemList;
      });
    }

    function handleDelete(id) {
      setItemList(([...currItemList]) => {
        const index = currItemList.findIndex((item) => item.id === id);
        currItemList.splice(index, 1);
        return currItemList;
      });
    }
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Uu5Elements.Block
        header={
          <Uu5Elements.Text category="interface" segment="title" type="common">
            {isOwner
              ? ({ style }) => (
                  <TextInput className={Config.Css.css(style)} id={"header"} value={name} onChange={setName} />
                )
              : name}
          </Uu5Elements.Text>
        }
        actionList={[
          { icon: "uugdsstencil-user-account-key", children: data.owner.name, onClick: () => setModalOpen(true) },
        ]}
        headerSeparator={true}
      >
        <ItemList
          data={uncheckedItemList}
          onCheck={handleCheckItem}
          onNameChange={handleChangeName}
          onDelete={handleDelete}
        />
        {checkedItemList.length ? (
          <Uu5Elements.LinkPanel
            header="Show checked"
            open={checkedOpen}
            onChange={() => setCheckedOpen(!checkedOpen)}
            className={Css.panel()}
          >
            <ItemList data={checkedItemList} onCheck={handleCheckItem} onNameChange={handleChangeName} />
          </Uu5Elements.LinkPanel>
        ) : null}

        <MemberManager
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          data={memberList}
          onChange={setMemberList}
          isOwner={isOwner}
        />
      </Uu5Elements.Block>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShoppingListDetail };
export default ShoppingListDetail;
//@@viewOff:exports
