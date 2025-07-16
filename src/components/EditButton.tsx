import { useState } from "react";
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
};

function EditButton({ currentTask }: EditButtonProps) {
  const { setEditableTaskId, editableTaskId } = useApp();
  const isEditing = editableTaskId === currentTask.id;

  const handleButtonClick = () => {
    if (isEditing) {
      setEditableTaskId(""); // Confirmar edición, salir del modo edición
      // Aquí podrías añadir lógica para guardar el texto editado
    } else {
      setEditableTaskId(currentTask.id); // Entrar en modo edición
    }
    console.log("Editar tarea:", currentTask);
    console.log(editableTaskId);
  };

  //   const handleConfirmClick = () => {
  //     setEditableTaskId(""); // salir del modo edición global
  //     setIsEditing(false); // salir del modo edición local
  //     console.log("Tarea confirmada:", currentTask);
  //     // Aquí podrías guardar los cambios si los editaste en otro componente
  //   };

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
