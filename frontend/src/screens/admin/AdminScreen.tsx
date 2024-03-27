import { useEffect } from "react"
import AdminHeader from "../../components/adminHeader"
import { useDispatch, useSelector } from "react-redux"
import { adminStateType, getUsersDetailsAction } from "../../store/admin/adminReducer";
import { MDBDataTable } from 'mdbreact';


const AdminScreen = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: { admin: adminStateType }) => state.admin.users);


  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getUsersDetailsAction());
    };

    fetchData();
  }, []);
  const columns = [
    {
      label: 'Image',
      field: 'image',
      width: 50,
      attributes: {
        'aria-controls': 'DataTable',
        'aria-label': 'Image',
      },
    },
    {
      label: 'Name',
      field: 'name',
      width: 150,
      attributes: {
        'aria-controls': 'DataTable',
        'aria-label': 'Name',
      },
    },
    {
      label: 'Email',
      field: 'email',
      width: 200,
      attributes: {
        'aria-controls': 'DataTable',
        'aria-label': 'Email',
      },
    },
    {
      label: 'Edit',
      field: 'edit',
      width: 50,
      attributes: {
        'aria-controls': 'DataTable',
        'aria-label': 'Edit',
      },
    },
    {
      label: 'Delete',
      field: 'delete',
      width: 50,
      attributes: {
        'aria-controls': 'DataTable',
        'aria-label': 'Delete',
      },
    },
  ];

  const rows = users.map(user => ({
    image: user.image ? <img src={user.image} alt={user.name} style={{ width: '50px', height: '50px' }} /> : '',
    name: user.name,
    email: user.email,
    edit: (
      <>
        <button className="btn btn-info">
          <img src="/edit.png" alt="" style={{ marginLeft: '5px', verticalAlign: 'middle' }} />
        </button>
      </>
    ),
    delete:  (
      <>
        <button className="btn btn-danger">
          <img src="/dlt.png" alt="" style={{ marginLeft: '5px', verticalAlign: 'middle' }} />
        </button>
      </>
    ),
  }));


  return (
    <>
      <AdminHeader />
      <div className="container mt-5">
        <MDBDataTable
          responsive
          bordered
          hover
          data={{ columns, rows }}
          searching={true}
        />
      </div>
    </>
  );
}
export default AdminScreen