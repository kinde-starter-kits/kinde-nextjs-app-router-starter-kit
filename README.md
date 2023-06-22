# Kinde Starter Kit - NextJS with full App Router support

## Register an account on Kinde

To get started set up an account on [Kinde](https://app.kinde.com/register). This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Setup your local environment

Clone this repo and install dependencies by running `npm i`

Make a copy of `.env.local.sample` and name it simply `.env.local`. Set the following values from the Kinde `Settings -> Applications -> Backend app` page.

- `KINDE_CLIENT_ID` with the `Client ID` value
- `KINDE_CLIENT_SECRET` with the `Client Secret` value
- `KINDE_ISSUER_URL` with the `Domain` value

e.g

```
KINDE_CLIENT_ID=<your_kinde_client_id>
KINDE_CLIENT_SECRET=<your_kinde_client_secret>
KINDE_ISSUER_URL=https://<your_kinde_subdomain>.kinde.com
```

## Set your Callback and Logout URLs

Your user will be redirected to Kinde to authenticate. After they have logged in or registered they will be redirected back to your React application.

You need to specify in Kinde which url you would like your user to be redirected to in order to authenticate your app.

On the `Settings -> Applications -> Backend app` page set `Allowed callback URLs` to `http://localhost:3000/api/auth/kinde_callback`

> Important! This is required for your users to successfully log in to your app.

You will also need to set the url they will be redirected to upon logout. Set the ` Allowed logout redirect URLs` to http://localhost:3000.

## Start your app

Run `npm run dev` in a terminal and navigate to `http://localhost:3000`.

Click on `Sign up` and register your first user for your business!

## View users in Kinde

If you navigate to the "Users" page within Kinde you will see your newly registered user there. 🚀
