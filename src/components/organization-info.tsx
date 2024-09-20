import { KindeOrganization } from '@kinde-oss/kinde-auth-nextjs/types'
// BUG: the above type isn't working properly, getting
// "Cannot find module '@kinde-oss/kinde-auth-nextjs/types' or its corresponding type declarations."

const OrganizationInfo = ({ organization }: { organization: KindeOrganization }) => (
  <>
    <p className="text-body-2">
      <strong>Organization ID:</strong> {organization.orgCode}
    </p>
    <p className="text-body-2">
      <strong>Organization Name:</strong> {organization.orgName}
    </p>
  </>
)

export default OrganizationInfo