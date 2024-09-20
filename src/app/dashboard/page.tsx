import OrganizationInfo from '@/components/organization-info';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { create, refreshTokens } from '../actions/organization';
import ClientOrganization from '@/components/client-organization';
import ServerOrganization from '@/components/server-organization';

export default async function Dashboard() {
  const session = await getKindeServerSession()
  const organization = await session.getOrganization()

  return (
    <div className="container">
      <div className="card start-hero">
        <p className="text-body-2 start-hero-intro">Woohoo!</p>
        <p className="text-display-2">
          Your authentication is all sorted.
          <br />
          Build the important stuff.
        </p>
      </div>
      <br />
      <ClientOrganization />
      <ServerOrganization />
      <form className="form" action={refreshTokens}>
        <button className="btn btn-primary" type="submit">
          Refresh Tokens
        </button>
      </form>
      {organization && organization.orgName === process.env.KINDE_DEFAULT_ORG_NAME && (
        <div className="card start-hero">
          <p className="text-body-2">You're part of the default organization, please create one and we'll assign you to it.</p>
          <OrganizationInfo organization={organization} />
          <br />
          <form className="form" action={create}>
            <div className="form-group">
              <label htmlFor="orgName">Organization Name</label>
              <input
                type="text"
                id="orgName"
                name="orgName"
                required
                className="form-control"
                placeholder="Organization Name"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Create Organization and assign me to it
            </button>
          </form>
        </div>
      )}
      {organization && organization.orgName !== process.env.KINDE_DEFAULT_ORG_NAME && (
        <div className="card start-hero">
          <p className="text-body-2">You've already set up your organization.</p>
          <OrganizationInfo organization={organization} />
        </div>
      )}
    </div>
  );
}
