import { useApp } from "../context/AppContext";
import iconCheck from "../assets/icons/icon-check.png";
import iconEdit from "../assets/icons/icon-edit.png";

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

type EditButtonProps = {
  currentTask: Task;
  onConfirmEdit: () => void;
};

function EditButton({ currentTask, onConfirmEdit }: EditButtonProps) {
  const { setEditableTaskId, editableTaskId } = useApp();
  const isEditing = editableTaskId === currentTask.id;

  const handleButtonClick = () => {
    if (isEditing) {
      onConfirmEdit();
    } else {
      setEditableTaskId(currentTask.id); // Entrar en modo edición
    }
  };

  return (
    <>
      <button className="edit-check-button" onClick={handleButtonClick}>
        <img
          src={isEditing ? iconCheck : iconEdit}
          alt={isEditing ? "Confirmar edición" : "Editar"}
          className="edit-check-icon"
        />
      </button>
    </>
  );
}

export default EditButton;
