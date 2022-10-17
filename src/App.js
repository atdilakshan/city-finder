import { useEffect, useState } from "react";
import axios from "./axios";

import "./App.css";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/user/senzmate/city")
      .then((res) => {
        console.log(res.data.content);
        setData(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const arr = data.map((data, index) => {
    return (
      <tr className="content" key={index}>
        <td>{index + 1}</td>
        <td>{data.cityId}</td>
        <td>{data.name}</td>
        <td>{data.coordinate.lat}</td>
        <td>{data.coordinate.lng}</td>
        <td>
          <button
            onClick={(e) => {
              e.preventDefault();
              axios
                .delete(`/user/senzmate/city/name/${data.name}`)
                .then((res) => {
                  window.alert("City Successfully Deleted!");
                  window.location.reload(false);
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <table>
        <tr className="title">
          <td>Number</td>
          <td>City Id</td>
          <td>City</td>
          <td>Coordinates (Lat)</td>
          <td>Coordinates (Lng)</td>
          <td>Action</td>
        </tr>
        {arr}
      </table>
    </>
  );
};

export default App;
