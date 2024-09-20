'use client'

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const ClientOrganization = () => {
  const { userOrganizations, getUserOrganizations } = useKindeBrowserClient();
  const userOrgs = getUserOrganizations();

  // BUG:
  // these two objects are supposed to be KindeOrganizations, which is an object
  // but on page load they are arrays, which causes an error when trying to map
  // over their orgs property, although ... as the server functions
  // both arrays contain only the default organization

  console.log('userOrganizations', userOrganizations, `isArray: ${Array.isArray(userOrganizations)}`);
  console.log('userOrgs', userOrgs, `isArray: ${Array.isArray(userOrgs)}`);

  return (
    <div>
      <h2>Your Organizations (from client)</h2>
      <ul>
        {/*
          * BUG:
          * this ?.orgs? check shouldn't be needed but it is since they
          * are arrays at the time of mount
        */}

        {userOrganizations?.orgs?.map((org) => (
          <li key={org.code}>{org.name}</li>
        ))}
        {userOrgs?.orgs?.map((org) => (
          <li key={org.code}>{org.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ClientOrganization;