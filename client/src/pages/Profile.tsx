import DataStore from "@/hooks/DataStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
const Profile = () => {
  const { id } = useParams();
  const userdata = DataStore((state) => state.userdata);
  useEffect(() => {
    console.log(userdata);
  }, []);
  return (
    <div className="w-full h-[calc(100vh-50px)] flex justify-center ">
      Profile: {id}
    </div>
  );
};

export default Profile;
