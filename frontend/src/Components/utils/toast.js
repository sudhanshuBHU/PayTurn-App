import { toast } from "react-toastify";

export const handleSuccess = (message) => {
    toast.success(message,{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        // pauseOnHover: true,
        // draggable: true,
        progress: undefined,
    });
};

export const handleError = (message) => {
    toast.error(message,{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        // pauseOnHover: true,
        // draggable: true,
        progress: undefined,
    });
};

export const handleWarning = (message) => {
    toast.warn(message,{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        // pauseOnHover: true,
        // draggable: true,
        progress: undefined,
    });
};