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

## Adding a Talks Piece

You can use the cli to create new pieces and their corresponding pieces-pages. From the `mysite` directory run

```
apostrophe create-piece talk --pages
```

This will create two directories `talks` and `talks-pages`.

We can now register our new modules in `app.js` in the `modules` object.

```
modules: [
    'talks': {},
    'talks-pages': {}
]
```

Now let's add some fields.

Each "Talk" will have a Title, Time, Image, and Content.

In the `talks/index.js`, update the `addFields` array with our fields:

```
addFields: [
    {
        name: 'time',
        label: 'Time',
        type: 'string',
        help: 'The date and time of the talk'
    },
    {
        name: 'image',
        label: 'Image',
        type: 'singleton',
        widgetType: 'apostrophe-images',
        help: 'An overview image for the talk',
        options: {
            limit: [1]
        }
    },
    {
        name: 'content',
        label: 'Content',
        type: 'area',
        options: {
            widgets: {
                'apostrophe-rich-text': {
                    toolbar: [ 'Styles', 'Bold', 'Italic', 'Link', 'Unlink', 'Split', 'NumberedList', 'BulletedList', 'JustifyCenter', 'JustifyLeft', 'JustifyRight' ],
                    styles: [
                        {
                          name: 'Heading Level 2',
                          element: 'h2'
                        },
                        {
                          name: 'Heading Level 3',
                          element: 'h3'
                        }
                    ]
                },
                'apostrophe-files': {
                    options: {
                        limit: 1
                    }
                }
            }
        }
    }
]
```

We'll also give our Talks Pages a name property so we can add a page route. Update `talks-pages` with:

```
name: "talks-pages"
```

Now we can tell apostrophe about out new pages. In `apostrophe-pages/index` add:

```
park: [
  {
    slug: "/talks",
    published: true,
    parkedId: "talks",
    title: "Talks",
    type: "talks-pages"
  }
]
```

Displaying the fields.

Now, we can create a basic index page of our new Talks piece. In `talks-pages/index.html` let's add:

```
{% extends "apostrophe-templates:outerLayout.html" %}

{% block main %}
{% for talk in data.pieces %}
    <a href="{{ talk._url }}">{{ talk.title }}</a>
{% endfor %}
{% endblock %}
```

This will create a link to our talk pages.

Then in `show.html` add

```
{% extends "apostrophe-templates:outerLayout.html" %}

{% block main %}
{% set img = apos.images.first(data.piece.image) %}
<img src="{{ apos.attachments.url(img) }}" />

<h1>{{ data.piece.title }}</h1>
<p>{{ data.piece.time }}</p>

{{ apos.area(data.piece, 'content') }}
{% endblock %}
```
