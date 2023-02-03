import React from "react";
import "./index.css";

type PropsAlbums = {
  albums: {
    id: number;
    name: string;
    year: number;
  };
  onClick: Function;
  onDelete: Function;
};

type PropsSongs = {
  songs: {
    id: number;
    album_id: number;
    title: string;
    author: string;
  };
  onDelete: Function;
};

export const ListAlbums = (props: PropsAlbums) => {
  return (
    <div className="list">
      <div className={`list-content`} onClick={() => props.onClick()}>
        <h3>Album Name : {props.albums.name}</h3>
        <p>Year : {props.albums.year}</p>
      </div>
      <div className="list-actions">
        <button
          onClick={() => props.onDelete()}
          type="button"
          className="btn-delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export const ListSongs = (props: PropsSongs) => {
  return (
    <div className="list">
      <div className={`list-content`}>
        <h3>Song Title : {props.songs.title}</h3>
        <p>Author : {props.songs.author}</p>
      </div>
      <div className="list-actions">
        <button
          onClick={() => props.onDelete()}
          type="button"
          className="btn-delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
