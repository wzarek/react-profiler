import { useGetEvents } from "../api/useGetEvents";

const MainLayout = () => {
  const { data, isLoading, isError } = useGetEvents();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      {data?.map((e) => (
        <p>{e.title}</p>
      ))}
    </div>
  );
};

export default MainLayout;
