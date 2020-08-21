import React from "react";
import PropTypes from "prop-types";
import Title from "./Title";
import Horizontal from "./Horizontal";

export const List = ({ isTv = false, title, props }) => (
  <>
    <Title title={title} />
    {props.map((prop) => (
      <Horizontal
        isTv={isTv}
        key={prop.id}
        id={prop.id}
        poster={prop.poster_path}
        title={prop.original_title || prop.name}
        overview={prop.overview}
        releaseDate={prop.release_date}
      />
    ))}
  </>
);

List.propTypes = {
  title: PropTypes.string.isRequired,
  props: PropTypes.array.isRequired,
};

export default List;
