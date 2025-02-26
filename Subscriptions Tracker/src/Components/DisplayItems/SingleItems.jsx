import { moneyFormat } from "../../helpers";
const SingleItems = ({ price, type, id, deleteItem, editItem }) => {
  const urlImage = `/src/images/${type}.png`;

  const handleDelete = (e) => {
    e.preventDefault();
    const answer = window.confirm(
      `¿Estás seguro de que quieres borrar tu suscripcion a ${type}?`
    );
    if (answer) {
      deleteItem(id);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    editItem(id);
  };

  return (
    <div className="single-item">
      <img src={urlImage} alt="Services" />
      <h3>Precio: {moneyFormat(Number(price))}</h3>
      <a href="" className="delete" onClick={handleDelete}>
        Borrar
      </a>
      <a href="" className="edit" onClick={handleEdit}>
        Editar
      </a>
    </div>
  );
};

export default SingleItems;
