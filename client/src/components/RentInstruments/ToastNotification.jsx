const ToastNotification = ({ toast, onClose }) => (
    toast.show && (
      <div className="farmgear-toast">
        <strong>{toast.title}</strong>
        <p>{toast.message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    )
  );
  
  export default ToastNotification;
  