import Swal from 'sweetalert2';
import axios from "axios";
import store from '../store';
import { getUsersDetailsAction } from '../store/admin/adminReducer';

const deleteUser = async (userId: string, userName: string, ) => {
  showConfirmationDialog(userId, userName);
};

const handleConfirmDelete = async (userId: string, userName: string) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/admin/user/${userId}`, {
      withCredentials: true
    });

    const { status, data } = response;
    if (status === 200) {
      showSuccessAlert(data.message);
    } else {
      showErrorAlert(data.message);
    }
  } catch (error) {
    showErrorAlert(`An error occurred while deleting the user ${userName}.`);
  }
};

const showSuccessAlert = (message: string) => {
  Swal.fire({
    title: 'Deleted!',
    text: message,
    icon: 'success',
    timer: 1500,
    timerProgressBar: true,
    showConfirmButton: false
  }).then(() => {
    store.dispatch(getUsersDetailsAction())
  });
};

const showErrorAlert = (message: string) => {
  Swal.fire({
    title: 'Error!',
    text: message,
    icon: 'error'
  });
};


const showConfirmationDialog = (userId: string, userName: string) => {
  Swal.fire({
    title: 'Confirm Deletion',
    text: `Are you sure you want to delete this user ${userName}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      handleConfirmDelete(userId, userName);
    }
  });
};

export { deleteUser };
