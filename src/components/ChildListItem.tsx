import { FC } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Child } from "types";
import { fetchHelper } from "utils/apiHelpers";

type Props = {
  child: Child;
  getChildrenDataKey: string;
};

export const ChildListItem: FC<Props> = (props) => {
  const { child, getChildrenDataKey } = props;

  const queryClient = useQueryClient();
  const picupTime = "16:00";

  const mutationfunc = async (childId: string) =>
    await fetchHelper(
      `https://app.famly.co/api/v2/children/${childId}/checkout?accessToken=${process.env.REACT_APP_ACCESS_TOKEN}`,
      "POST"
    );

  const checkoutChild = useMutation(mutationfunc, {
    onSuccess: (data) => {
      console.log("res", data);
      queryClient.invalidateQueries([getChildrenDataKey]);
    },
  });

  const mutationfuncCheckIn = async (id: string) =>
    await fetchHelper(
      `https://app.famly.co/api/v2/children/${id}
      /checkins?accessToken=${process.env.REACT_APP_ACCESS_TOKEN}&pickupTime=${picupTime}`,
      "POST"
    );

  const checkInChild = useMutation(mutationfuncCheckIn, {
    onSuccess: (data) => {
      console.log("res", data);
      queryClient.invalidateQueries([getChildrenDataKey]);
    },
  });

  const selectedMutation = child.checkedIn ? checkoutChild : checkInChild;

  const handleClick = (child: Child) => {
    selectedMutation.mutate(child.childId);
  };

  return (
    <li>
      <div onClick={() => handleClick(child)}>
        <img
          style={{ width: "40px", height: "40px" }}
          src={child.image.small}
          alt=""
        />
        <span> {child.name.fullName}</span>{" "}
        {child.checkedIn ? (
          <span style={{ color: "green" }}>checkedIn</span>
        ) : (
          <span style={{ color: "red" }}> not checkedIn</span>
        )}
        {selectedMutation.isLoading && <span>loading</span>}
      </div>
    </li>
  );
};
