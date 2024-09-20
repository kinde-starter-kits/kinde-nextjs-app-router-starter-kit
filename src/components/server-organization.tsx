import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const ServerOrganization = async () => {
  const session = await getKindeServerSession();
  const currentOrganization = await session.getOrganization();
  const userOrganizations = await session.getUserOrganizations(); // BUG: this is always null

  return (
    <div>
      <h2>Your Organizations (from server)</h2>
      <p>Current Organization: {currentOrganization?.orgName}</p>
      <ul>
        {userOrganizations?.orgs?.map((org) => (
          <li key={org.code}>{org.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ServerOrganization;