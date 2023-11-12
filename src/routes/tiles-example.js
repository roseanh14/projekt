


import { Utils, createVisualComponent, useState } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import Uu5Tiles from "uu5tilesg02";
import Uu5TilesControls from "uu5tilesg02-controls";


import Tile from "../bricks/tile.js";
import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import CreateView from "../core/create-shopping-list/create-view.js";
import ListProvider from "../core/create-shopping-list/list-provider";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Elements from "uu5g05-elements";


const DATA = [
  {
    id: "list01",
    listName: "Kaufland",
    ownerId: "Vojta",
    items: ["Milk", "Bread", "Eggs", "Banana", "Cinnamon"],
    archived: false
  },
  {
    id: "list02",
    listName: "Lidl",
    ownerId: "Eva",
    items: ["Cake", "Strawberry", "Melon", "Chocolate", "Cinnamon"],
    archived: true
  },
  {
    id: "list03",
    listName: "Tesco",
    ownerId: "Linda",
    items: ["Blueberry", "Strawberry", "Bread", "Chocolate", "Cinnamon"],
    archived: false
  },
  {
    id: "list04",
    listName: "Globus",
    ownerId: "Marek",
    items: ["Cake", "Honey", "Broccoli", "Chocolate Chips", "Cinnamon"],
    archived: false
  },
  {
    id: "list05",
    listName: "Makro",
    ownerId: "Marcela",
    items: ["Potatoes", "Fish", "Broccoli", "Pumpkin", "Cinnamon"],
    archived: false
  },
  {
    id: "list06",
    listName: "KIK",
    ownerId: "Jana",
    items: ["Potatoes", "Fish", "Broccoli", "Pumpkin latte", "Cinnamon Milk"],
    archived: false
  },
];

const FILTER_LIST = [
  {
    key: "listName",
    label: "Name",
    filter: (item, value) => {
      let fragments = value.split(/[\s,.-;:_]/);
      return fragments.some((frag) => {
        let itemValue =
          typeof item.listName === "object" ? Utils.Language.getItem(item.listName) : item.listName;
        return itemValue.toLowerCase().indexOf(frag.toLowerCase()) !== -1;
      });
    },
    inputProps: { placeholder: { en: "Enter value", cs: "Zadejte hodnotu" } },
  },
  {
    key: "archivedOnly",
    label: "Archived Only",
    filter: (item, value) => {
      if (value) {
        return item.archived === true;
      }
      return true;
    },
    inputType: "bool",
  }
];

const SORTER_LIST = [
  {
    key: "listName",
    label: "Name",
    sort: (a, b) => a.listName.localeCompare(b.listName),
  },
];

//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let TilesExample = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "TilesExample",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [filterList, setFilterList] = useState([]);
    const [sorterList, setSorterList] = useState([]);
    const [data, setData] = useState(DATA);
    const [archivedOnly, setArchivedOnly] = useState(false);
    const { id, name, onDelete, isOwner } = props;
    const deleteButton = isOwner ? [{ icon: "uugds-close", onClick: onDelete }] : undefined;
    const filteredTiles = data.filter(tileData => (archivedOnly ? tileData.archived : true));
    const tiles = [];

    for (const tileData of filteredTiles) {
      tiles.push(
        <Tile key={tileData.id} data={tileData} onDelete={() => deleteTile(tileData.id)} />
      );
    }



    

    function onFilterChange(e) {
      setFilterList(e.data.filterList);
     
      const archivedFilter = e.data.filterList.find(filter => filter.key === "archivedOnly");
      setArchivedOnly(archivedFilter ? archivedFilter.value : false);
    }

    function onSorterChange(e) {
      setSorterList(e.data.sorterList);
    }


    function deleteTile(id) {
      setData((prevData) => {
        const updatedData = prevData.filter((item) => item.id !== id);
        return updatedData;
      });
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <RouteBar />
        <ListProvider ListList={data}>
          {({ create }) => (
            <>
              <CreateView onCreate={create} data={data} style={{ maxWidth: 400, margin: "24px auto", display: "block" }} />
            </>
          )}
        </ListProvider>

        <div className={Config.Css.css({ padding: "16px 32px" })}>
          <Uu5Tiles.ControllerProvider
            data={data}
            filterDefinitionList={FILTER_LIST}
            filterList={filterList}
            onFilterChange={onFilterChange}
            sorterDefinitionList={SORTER_LIST}
            sorterList={sorterList}
            onSorterChange={onSorterChange}
          >
            <Uu5TilesControls.FilterButton />
            <Uu5TilesControls.SorterButton />
            <Uu5TilesControls.SearchButton />
            <Uu5TilesControls.FilterBar initialExpanded />
            <Uu5TilesControls.SorterBar initialExpanded />
            <Uu5TilesControls.Counter />                                               
            <Uu5TilesElements.Grid tileMinWidth={100} tileMaxWidth={200}>      
  {tiles.map((tile) => tile)} 
</Uu5TilesElements.Grid>

<Uu5Elements.ListItem significance="subdued" actionList={deleteButton}>
      {name} ({id})
    </Uu5Elements.ListItem>
          </Uu5Tiles.ControllerProvider>


        </div>
      </div>
    );
  }
});

TilesExample = withRoute(TilesExample, { authenticated: true });

export { TilesExample };
export default TilesExample;