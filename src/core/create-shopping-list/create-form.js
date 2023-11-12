import React, { useState } from "react";
import { createVisualComponent, PropTypes, Utils } from "uu5g05";
import { Form, FormText, SubmitButton, CancelButton } from "uu5g05-forms";
import Config from "../config/config.js";
import { ItemList } from "../shopping-list-detail/item-list.js"; 

const CreateForm = createVisualComponent({
  uu5Tag: Config.TAG + "CreateForm",

  propTypes: {
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
  },

  defaultProps: {
    onSubmit: () => {},
    onCancel: () => {},
  },

  render(props) {
    const { elementProps } = Utils.VisualComponent.splitProps(props);

    const [formData, setFormData] = useState({
      listName: "",
      owner: "",
      items: [], 
      newItem: "",
    });

    const handleNewItemChange = (value) => {
      setFormData((prevData) => ({ ...prevData, newItem: value }));
    };

    const handleAddItem = () => {
      console.log("Add Item button clicked");
      if (formData.newItem) {
        console.log("Adding item:", formData.newItem);
        const newItem = {
          name: formData.newItem,
         
        };
        setFormData((prevData) => ({
          ...prevData,
          items: [...prevData.items, newItem],
          newItem: "",
        }));
      }
    };
    
    const handleRemoveItem = (itemIndex) => {
      setFormData((prevData) => {
        const newItems = [...prevData.items];
        newItems.splice(itemIndex, 1);
        return { ...prevData, items: newItems };
      });
    };
    
    const handleCheckItem = (itemIndex) => {
      const updatedItems = [...formData.items];
      updatedItems[itemIndex].checked = !updatedItems[itemIndex].checked;
      setFormData((prevData) => ({
        ...prevData,
        items: updatedItems,
      }));
    };
    
    const handleNameChange = (itemIndex, newName) => {
      const updatedItems = [...formData.items];
      updatedItems[itemIndex].name = newName;
      setFormData((prevData) => ({
        ...prevData,
        items: updatedItems,
      }));
    };
    
    return (
      <Form {...elementProps} onSubmit={() => props.onSubmit(formData)}>
        <FormText name="listName" label="Name" />
        <FormText name="owner" label="Owner" />
        <FormText
          name="newItem"
          label="New Item"
          value={formData.newItem}
          onChange={handleNewItemChange}
        />
        <div>
          <button onClick={handleAddItem}>Add Item</button>
        </div>
        <ItemList
  data={formData.items}
  onCheck={handleCheckItem}
  onNameChange={handleNameChange}
  onDelete={handleRemoveItem}
  renderItem={(item, index) => (
    <div key={index}>
      {item.name} {/* Display the item's name */}
      <button onClick={() => handleCheckItem(index)}>
        {item.checked ? "Uncheck" : "Check"}
      </button>
      <button onClick={() => handleNameChange(index, "New Name")}>
        Change Name
      </button>
      <button onClick={() => handleRemoveItem(index)}>Remove</button>
    </div>
  )}
/>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", paddingTop: 8 }}>
          <CancelButton onClick={props.onCancel}>Cancel</CancelButton>
          <SubmitButton>Create shopping list</SubmitButton>
        </div>
      </Form>
    );
  },
});

export default CreateForm;