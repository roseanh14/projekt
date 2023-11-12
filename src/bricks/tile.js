import { createVisualComponent } from "uu5g05";
import { Config } from "uu5g05-dev";
import Uu5Elements from "uu5g05-elements";
import Uu5TilesElements from "uu5tilesg02-elements";
import PropTypes from "prop-types";

const Tile = createVisualComponent({
  uu5Tag: "Uu5TilesElements.Mock.Tile",
  propTypes: {
    onDelete: PropTypes.func,
    onArchive: PropTypes.func,
    data: PropTypes.shape({
      listName: PropTypes.string,
      class: PropTypes.string,
      items: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
  },
  defaultProps: {
    onDelete: () => {},
    onArchive: () => {},
  },
  render(props) {
    const { data, onDelete, onArchive, ...otherProps } = props;



    return (
      <Uu5TilesElements.Tile {...otherProps} headerOverlap>
        {({ padding }) => {
          return (
            <>
              <div className={Config.Css.css({
                paddingTop: padding.top,
                paddingRight: padding.right,
                paddingBottom: padding.bottom,
                paddingLeft: padding.left,
              })}>
                <div>
                  <Uu5Elements.Icon icon="uugds-favorites" />
                  <strong>{data.listName}</strong>
                  <em>({data.class})</em>
                </div>
                <small key="taxonomy">
                  <div>
                    Ingredients{"\xA0"}
                    <ul>
                      {data.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </small>
                <button onClick={() => onDelete(data)} style={{ color: "red" }}>Delete</button>
                
              </div>
            </>
          );
        }}
      </Uu5TilesElements.Tile>
    );
  },
});

export default Tile;