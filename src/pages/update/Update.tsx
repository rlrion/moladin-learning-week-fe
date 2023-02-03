import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./update.css";
import Axios from "axios";
import { ListSongs } from "../../components/list";
import { FormAlbums, FormSongs } from "../../components/form";

type AlbumsDetail = {
  id: number;
  name: string;
  year: string;
};

type SongsDetail = {
  id: number;
  album_id: number;
  title: string;
  author: string;
};

type ParamsUpdate = {
  type: any;
  id: any;
};

const Main = () => {
  const { type, id } = useParams<ParamsUpdate>();

  const [detail, setDetail] = useState({} as AlbumsDetail);
  const [detailExt, setDetailExt] = useState({} as SongsDetail);

  const baseUrl = "http://localhost:5000";

  const getDetails = async (id: number) => {
    try {
      const response = await Axios.get(`${baseUrl}/albums/${id}`);
      setDetail(response.data);
    } catch (e) {
      alert(e);
    }
  };
  const getDetailsExt = async (id: number) => {
    try {
      const response = await Axios.get(`${baseUrl}/songs/${id}`);
      setDetailExt(response.data);
    } catch (e) {
      alert(e);
    }
  };

  const fetchData = useRef(true);
  useEffect(() => {
    if (fetchData.current) {
      if (type === "albums") {
        getDetails(id);
      } else {
        getDetailsExt(id);
      }
      fetchData.current = false;
    }
  }, []);

  // const addList = async (payload: object) => {
  //   try {
  //     await Axios.post(`${baseUrl}/songs`, payload);
  //     getLists();
  //   } catch (e) {
  //     alert(e);
  //   }
  // };

  // const onSubmit = (
  // event: any,
  // data: { title: string; author: string }
  // ) => {
  //   event.preventDefault();
  //   if (data.title !== "" && data.author !== "") {
  //     const payload = {
  //       album_id: parseInt(albumId),
  //       title: data.title,
  //       author: data.author,
  //     };
  //     addList(payload);
  //   } else {
  //     alert("Please Check Your Input Data");
  //   }
  // };

  const onCompleteAlbums = (
    event: any,
    data: { name: string; year: number },
    id: number
  ) => {
    event.preventDefault();
    const payload = {
      ...data,
      name: data.name,
      year: data.year,
    };
    completedList(payload, type, id);
  };

  const onCompleteSongs = (
    event: any,
    data: { title: string; author: string },
    id: number
  ) => {
    event.preventDefault();
    const payload = {
      ...data,
      album_id: detailExt.album_id,
      title: data.title,
      author: data.author,
    };
    completedList(payload, type, id);
  };

  const completedList = async (data: object, type: string, id: number) => {
    try {
      await Axios.put(`${baseUrl}/${type}/${id}`, data);
      window.location.href = "http://localhost:3000/";
    } catch (error) {
      console.log("failed data");
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
        <h1>Update {type.charAt(0).toUpperCase() + type.slice(1)}</h1>
      </div>

      {type === "albums" ? (
        <FormAlbums
          onSubmit={(event: any, data: { name: string; year: number }) =>
            onCompleteAlbums(event, data, id)
          }
          action="Save Album"
          name={detail.name}
          year={detail.year}
        />
      ) : (
        <FormSongs
          onSubmit={(event: any, data: { title: string; author: string }) =>
            onCompleteSongs(event, data, id)
          }
          action="Save Song"
          title={detailExt.title}
          author={detailExt.author}
        />
      )}
    </div>
  );
};

export default Main;
