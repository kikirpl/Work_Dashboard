import { useLogin } from "../hooks/useLogin";

const ProfilePage = () => {
  const username = useLogin();
  return (
    <div>
      <h1>Profile Page</h1>
      Username: {username}
    </div>
  );
};
export default ProfilePage;
