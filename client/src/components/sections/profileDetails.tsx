interface ProfileDetailsProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    dob?: string;
    gender?: string;
    nation?: string;
    address?: string;
    course?: string;
    year?: string;
    grade?: string;
    pre?: string;
    phone?: { number: string }[];
    parentInfo?: { name: string; contact: string }[];
  };
}

export default function ProfileDetails({ user }: ProfileDetailsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 text-sm">
      <p><strong>DOB:</strong> {user.dob && new Date(user.dob).toLocaleDateString()}</p>
      <p><strong>Gender:</strong> {user.gender}</p>
      <p><strong>Nationality:</strong> {user.nation}</p>
      <p><strong>Address:</strong> {user.address}</p>
      <p><strong>Course:</strong> {user.course}</p>
      <p><strong>Year:</strong> {user.year}</p>
      <p><strong>Grade:</strong> {user.grade}</p>
      <p><strong>Previous School:</strong> {user.pre}</p>

      {user.phone?.map((p, i) => (
        <p key={i}><strong>Phone:</strong> {p.number}</p>
      ))}
      {user.parentInfo?.map((p, i) => (
        <p key={i}><strong>Parent:</strong> {p.name} ({p.contact})</p>
      ))}
    </div>
  );
}