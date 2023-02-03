import React, { useEffect, useRef, useState } from "react";
import "./main.css";
import Axios from "axios";
import { ListAlbums } from "../../components/list";
import { FormAlbums } from "../../components/form";

type ListProps = {
  id: number,
  name: string,
  year: number
};

const Main = () => {
  const [lists, setLists] = useState([] as ListProps[]);

  const baseUrl = "http://localhost:5000";

  const getLists = async () => {
    try {
      const response = await Axios.get(`${baseUrl}/albums`);
      setLists(response.data);
    } catch (e) {
      alert(e);
    }
  };

  const deleteList = async (id: number) => {
    try {
      await Axios.delete(`${baseUrl}/albums/${id}`);
      getLists();
    } catch (e) {
      alert(e);
    }
  };

  const fetchData = useRef(true);
  useEffect(() => {
    if (fetchData.current) {
      getLists();
      fetchData.current = false;
    }
  }, []);

  const onDelete = (id: number) => {
    deleteList(id);
  };

  const addList = async (payload: object) => {
    try {
      await Axios.post(`${baseUrl}/albums`, payload);
      getLists();
    } catch (e) {
      alert(e);
    }
  };

  const onSubmit = (event: any, data: { name: string; year: number }) => {
    event.preventDefault();
    if (data.name !== "" && data.year > 0) {
      const payload = {
        name: data.name,
        year: data.year,
      };
      addList(payload);
    } else {
      alert("Please Check Your Input Data");
    }
  };

  const redirectDetail = (id: number) => {
    window.location.href = "http://localhost:3000/detail/" + id;
  };

  const redirectUpdate = (id: number) => {
    window.location.href = "http://localhost:3000/update/albums/" + id;
  };

  return (
    <div className="main">
      <h1>My Albums</h1>

      <FormAlbums
        onSubmit={(event: any, data: { name: string; year: number }) =>
          onSubmit(event, data)
        }
        action="Add Album"
        name=""
        year=""
      />

      <br />

      {lists.length > 0 ? (
        <div>
          {lists
            .sort((a, b) => b.id - a.id)
            .map((list: ListProps) => (
              <ListAlbums
                albums={list}
                key={list.id}
                onClick={() => redirectDetail(list.id)}
                onEdit={() => redirectUpdate(list.id)}
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
