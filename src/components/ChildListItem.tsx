import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import { Child } from "types";
import { fetchHelper } from "utils/apiHelpers";

type Props = {
  child: Child;
  getChildrenDataKey: string;
};

export const ChildListItem: FC<Props> = (props) => {
  const { child, getChildrenDataKey } = props;

  const queryClient = useQueryClient();
  const picupTime = "19:00";

  const mutationfunc = async () =>
    await fetchHelper(
      `https://app.famly.co/api/v2/children/${child.childId}/checkout?accessToken=${process.env.REACT_APP_ACCESS_TOKEN}`,
      "POST"
    );

  const checkOutChild = useMutation(mutationfunc, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([getChildrenDataKey]);
    },
  });

  const mutationfuncCheckIn = async () =>
    await fetchHelper(
      `https://app.famly.co/api/v2/children/${child.childId}
      /checkins?accessToken=${process.env.REACT_APP_ACCESS_TOKEN}&pickupTime=${picupTime}`,
      "POST"
    );

  const checkInChild = useMutation(mutationfuncCheckIn, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([getChildrenDataKey]);
    },

  });

  const selectedMutation = child.checkedIn ? checkOutChild : checkInChild;

  const handleClick = () => {
    selectedMutation.mutate();
  };

  return (
    <TableRow>
      <TableCell>
        <img
          style={{ width: "40px", height: "40px" }}
          src={child.image.small}
          alt=""
        />
      </TableCell>

      <TableCell>
        <Name $checkdIn={child.checkedIn}>{child.name.fullName}</Name>
      </TableCell>

      <TableCell>
        {!selectedMutation.isLoading &&
          (child.checkedIn ? (
            <Button color="error" onClick={handleClick}>
              Check out
            </Button>
          ) : (
            <Button variant="contained" color="success" onClick={handleClick}>
              Check in
            </Button>
          ))}

        {selectedMutation.isLoading && <span>loading</span>}
      </TableCell>
    </TableRow>
  );
};

const Name = styled(Typography)<{ $checkdIn: boolean }>`
  color: ${({ $checkdIn }) => ($checkdIn ? "unset" : "#504e4e8f")};
`;
