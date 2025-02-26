import SingleItems from "./SingleItems";

const DisplayItems = ({ subs, deleteItem, editItem }) => {
  return (
    <>
      <h2>Suscripciones:</h2>
      {subs.map((item) => (
        <SingleItems
          key={item.id}
          id={item.id}
          price={item.price}
          type={item.type}
          deleteItem={deleteItem}
          editItem={editItem}
        />
      ))}
    </>
  );
};

export default DisplayItems;
