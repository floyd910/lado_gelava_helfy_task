import React from "react";
import "../../styles/EditModal.css";

const EditModal = ({
  submitEditing,
  setEditDescription,
  setEditTitle,
  setEditPriority,
  setIsModalOpen,
  editTitle,
  editDescription,
  editPriority,
}) => {
  const priorities = ["low", "medium", "high"];

  return (
    <div className="modal_overlay">
      <div className="modal">
        <div className="task_form">
          <button className="modal_close" onClick={() => setIsModalOpen(false)}>
            ✕
          </button>
          <h2 className="box_title">Edit Task</h2>
          <br />
          <div className="form">
            <input
              type="text"
              placeholder="Title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <textarea
              rows="7"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
            <div className="priorities">
              {priorities.map((pr) => (
                <button
                  type="button"
                  key={pr}
                  className={`${pr} ${
                    editPriority === pr ? "active priority_btn" : "priority_btn"
                  }`}
                  onClick={() => setEditPriority(pr)}
                >
                  {pr}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={submitEditing}
              className="submit_btn"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="submit_btn"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
