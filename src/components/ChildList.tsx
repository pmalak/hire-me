import { FC } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Child, GetChildrenData } from "types";
import { fetchHelper } from "utils/apiHelpers";
import { ChildListItem } from "./ChildListItem";

type Props = {
  institutionId: string;
  groupId: string;
};

export const ChildList: FC<Props> = (props) => {
  const { institutionId, groupId } = props;

  const getChildrenDataKey = `https://app.famly.co/api/daycare/tablet/group?accessToken=${process.env.REACT_APP_ACCESS_TOKEN}&groupId=${groupId}&institutionId=${institutionId}`;

  const { data, isLoading, error } =
    useQuery<GetChildrenData>(getChildrenDataKey);

  console.log("data", data);

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <ul>
      {data?.children.map((child) => (
        <ChildListItem
          key={child.childId}
          child={child}
          getChildrenDataKey={getChildrenDataKey}
        />
      ))}
    </ul>
  );
};
