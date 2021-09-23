# [TIMELY](https://time-ly.netlify.app)

[![Netlify Status](https://api.netlify.com/api/v1/badges/d02cbafe-1f5d-4d68-963a-cd293a9e8537/deploy-status)](https://app.netlify.com/sites/time-ly/deploys)

<br>

You are viewing the client side code. Server side repo is available [here](https://github.com/lucabettini/timely-backend). 

<br>

This website was created as a personal project in September 2021. Built with React, Redux, RTK Query and Material-UI, it interacts with a RESTful API on a different domain, allowing the user to perform all basics CRUD operations on different types of tasks, behaving like a digital time tracker (like [Toggl](https://toggl.com/track/toggl-desktop/)) and schedule manager (like [TickTick](https://www.ticktick.com/)). The authentication is handled with JWT, issued by the server and sent as a HTTP header on every request. 

<br>
<br>

## DESIGN

Every user can add events, called 'tasks', specifying a name, date, a main category (called 'area') and a specific category (called 'bucket'), and complete them using a checkbox. These events can be optionally tracked using a timer that keeps on going until it's manually stopped, even if the page is refreshed or the browser is closed, ending the session. 

The user can also choose to make an event recurrent, specifying a frequency (days, weeks, months or years), an interval and a time frame after which the event stops to be recurring (after a certain date, after x occurences or never). 

The website is built using the latest version React (17.0.2), with functional components and React Hooks instead of class components (a part from the [Error Boundary](https://github.com/lucabettini/timely-client/blob/main/src/components/global/ErrorBoundary.js 'Error Boundary') component, that doesn't have an alternative with hooks yet). 

To keep the frontend and the backend in sync and reduce the number of redundant requests, a caching and state management system was implemented, using [Redux](https://redux.js.org/ 'Redux') and [Redux Toolkit Query](https://redux-toolkit.js.org/rtk-query/overview). Most of the API requests are managed through RTK Query; the endpoints were splitted between [different files](https://github.com/lucabettini/timely-client/tree/main/src/redux/endpoints) to improve code organization. The tag system included in RTK Query allows to refetch the necessary data after a POST, PATCH or DELETE request has invalidated them. 

A [Redux slice](https://github.com/lucabettini/timely-client/blob/main/src/redux/timeUnitSlice.js) was also created to keep information about the task currently being tracked, with an action dispatched every second to increment the timer count and a field to store che interval ID in order to stop it from different components (both the timer navigation bar on the bottom of the screen and the pause button directly on the task description). 

This cache system was used to perform requests on tasks and related resources; for authentication and user endpoints, requests are made using [axios](https://www.npmjs.com/package/axios) inside useEffect hooks. Every user can register, login, logout, change the account details (email and username), change the password while authenticated or request a reset a password reset link, sent to his/her email, if the password was forgotten. 

<br>
<br>

## LAYOUT

The layout was made with [Material-UI](https://mui.com/) and customized using inline styling and the [makeStyles API](https://mui.com/styles/api/#heading-makestyles-styles-options-hook).

The authenticated user can navigate across 9 main screens (8 for viewing tasks, 1 for his/her account) using a [sidebar](https://github.com/lucabettini/timely-client/blob/main/src/components/navigation/SideNav.js) and a [navigation bar on top](https://github.com/lucabettini/timely-client/blob/main/src/components/navigation/Navbar.js). When starting a timer, an additional [navigation bar](https://github.com/lucabettini/timely-client/blob/main/src/components/navigation/TimeUnitBar.js) fixed on the bottom of the screen is displayed, allowing the user to change page easily while having the timer on display.

<br>
<br>

## CUSTOM HOOKS

Real authentication happens on the server: the [useAuth hook](https://github.com/lucabettini/timely-client/blob/main/src/hooks/useAuth.js 'useAuth hook') is merely a way to prevent the non-malicious user to view pages not intended for him or her. This hook exports five functions: 
- One for login, that saves the JWT issued by the server both on session storage and on the hook state. 
- One for logout, that performs a request to the server to add the token to a blacklist and clears the session storage. 
- One for getting the token (if present) or redirect to login (if not present)
- Two functions to protect pages, that immediately redirect to /login if a token is not detected (or to /home, if there is a token and the page is guest-only). 

Like authentication, every request is validated on the server side before being processed. Nonetheless, a system to validate the user input on the client side was needed, especially when the input is required or has to conform to certain standards (like a password, an email ecc.). 

The [useValidation hook](https://github.com/lucabettini/timely-client/blob/main/src/hooks/useValidation.js), combined with a [custom input component](https://github.com/lucabettini/timely-client/blob/main/src/components/global/CustomInput.js), accepts an object of initial values for fields in the form. All fields are controlled directly by the hook, that checks the fields validity against a [yup schema](https://www.npmjs.com/package/yup) (passed as a prop) whenever the input changes, but displays an error only if the user has already left the field. 

The hooks exports an additional function, called canSubmit, that runs validation on all inputs, even those not modified, and returns a boolean. The form is simply not submitted if the return value is false. 

<br>
<br>

#### CREDITS

Fonts by [Google Fonts](https://fonts.google.com/ 'Google Fonts'). The main logo is from [pikisuperstar](https://www.freepik.com/pikisuperstar 'pikisuperstar') on Freepik.

---

Made by [Luca Bettini](https://lucabettini.github.io/).


