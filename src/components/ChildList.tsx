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

  const getChildrenDataKey = `https://app.famly.co/api/daycare/tablet/group?accessToken=${process.env.REACT_APP_ACCESS_TOKEN}&groupId=${groupId}&institutionId=${institutionId}`;

  const { data, isLoading, error } =
    useQuery<GetChildrenData>(getChildrenDataKey);

  const itemsPerPageOptions = [5, 10, 20, 50];

  const [selectedPage, setSelectedPage] = useState(0);
  const [buttons, setButtons] = useState<number[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    if (data) {
      const pageCount = Math.ceil(data.children.length / itemsPerPage);
      let buttonsH = [];

      for (let i = 0; i < pageCount; i++) {
        buttonsH.push(i + 1);
      }

      setButtons(buttonsH);
    }
  }, [data, itemsPerPage]);

  const startIndex = selectedPage === 0 ? 0 : selectedPage * itemsPerPage;
  const endIndex =
    selectedPage === 0 ? itemsPerPage : startIndex + itemsPerPage;

  const pageitems = data?.children.slice(startIndex, endIndex);

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <div>
      <div>
        <span>itemsPerPageOptions</span>
        <span>
          {itemsPerPageOptions.map((button) => (
            <button key={button} onClick={() => setItemsPerPage(button)}>
              {button}
            </button>
          ))}
        </span>
      </div>


      <div>
        <span>page</span>
        <span>
          {buttons.map((button) => (
            <button key={button} onClick={() => setSelectedPage(button - 1)}>
              {button}
            </button>
          ))}
        </span>
      </div>

      <div style={{ display: "flex" }}>
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
