function Dashboard({ user }) {
  return (
    <>
      <h1>DASHBOARD</h1>
      {user && (
        <p>
          Welcome: {user.first_name} {user.last_name}
        </p>
      )}
    </>
  );
}

export default Dashboard;
