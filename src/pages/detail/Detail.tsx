import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./detail.css";
import Axios from "axios";
import { ListSongs } from "../../components/list";
import { FormSongs } from "../../components/form";

type AlbumsDetail = {
  id: number;
  name: string;
  year: number;
};

type ListProps = {
  id: number;
  album_id: number;
  title: string;
  author: string;
};

type AlbumID = {
  albumId: any;
};

const Main = () => {
  const { albumId } = useParams<AlbumID>();

  const [detail, setDetail] = useState({} as AlbumsDetail);

  const [lists, setLists] = useState([] as ListProps[]);

  const baseUrl = "http://localhost:5000";

  const getDetails = async (id: number) => {
    try {
      const response = await Axios.get(`${baseUrl}/albums/${id}`);
      setDetail(response.data);
    } catch (e) {
      alert(e);
    }
  };

  const getLists = async () => {
    try {
      const response = await Axios.get(`${baseUrl}/songs`, {
        params: { album_id: albumId },
      });
      setLists(response.data);
    } catch (e) {
      alert(e);
    }
  };

  const deleteList = async (id: number) => {
    try {
      await Axios.delete(`${baseUrl}/songs/${id}`);
      getLists();
    } catch (e) {
      alert(e);
    }
  };

  const fetchData = useRef(true);
  useEffect(() => {
    if (fetchData.current) {
      getDetails(albumId);
      getLists();
      fetchData.current = false;
    }
  }, []);

  const onDelete = (id: number) => {
    deleteList(id);
  };

  const addList = async (payload: object) => {
    try {
      await Axios.post(`${baseUrl}/songs`, payload);
      getLists();
    } catch (e) {
      alert(e);
    }
  };

  const onSubmit = (
    event: any,
    data: { title: string; author: string }
  ) => {
    event.preventDefault();
    if (data.title !== "" && data.author !== "") {
      const payload = {
        album_id: parseInt(albumId),
        title: data.title,
        author: data.author,
      };
      addList(payload);
    } else {
      alert("Please Check Your Input Data");
    }
  };

  const onBack = () => {
    window.location.href = "http://localhost:3000/";
  };

  return (
    <div className="main">
      <div className="header">
        <button onClick={onBack} className="btn-submit">
          Back
        </button>
        <h1>
          {detail.name} ({detail.year})
        </h1>
      </div>

      <FormSongs
        onSubmit={(
          event: any,
          data: { title: string; author: string }
        ) => onSubmit(event, data)}
      />

      <br />

      {lists.length > 0 ? (
        <div>
          {lists
            .sort((a, b) => b.id - a.id)
            .map((list: ListProps) => (
              <ListSongs
                songs={list}
                key={list.id}
                onDelete={() => onDelete(list.id)}
              />
            ))}
        </div>
      ) : (
        <div>Nothing Todo</div>
      )}
    </div>
  );
};

export default Main;
