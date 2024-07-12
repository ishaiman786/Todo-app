import React, { useState } from 'react';
import './TodoList.css'; // Assuming you have a CSS file for TodoList styles

function TodoList({ index, item, completed, deleteItem, editItem, toggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(item); // Initialize editedText with the current todo item text
  const [isConfirming, setIsConfirming] = useState(false); // State to handle confirmation step

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditedText(item); // Reset editedText to current item text when toggling edit mode
  };

  const handleSave = () => {
    if (!isConfirming) {
      // Show confirmation step
      setIsConfirming(true);
    } else {
      // Apply edits
      if (editedText.trim() !== '') {
        editItem(index, editedText); // Call the editItem function passed as props
        setIsEditing(false); // Exit edit mode
        setIsConfirming(false); // Reset confirmation state
      }
    }
  };

  const handleInputChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // Exit edit mode
    setIsConfirming(false); // Reset confirmation state
  };

  return (
    <li className={`list-item ${completed ? 'completed' : ''}`}>
      {isEditing ? (
  <>
    <input
      type="text"
      value={editedText}
      onChange={handleInputChange}
      autoFocus
      className="edit-input"
    />
    <span className="edit-buttons">
      <i className="fa fa-check icon-save" onClick={handleSave}></i>
      <i className="fa fa-times icon-cancel" onClick={handleCancelEdit}></i>
    </span>
  </>
) : (
  <>
    <span className="todo-text">{item}</span>
    <span className='icons'>
      <i className={`fa-solid fa-check icon-tick ${completed ? 'completed' : ''}`} onClick={toggleComplete}></i>
      <i className="fa-solid fa-edit icon-edit" onClick={handleEditToggle}></i>
      <i className="fa-solid fa-trash-can icon-delete" onClick={() => deleteItem(index)}></i>
    </span>
  </>
)}
    </li>
  );
}

export default TodoList;