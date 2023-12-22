import { useSession } from "next-auth/react";
const profiles = () => {
  const { data, status } = useSession();
  return (
    <div>
      <p className="text-white">Profiles</p>
    </div>
  );
};

export default profiles;
