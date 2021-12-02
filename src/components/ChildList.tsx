import {
  Box,
  Grid,
  Pagination,
  PaginationItem,
  Paper,
  Table,
  TableContainer,
  TableHead,
  Typography,
} from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Child, GetChildrenData } from "types";
import { ChildListItem } from "./ChildListItem";
import styled from "styled-components";

type Props = {
  institutionId: string;
  groupId: string;
};

export const ChildList: FC<Props> = (props) => {
  const { institutionId, groupId } = props;
  const initialItemsPerPage = 10

  const getChildrenDataKey = `https://app.famly.co/api/daycare/tablet/group?accessToken=${process.env.REACT_APP_ACCESS_TOKEN}&groupId=${groupId}&institutionId=${institutionId}`;

  const { data, isLoading, error } =
    useQuery<GetChildrenData>(getChildrenDataKey);

  const itemsPerPageOptions = [5, 10, 20, 50];

  const [selectedPage, setSelectedPage] = useState(0);
  const [buttons, setButtons] = useState<number[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

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

  const handleChange = (event: ChangeEvent, value: number) => {
    setSelectedPage(value - 1);
  };

  const pageItems = data?.children.slice(startIndex, endIndex);

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <Container>
      <Typography variant="h4">Children</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead></TableHead>

          {pageItems?.map((child) => (
            <ChildListItem
              key={child.childId}
              child={child}
              getChildrenDataKey={getChildrenDataKey}
            />
          ))}
        </Table>
      </TableContainer>

      <Pagination
        count={buttons.length}
        page={selectedPage + 1}
        //@ts-ignore
        onChange={handleChange}
      />

      <div>
        <span>show </span>
        <span>
          {itemsPerPageOptions.map((button) => (
            <button key={button} onClick={() => setItemsPerPage(button)}>
              {button}
            </button>
          ))}
        </span>
        <span> per page</span>
      </div>
    </Container>
  );
};

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 24px 16px;
  display: grid;
  grid-row-gap: 16px;
  justify-items: center;
`;
