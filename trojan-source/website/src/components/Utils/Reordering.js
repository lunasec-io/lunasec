import React, { useState, useLayoutEffect, useEffect, useRef, forwardRef, createRef } from "react";

const usePrevious = value => {
  const prevChildrenRef = useRef();

  useEffect(() => {
    prevChildrenRef.current = value;
  }, [value]);

  return prevChildrenRef.current;
};

const calculateBoundingBoxes = children => {
  const boundingBoxes = {};

  React.Children.forEach(children, child => {
    const domNode = child.ref.current;
    const nodeBoundingBox = domNode.getBoundingClientRect();

    boundingBoxes[child.key] = nodeBoundingBox;
  });

  return boundingBoxes;
};

const BidiLine = ({ children }) => {
  const [boundingBox, setBoundingBox] = useState({});
  const [prevBoundingBox, setPrevBoundingBox] = useState({});
  const prevChildren = usePrevious(children);

  useLayoutEffect(() => {
    const newBoundingBox = calculateBoundingBoxes(children);
    setBoundingBox(newBoundingBox);
  }, [children]);

  useLayoutEffect(() => {
    const prevBoundingBox = calculateBoundingBoxes(prevChildren);
    setPrevBoundingBox(prevBoundingBox);
  }, [prevChildren]);

  useEffect(() => {
    const hasPrevBoundingBox = Object.keys(prevBoundingBox).length;

    if (hasPrevBoundingBox) {
      React.Children.forEach(children, child => {
        const domNode = child.ref.current;
        const firstBox = prevBoundingBox[child.key];
        const lastBox = boundingBox[child.key];
        const changeInX = firstBox.left - lastBox.left;

        if (changeInX) {
          requestAnimationFrame(() => {
            // Before the DOM paints, invert child to old position
            domNode.style.transform = `translateX(${changeInX}px)`;
            domNode.style.transition = "transform 0s";

            requestAnimationFrame(() => {
              // After the previous frame, remove
              // the transistion to play the animation
              domNode.style.transform = "";
              domNode.style.transition = "transform 500ms";
            });
          });
        }
      });
    }
  }, [boundingBox, prevBoundingBox, children]);

  return children;
};

const BidiGroup = forwardRef(({ text }, ref) => (
    <span ref={ref}>{text}</span>
));

const Isolate = (props) => {
  return <span>{props.children}</span>;
}

function Reordering(props) {
  const interval = props.interval ?? 3000;
  const [isolates, setIsolates] = useState((props.children ?? []).map((isolate, i) => ({
    text: isolate.props.children,
    target: isolate.props.target,
    id: i
  })));
  
  useEffect(() => {
    const timer = setTimeout(() => {
      let _isolates = [...isolates];
      _isolates.sort((a,b) => a.target - b.target)
      isolates.forEach((isolate, i) => {
        _isolates[isolate.target].target = i;
      });
      setIsolates(_isolates);
    }, interval);
    return () => clearTimeout(timer);
  }, [interval, isolates, setIsolates]);

  return (
    <div className="d-flex">
      <BidiLine>
        {isolates.map(({ text, id }) => (
          <BidiGroup text={text} key={id} id={id} ref={createRef()} />
        ))}
      </BidiLine>
    </div>
  );
}

export { Reordering, Isolate };