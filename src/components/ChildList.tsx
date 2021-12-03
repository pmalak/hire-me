import {
  Box,
  Button,
  ButtonGroup,
  Pagination,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { GetChildrenData } from "types";
import { ChildListItem } from "./ChildListItem";
import styled from "styled-components";
import { getUrl } from "utils/apiHelpers";

type Props = {
  institutionId: string;
  groupId: string;
};

export const ChildList: FC<Props> = (props) => {
  const { institutionId, groupId } = props;
  const initialItemsPerPage = 5;

  const getChildrenDataKey = getUrl(
    `/daycare/tablet/group?groupId=${groupId}&institutionId=${institutionId}`
  );

  const { data, isLoading, error } =
    useQuery<GetChildrenData>(getChildrenDataKey);

  const itemsPerPageOptions = [5, 10, 20, 50];

  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [pageCount, setPageCount] = useState<number>(0);

  useEffect(() => {
    setSelectedPage(1);
  }, [itemsPerPage]);

  useEffect(() => {
    if (data) {
      setPageCount(Math.ceil(data.children.length / itemsPerPage));
    }
  }, [data, itemsPerPage]);

  const startIndex = (selectedPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    setSelectedPage(page);
  };

  const pageItems = data?.children.slice(startIndex, endIndex);

  if (isLoading) {
    const arrayToMap = new Array(initialItemsPerPage);
    return (
      <Container>
        <Typography variant="h4">Children</Typography>
        <Box width={"100%"}>
          {arrayToMap.map((item) => (
            <Skeleton key={item} animation="wave" height={77} />
          ))}
        </Box>
      </Container>
    );
  }

  if (error) {
    return <div>something went wrong please try reloading the page</div>;
  }

  return (
    <Container>
      <Typography variant="h4">Children</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {pageItems?.map((child) => (
              <ChildListItem
                key={child.childId}
                child={child}
                getChildrenDataKey={getChildrenDataKey}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={pageCount}
        page={selectedPage}
        onChange={handleChange}
      />

      <div>
        <span>show </span>
        <ButtonGroup variant="outlined" aria-label="text button group">
          {itemsPerPageOptions.map((option) => (
            <Button
              variant={option === itemsPerPage ? "contained" : "outlined"}
              size="small"
              key={option}
              onClick={() => setItemsPerPage(option)}
            >
              {option}
            </Button>
          ))}
        </ButtonGroup>
        <span> per page</span>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 24px 16px;
  display: grid;
  grid-row-gap: 16px;
  justify-items: center;
`;
