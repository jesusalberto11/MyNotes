import { forwardRef, useImperativeHandle, useRef } from "react";

const ConfirmDialog = forwardRef(
  (props: { title?: string; action: Function }, ref) => {
    const confirmDialogRef = useRef<HTMLDialogElement | null>(null);

    useImperativeHandle(ref, () => ({
      openDialog,
    }));

    const openDialog = () => confirmDialogRef.current?.showModal();

    const doAction = async () => {
      await props.action().then(() => {
        confirmDialogRef.current?.close();
      });
    };

    return (
      <dialog ref={confirmDialogRef} className="simple-dialog">
        <div className="w-full flex column centered" style={{ gap: "10px" }}>
          <p>
            {props.title
              ? props.title
              : "¿Realmente deseas eliminar este elemento?"}
          </p>
          <div className="flex centered" style={{ gap: "20px" }}>
            <button
              className="confirm-dialog-button"
              onClick={() => doAction()}
            >
              Sí, eliminar
            </button>
            <button
              className="confirm-dialog-button"
              onClick={() => confirmDialogRef.current?.close()}
            >
              No
            </button>
          </div>
        </div>
      </dialog>
    );
  }
);

export default ConfirmDialog;
