import { Action } from "@remix-run/router";
import React, { useRef } from "react";
import "./index.css";

type PropsAlbums = {
  onSubmit: Function;
  action: string;
  name: string;
  year: string;
};

type PropsSongs = {
  onSubmit: Function;
  action: string;
  title: string;
  author: string;
};

export const FormAlbums = (props: PropsAlbums) => {
  const name = useRef<HTMLInputElement>(null);
  const year = useRef<HTMLInputElement>(null);
  const clearInput = () => {
    if (name.current && year.current) {
      name.current.value = "";
      year.current.value = "";
    }
  };

  return (
    <div className="form-todo">
      <form
        action="submit"
        onSubmit={(event: any) => {
          props.onSubmit(event, {
            name: name.current?.value,
            year: year.current?.value,
          });
          clearInput();
        }}
      >
        <div className="input-group">
          <label htmlFor="">Name</label>
          <input
            type="text"
            name="name"
            ref={name}
            placeholder={props.name || ""}
          />
        </div>
        <div className="input-group">
          <label htmlFor="">Year</label>
          <input
            type="number"
            name="year"
            ref={year}
            placeholder={props.year || ""}
          />
        </div>
        <div className="input-group">
          <label htmlFor="">&nbsp;</label>
          <button type="submit" className="btn-submit">
            {props.action}
          </button>
        </div>
      </form>
    </div>
  );
};

export const FormSongs = (props: PropsSongs) => {
  const title = useRef<HTMLInputElement>(null);
  const author = useRef<HTMLInputElement>(null);
  const clearInput = () => {
    if (title.current && author.current) {
      title.current.value = "";
      author.current.value = "";
    }
  };

  return (
    <div className="form-todo">
      <form
        action="submit"
        onSubmit={(event: any) => {
          props.onSubmit(event, {
            title: title.current?.value,
            author: author.current?.value,
          });
          clearInput();
        }}
      >
        <div className="input-group">
          <label htmlFor="">Title</label>
          <input type="text" name="title" ref={title} placeholder={props.title || ""}/>
        </div>
        <div className="input-group">
          <label htmlFor="">Author</label>
          <input type="text" name="author" ref={author} placeholder={props.author || ""}/>
        </div>
        <div className="input-group">
          <label htmlFor="">&nbsp;</label>
          <button type="submit" className="btn-submit">
            {props.action}
          </button>
        </div>
      </form>
    </div>
  );
};
