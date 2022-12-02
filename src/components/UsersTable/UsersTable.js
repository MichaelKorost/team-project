import "./UsersTable.css";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const UsersTable = () => {
  const [data, setData] = useState([]); //the rows being rendered to table

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({
            id: doc.id,
            photoURL: doc.data().photoURL,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            email: doc.data().email,
            age: doc.data().dob,
            bloodType: doc.data().bloodType,
          });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 240,
      renderCell: (params) => {
        return (
          <div className="cellWidthImg">
            <img
              src={
                params.row?.photoURL ||
                "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="pfp"
            />
            {`${params.row?.firstName || "Missing"} ${
              params.row?.lastName || "name"
            }`}
          </div>
        );
      },
    },

    { field: "email", headerName: "Email", width: 150 },

    {
      field: "age",
      headerName: "Date of birth",
      type: "string",
      width: 160,
    },
    {
      field: "bloodType",
      headerName: "BloodType",
      sortable: true,
      width: 100,
      type: "string",
    },
  ];

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </>
  );
};

export default UsersTable;
