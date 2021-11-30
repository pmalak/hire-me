import  React, { FC } from "react";

type Props = {
  child?: string
}

export const Item: FC<Props> = props => {
  const { child} = props;

  return (
    <div>
      item
    </div>
  );
};



