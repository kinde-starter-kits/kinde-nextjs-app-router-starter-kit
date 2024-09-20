'use server'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Configuration, createKindeServerClient, GrantType, OrganizationsApi, SessionManager, UsersApi } from '@kinde-oss/kinde-typescript-sdk';

let store: Record<string, unknown> = {};

const sessionManager: SessionManager = {
  async getSessionItem(key: string) {
    return store[key];
  },
  async setSessionItem(key: string, value: unknown) {
    store[key] = value;
  },
  async removeSessionItem(key: string) {
    delete store[key];
  },
  async destroySession() {
    store = {};
  },
};

export async function refreshTokens() {
  try {
    const currentSession = await getKindeServerSession()
    currentSession.refreshTokens() // BUG: this does nothing
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function create (formData: FormData) {
  try {
    const kindeApiClient = createKindeServerClient(
      GrantType.CLIENT_CREDENTIALS,
      {
        authDomain: process.env.KINDE_ISSUER_URL,
        clientId: process.env.KINDE_MANAGEMENT_CLIENT_ID,
        clientSecret: process.env.KINDE_MANAGEMENT_CLIENT_SECRET,
        logoutRedirectURL: process.env.KINDE_POST_LOGOUT_REDIRECT_URL,
        audience: `${process.env.KINDE_ISSUER_URL}/api`,
      },
    );

    const token = await kindeApiClient.getToken(sessionManager);

    const config = new Configuration({
      basePath: process.env.KINDE_ISSUER_URL,
      accessToken: token,
      headers: { Accept: "application/json" },
    });

    const organizationsApi = new OrganizationsApi(config);
    // const usersApi = new UsersApi(config); // set up for the error explained on line 101
    const name = formData.get('orgName') as string;

    const newOrganization = await organizationsApi.createOrganization({
      createOrganizationRequest: { name },
    });

    const currentSession = await getKindeServerSession()
    const user = await currentSession.getUser()

    const { organizations: allOrganizations } = await organizationsApi.getOrganizations()
    const defaultOrganization = allOrganizations?.find(
      (org) => org.name === process.env.KINDE_DEFAULT_ORG_NAME
    ) // did this to find it through the name, can be done directly through the org code
    // but this also proves the organizationsApi works as expected
    
    const usersOnDefaultOrganization = await organizationsApi.getOrganizationUsers({
      orgCode: defaultOrganization?.code!,
    }) // this accurately shows the user on the default organization before moving it to the new one

    if (!defaultOrganization) {
      throw new Error('Default organization not found')
    }

    // BUG?: we need to check if the user is on the default organization before removing it, otherwise it'll fail
    // it's not supposed to be there, but it is if we try the form twice
    // and the form is always visible because the token isn't being refreshed
    // causing the user to be on the default organization even after being moved to the new one
    // also, since the form is always visible, the user can try to create the organization twice
    // causing the user to be present on several organization, since the ideal would be only to be removed from the default
    if (usersOnDefaultOrganization.organizationUsers?.find((orgUser) => orgUser.id === user.id)) {
      await organizationsApi.removeOrganizationUser({
        orgCode: defaultOrganization.code!,
        userId: user.id,
      }) // successfully removes user from default organization
    }

    await organizationsApi.addOrganizationUsers({
      orgCode: newOrganization.organization?.code!,
      addOrganizationUsersRequest: {
        users: [{
          id: user.id,
        }],
      },
    }) // successfully adds user to new organization

    currentSession.refreshTokens() // BUG: this does nothing

    // usersApi.refreshUserClaims({ userId: user.id }) // BUG? tried this, throws the following error
    /*
      Error [ResponseError]: Response returned an error code
          at new ResponseError (webpack-internal:///(rsc)/./node_modules/@kinde-oss/kinde-typescript-sdk/dist/runtime.js:498:28)
          at OrganizationsApi.eval (webpack-internal:///(rsc)/./node_modules/@kinde-oss/kinde-typescript-sdk/dist/runtime.js:419:31)
          at step (webpack-internal:///(rsc)/./node_modules/@kinde-oss/kinde-typescript-sdk/dist/runtime.js:90:23)
          at Object.eval [as next] (webpack-internal:///(rsc)/./node_modules/@kinde-oss/kinde-typescript-sdk/dist/runtime.js:71:53)
          at fulfilled (webpack-internal:///(rsc)/./node_modules/@kinde-oss/kinde-typescript-sdk/dist/runtime.js:62:58)
          at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
        response: Response {
          status: 400,
          statusText: 'Bad Request',
          headers: Headers {
            date: 'Fri, 20 Sep 2024 05:48:13 GMT',
            'content-type': 'application/json; charset=utf-8',
            'content-length': '106',
            connection: 'keep-alive',
            vary: 'Accept-Encoding'
          },
          body: ReadableStream { locked: false, state: 'readable', supportsBYOB: true },
          bodyUsed: false,
          ok: false,
          redirected: false,
          type: 'basic',
          url: 'https://wali-test.us.kinde.com/api/v1/organizations/org_8af28535d419/users/kp_2adbe161ceb44c8e94917579486cc373'
        }
      }
    */
    // where org_8af28535d419 is the default organization code

    return newOrganization
  } catch (error) {
    console.error(error)
    throw error
  }
}