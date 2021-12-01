import { FC } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Child, GetChildrenData } from "types";
import { fetchHelper } from "utils/apiHelpers";

type Props = {};

export const ChildList: FC<Props> = (props) => {
  const {} = props;
  const queryClient = useQueryClient();

  const groupId = "86413ecf-01a1-44da-ba73-1aeda212a196";
  const institutionId = "dc4bd858-9e9c-4df7-9386-0d91e42280eb";

  const getChildrenDataKey = `https://app.famly.co/api/daycare/tablet/group?accessToken=${process.env.REACT_APP_ACCESS_TOKEN}&groupId=${groupId}&institutionId=${institutionId}`;

  const { data, isLoading, error } =
    useQuery<GetChildrenData>(getChildrenDataKey);

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

  console.log("data", data);

  const handleClick = (child: Child ) => {
    console.log("child.checkedIn", child.checkedIn)
    const selectedMutation = child.checkedIn ? checkoutChild : checkInChild

    selectedMutation.mutate(child.childId)
  }

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <ul>
      {data?.children.map((child) => (
        <li key={child.childId}>
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
          </div>
        </li>
      ))}
    </ul>
  );
};
