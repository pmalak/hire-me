import { FC } from "react";
import { useMutation, useQuery } from "react-query";
import { GetChildrenData } from "types";
import { fetchHelper } from "utils/apiHelpers";

type Props = {}

export const ChildList: FC<Props> = props => {
  const {} = props;

  const groupId = "86413ecf-01a1-44da-ba73-1aeda212a196"
  const institutionId = "dc4bd858-9e9c-4df7-9386-0d91e42280eb"

  const { data, isLoading, error } = useQuery<GetChildrenData>(
    `https://app.famly.co/api/daycare/tablet/group?accessToken=${process.env.REACT_APP_ACCESS_TOKEN}&groupId=${groupId}&institutionId=${institutionId}`
  );



  const mutationfunc = async () => await fetchHelper( "https://app.famly.co/api/v2/children/${childId}/checkout?accessToken=${process.env.REACT_APP_ACCESS_TOKEN}", "POST")

  const checkoutChild =  useMutation(mutationfunc)
  const childId = "3f12dcc7-d10d-4aef-902d-e7be4043b759"
  const picupTime = "16:00"
  

  // https://app.famly.co/api/v2/children/${childId}/checkins?accessToken=${process.env.REACT_APP_ACCESS_TOKEN}&pickupTime=${picupTime}

  console.log("data", data)

  if (isLoading) {
    return <div>loading</div>
  }

  return (

    <ul>
      {data?.children.map(child => <li>
        <div>
          <img
            style={{ width: "40px", height: "40px" }}
            src={child.image.small}
            alt=""
          /><span>  {child.name.fullName}</span> <span>{child.checkedIn ? "checkedIn" : " not checkedIn"}</span>
        </div>

      </li>)}
    </ul>
  );
};



