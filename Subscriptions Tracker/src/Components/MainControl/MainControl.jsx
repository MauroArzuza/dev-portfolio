import { useState } from "react";
import FormAddSubs from "../AddSubs/FormAddSubs";
import Balance from "../Balance/Balance";
import DisplayItems from "../DisplayItems/DisplayItems";

const MainControl = ({ count }) => {
  const [subs, setSubs] = useState([]);
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState("");
  const [spent, setSpent] = useState(0);

  const deleteItem = (id) => {
    const newList = subs.filter((item) => item.id != id);
    setSubs(newList);
  };

  const editItem = (id) => {
    setEditId(id);
    subs.map((item) => {
      if (item.id === id) {
        setType(item.type);
        setPrice(item.price);
      }
    });
  };

  return (
    <>
      <div className="main-form">
        <Balance count={count} subs={subs} spent={spent} setSpent={setSpent} />
        <FormAddSubs
          type={type}
          setType={setType}
          price={price}
          setPrice={setPrice}
          subs={subs}
          setSubs={setSubs}
          editId={editId}
          setEditId={setEditId}
          spent={spent}
          count={count}
        />
      </div>
      <DisplayItems subs={subs} deleteItem={deleteItem} editItem={editItem} />
    </>
  );
};

export default MainControl;
