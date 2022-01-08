import React from "react";
import BackgroundImage from "./BackgroundImage";
import "./Section.scss";

function Section(props) {
  const {
    bg,
    textColor,
    bgImage,
    bgImageOpacity,
    bgImageRepeat,
    className,
    children,
    ...otherProps
  } = props;

  return (
    <section
      className={
        "SectionComponent py-5 position-relative" +
        (props.bg ? ` bg-${props.bg}` : "") +
        (props.textColor ? ` text-${props.textColor}` : "") +
        (className ? ` ${className}` : "")
      }
      {...otherProps}
    >
      {bgImage && (
        <BackgroundImage
          image={bgImage}
          opacity={bgImageOpacity}
          repeat={bgImageRepeat}
        />
      )}

      <div
        className={
          "" +
          (["md", "lg"].includes(props.size) ? " py-md-5" : "") +
          (props.size === "lg" ? " my-md-5" : "")
        }
      >
        {props.children}
      </div>
    </section>
  );
}

export default Section;
