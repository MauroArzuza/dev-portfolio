import React from "react";

interface HeaderProps {
  onAddMovieClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddMovieClick }) => {
  const handleTitleClick = () => {
    window.location.reload();
  };
  return (
    <header className="header">
      <h1 className="title" onClick={handleTitleClick}>
        Movie Lord
      </h1>
      <button className="add-movie-button" onClick={onAddMovieClick}>
        <span className="material-symbols-outlined">add</span>Agregar Película
      </button>
    </header>
  );
};

export default Header;
