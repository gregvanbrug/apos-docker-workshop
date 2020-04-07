# 03 Apostrophe

We'll use the Apostrophe CLI to scaffold our new site

## Installing the CLI

To install the CLI globally, run

```
npm i -g apostrophe-cli
```

or if you prefer not to install things globally you can use `npx`. `npx` comes installed with Node and allows you to run a Node executable without having to globally install it. If you prefer to use this method, run `npx apostrophe-cli` instead of the `apostrophe` command in the following examples.

## Creating a new project

To create a new Apostrophe site run:

```
apostrophe create-project mysite

```

This will create a site in a new directory `mysite`.

After the new site is created install dependencies by `cd`-ing into the `mysite` directory and running `npm install`.

You now should add the default admin user so you can login to the site. You can do that using the `apostrophe-users` command.

```
node app.js apostrophe-users:add admin admin
```

This will create an `admin` user and assign them to the `admin` group. You will be prompted to create a password for this user.

## Viewing your new mysite

Fom the `mysite` directory, run `npm start`.

Your terminal should print a message saying "Listening at http://localhost:3000" after the server starts.

Visiting that URL in your browser should show the default Apostrophe homepage.

Welcome to Apostrophe.

## Adding a rich-text-widget to the homepage

A super simple example of how to make the site editable is to add a rich-text widget to the homepage. The template file for this should be located in `lib/modules/apostrophe-pages`.

To add a singleton to the homepage, open the `home.html` template in `apostrophe-pages/views/pages`

Add the following code to the template:

```
{{ apos.singleton(data.page, 'content',
    'apostrophe-rich-text', {
      toolbar: [ 'Bold', 'Italic' ]
    })
}}
```

If you're not logged in already, login as the admin user. You should now see an editable region on the homepage.

To learn more about areas, singletons, and widgets see [Editable Content on the Page: Widgets](https://docs.apostrophecms.org/apostrophe/core-concepts/editable-content-on-pages)
