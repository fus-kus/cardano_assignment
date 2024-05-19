import React from "react";

export function ifElse(
  condition: boolean,
  trueRenderFunction: () => React.ReactNode,
  falseRenderFunction: () => React.ReactNode
): React.ReactNode {
  if (condition) {
    return trueRenderFunction();
  } else {
    return falseRenderFunction();
  }
}
export function ifOrEmpty(
  condition: boolean,
  renderFunction: () => React.ReactNode
): React.ReactNode {
  return ifElse(condition, renderFunction, () => (
    <React.Fragment></React.Fragment>
  ));
}
