import React from "react";
import "./categorytitle.css";

const CategoryTitle = (props) => {
  return (
    <div className="categoryTitle">
      <span>{props.title}</span>
    </div>
  );
};

export default CategoryTitle;
