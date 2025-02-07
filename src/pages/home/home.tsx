import { useAppSelector } from "@store/hooks";

export const Home = () => {
  const user = useAppSelector((state) => state.auth.user);
  if (!user) return;
  return (
    <div className="w-full h-full flex items-center justify-around">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-red-500">Easy Forms</h1>
        <h3>Welcome {user?.username}</h3>
        <p>{user?.email}</p>
      </div>
    </div>
  );
};
