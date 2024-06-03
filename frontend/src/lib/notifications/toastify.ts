import Toastify from 'toastify-js';

const toastify = (message: string, type: string) => {
  Toastify({
    text: message,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: 'top',
    position: 'center',
    backgroundColor: type === 'success' ? '#4CAF50' : '#F44336',
  }).showToast();
};

export default toastify;
