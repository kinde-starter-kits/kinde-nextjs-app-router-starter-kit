import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import TestComponent from "./testcomponent";

type Properties = {
	test: string;
};

export default async function Dashboard() {
	const { getOrganization, getUserOrganizations, getIdToken, getAccessToken } =
		getKindeServerSession();

	console.log("getOrganization", await getOrganization<Properties>());
	console.log("getUserOrganizations", await getUserOrganizations());
	// console.log("getIdToken", await getIdToken());
	// console.log("getAccessToken", await getAccessToken());

	const org = await getOrganization<Properties>();

	org?.properties?.test;
	return (
		<div className="container">
			here
			<TestComponent></TestComponent>
			<div className="card start-hero">
				<p className="text-body-2 start-hero-intro">dddWoohoo!</p>
				<p className="text-display-2">
					Your authentication is all sorted.
					<br />
					Build the important stuff.
				</p>
			</div>
			<section className="next-steps-section">
				<h2 className="text-heading-1">Next steps for you</h2>
			</section>
		</div>
	);
}
