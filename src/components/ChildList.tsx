import { FC, useEffect, useState } from "react";
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

  const itemsPerPage = 10;
  const getChildrenDataKey = `https://app.famly.co/api/daycare/tablet/group?accessToken=${process.env.REACT_APP_ACCESS_TOKEN}&groupId=${groupId}&institutionId=${institutionId}`;

  const { data, isLoading, error } =
    useQuery<GetChildrenData>(getChildrenDataKey);

  const [selectedPage, setSelectedPage] = useState(0);
  const [buttons, setButtons] = useState<number[]>([]);

  useEffect(() => {
    if (data) {
      const pageCount = Math.ceil(data.children.length / itemsPerPage);
      console.log("pageCount", pageCount)
      let buttonsH = [];

      for (let i = 0; i < pageCount; i++) {
        buttonsH.push(i );
      }

      console.log("buttons", buttonsH);
      setButtons(buttonsH);
    }
  }, [data]);

  const startIndex = selectedPage === 0 ? 0 : selectedPage * itemsPerPage;
  const endIndex =
    selectedPage === 0 ? itemsPerPage : startIndex + itemsPerPage;

  const pageitems = data?.children.slice(startIndex, endIndex);
  console.log("pageitems", pageitems);

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <div>
      <div>
        {buttons.map((button) => (
          <button onClick={() => setSelectedPage(button)}>{button}</button>
        ))}
      </div>
      <div style={{ display: "flex" }}>
        <ul>
          {data?.children?.map((child) => (
            <ChildListItem
              key={child.childId}
              child={child}
              getChildrenDataKey={getChildrenDataKey}
            />
          ))}
        </ul>

        <ul>
          {pageitems?.map((child) => (
            <ChildListItem
              key={child.childId}
              child={child}
              getChildrenDataKey={getChildrenDataKey}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
