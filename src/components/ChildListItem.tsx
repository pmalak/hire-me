import { LinearProgress } from "@mui/material";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useCustomMutation } from "hooks/useCustomMutation";
import { FC } from "react";
import { UseMutationOptions, useQueryClient } from "react-query";
import styled from "styled-components";
import { Child } from "types";
import { getUrl } from "utils/apiHelpers";

type Props = {
  child: Child;
  getChildrenDataKey: string;
};

export const ChildListItem: FC<Props> = (props) => {
  const { child, getChildrenDataKey } = props;

  const queryClient = useQueryClient();

  const picupTime = "24:00";
  const mutationBaseUrl = `/v2/children/${child.childId}`;
  const mutationBaseOptions: UseMutationOptions = {
    onSuccess: (data) => {
      queryClient.invalidateQueries([getChildrenDataKey]);
    },
  };

  const checkOutChild = useCustomMutation(
    getUrl(`${mutationBaseUrl}/checkout`),
    mutationBaseOptions
  );

  const checkInChild = useCustomMutation(
    getUrl(`${mutationBaseUrl}/checkins?pickupTime=${picupTime}`),
    mutationBaseOptions
  );

  const selectedMutation = child.checkedIn ? checkOutChild : checkInChild;

  const handleClick = () => {
    selectedMutation.mutate();
  };

  return (
    <StyledTableRow>
      <TableCell>
        <StyledImage src={child.image.small} alt="" />
      </TableCell>

      <TableCell>
        <Name $checkdIn={child.checkedIn}>{child.name.fullName}</Name>
      </TableCell>

      <TableCell>
        {child.checkedIn ? (
          <Button color="error" onClick={handleClick} size="small">
            Check out
          </Button>
        ) : (
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={handleClick}
          >
            Check in
          </Button>
        )}
      </TableCell>

      {selectedMutation.isLoading && <StyledLinearProgress />}
    </StyledTableRow>
  );
};

const Name = styled(Typography)<{ $checkdIn: boolean }>`
  color: ${({ $checkdIn }) => ($checkdIn ? "unset" : "#504e4e8f")};
`;

const StyledImage = styled.img`
  width: 40px;
  height: 40px;
`;

const StyledTableRow = styled(TableRow)`
  position: relative;
`;
const StyledLinearProgress = styled(LinearProgress)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;
