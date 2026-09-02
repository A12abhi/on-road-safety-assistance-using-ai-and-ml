import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <section>
      <h2 className="text-xl font-semibold">User Profile</h2>
      <div className="mt-4 rounded-xl border p-4 text-sm">
        <p><b>Name:</b> {user?.name}</p>
        <p><b>Email:</b> {user?.email}</p>
        <p><b>Phone:</b> {user?.phone}</p>
        <p><b>Role:</b> {user?.role}</p>
        <p><b>Vehicle:</b> {user?.vehicle?.vehicleType} / {user?.vehicle?.fuelType}</p>
      </div>
    </section>
  );
};

export default ProfilePage;
