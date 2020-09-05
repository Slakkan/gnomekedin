# Documentation

In this file you can find a brief explanation of each decision taken in the process of creation of **GnomekedIn**.
The sections are divided by commit, the first commit is naturally the biggest since it sets up the architecture and configuration of the app.

## Initial Commit

> ---
>
> ### Defined naming conventions
> Throughout the app you can see the files are named element.type.extension, this is not an original idea it comes from angular styleguide and I borrowed it because it has helped me a lot in the past. Let's say you need to find a file which name you forgot but you know its type, you can just "Ctrl + p + .type" and Visual Studio Code will find all files of said type allowing you to quickly jump around the app. Also in the search function you have a "files to exclude" property so you can exclude all files of certain type.
>
> ---


> ---
>
> ### Installed core packages
> Most of these are pretty obvious. I want to explain in particular why I chose Rxjs, Bootstrap and redux-thunk.
> - **rxjs**: Rxjs operators are really useful, they allow us to create complex logic in a few lines of code.
> - **bootstrap**: since not all gnomes use the same device we should build our app with responsive design, bootstrap is a lightweight solution that also helps us keep our code clean and more importantly STANDARD. Most developers can understand bootstrap classes, learning how an app works takes time. Standars and conventions are the keys of productivity.
> - **redux-thunk**: Never let your components handle API calls, it gets confusing later on. The component should have a single responsability which is rendering the view.
>
> ---

> ---
>
> ### Created basic architecture for the app
> At this point in time we still don't have a clear picture of the reach the app may have in the future so we need a folder structure that can support expansion.
> - **src**: all the code that should compile goes here. This folder shouldn't contain many files as direct children as that would pollute the folder structure.
> - **router**: here goes logic related to routing, react-router helps our app feel snappy and fast. Here you can also find some logic related to security as we don't want all of our users to be able to access certain parts of the app. Ex: Control Panel.
> - **pages**: pages contains react components that feed into the router, they define the entire view. We still have a SPA, we just use the term for familiarity.
> - **components**:  the components we create here should be reusable building blocks of our app. They are of course, react components.
> - **shared**: here we can find utilities that can help us write cleaner code and simplify logic. They don't belong to any specific part of the app.
> - **models**: here we store our data models, they will help us with the typing and with business logic of our app.
> - **store**: code related to the redux store, which is the source of truth for the state of our app.
> - **tests**: even though unit tests are not part of the final product in a big development team they give us certainty that the important bits of the app work as intended.
> - **environment**: here we can save keys to our databases and online services. They are safe since the folder is added to our .gitignore so they won't accidentally get uploaded to github.
> - **settings**: here we can find variables that globally impact the app. Ex: the scss variables.
>
> ---

> ---
>
> ### Created basic configuration webpack to compile with typescript and sass-loader
> - **package**: added react, react-router, redux and bootstrap as dependencies. Added loaders and webpack to compile our code and some typings to make our lives easier.
> - **webpack**:  basic webpack configuration to get the development started. In the future we might want to add a different configuration for *development* and *production* environments.
> - **typescript**: configured typescript to compile ES6 and JSX down to ES5 so gnomes with outdated browsers can still visit GnomekedIn.
> - **gitignore**:  determines which files git shouldn't track.
> ---

> ---
>
> ### Created mock pages to confirm React Router is configured correctly
> Once you start the app you are not logged in so you can't access Control Panel page. But after 1 second the app has a mocked admin login so you will be able to access after 1 second, but not sooner.
> - **home**: to test public pages. Should always show on /.
> - **control-panel**: to test private pages. Should show only after 1 second of opening/refreshing the app.
> - **not-found**: to have a fallback in case none of the routes match. Should always show for routes that do not match the previous ones.
>
> ---

> ---
>
> ### Created actions, reducers and a store to test redux and redux thunk.
> Dispatched a mock action to login in the app which helps us verify the store and the router are working.
> - **actions**: created synchronous and asynchronous actions to test redux-thunk middleware.
> - **reducer**: created to test if state changes correctly.
>
> ---