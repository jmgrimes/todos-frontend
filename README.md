# Welcome to The Todos Frontend Application

The Todos Frontend Application is a simple fullstack application written with Remix, React, and Typescript as a 
demonstration of progressive delivery using the feature management capabilities supplied by the LaunchDarkly 
product.  At a high level, it aims to demonstrate the following aspects of using LaunchDarkly:

- How can my team build features progressively in parallel?
- How can I target users based on user attributes when turning features on and off?
- How can I effectively use feature flags in a fullstack application with both the client and server SDKs?

The first two items are fairly well known subjects of this space, and while a few moments to treat these subjects is a
part of any demonstration of LaunchDarkly.  However, the last facet turns out to be an incredibly tricky aspect of the 
problem space, mainly due to the advent of SSR fullstack React frameworks like Remix and Next.js.

## Server Side Rendering and Feature Flags: Why is this a problem?

The client side SDK is helpful for turning off features with an immediate response on the client side, but... 
frameworks like Remix and Next.js can't load the client side SDKs to properly render on the server side.  This 
results in a "flicker" as all pages and components start up with their default flagging states, then refresh as the 
client SDK loads.  This devalues much of the speed gain inherent with server side rendering.  A client will likely 
get an empty screen, even if for only a few moments, then re-render on the client side to hydrate the full pages.

We could solve this problem by evaluating feature flags on the server side instead, but this has its own drawbacks.  
Once the client side is delivered, the flag values are largely hard coded into the existing version of the UI in the 
browser.  This means that if we want to disable a feature because it's misbehaving, or we want to enable a new feature 
because it is working well, all clients won't see this until another full refresh occurs.  This isn't ideal, as clients 
that have misbehaving versions will continue to misbehave until the client leaves or reloads, and clients won't see 
new features in their sessions as soon as they're rolled out.

We need a way to ensure that the server side render provides the most value by hydrating as much as possible, while 
also maintaining the flexibility of client side updates once the server side render has completed and exists in the 
client.  To accomplish this, we load the flag states on the server side, and pass them as defaults into the client 
side SDK.  In this way, the server side render produces a fully hydrated representation, and the client side receives 
the flag states as it will experience them once the client side SDK initializes.  Since we're still initializing and 
relying on the client SDK as well, however, the client side will still refresh as flag states change after the initial 
render.

The main wrinkle to this narrative is the propagation of the user key and attributes across the client and server side,
which this application chooses to solve by delivering a cookie to the client side from the server when one is not 
detected at initialization.

## Development

From your terminal:

```sh
yarn dev
```

This starts your app in development mode, rebuilding assets on file changes.

You will also need to start up the json-server to load data into the application.  Open a new terminal window and run:

```sh
yarn start-backend
```

This starts a mock JSON API that the application can use during development.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over your `app/` folder to the new project that's pre-configured for your target server.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```
