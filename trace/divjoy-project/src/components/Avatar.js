import React from "react";
import Image from "react-bootstrap/Image";

function Avatar(props) {
  const { size, ...otherProps } = props;

  return (
    <Image
      {...otherProps}
      roundedCircle={true}
      style={{
        width: size,
        height: size,
      }}
    />
  );
}

export default Avatar;
