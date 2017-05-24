# Frame

Persisted boilerplates for all your projects.

## What and why?

Fed up of copying files everywhere between projects? Fed up of copying them *again* when you update something? 

This project is a middle-ground between an initial project boilerplate (ie. *one*-time generation of files like `yeoman`) and an entirely black-boxed environment (ie. limited exposed scripts like `create-react-app`).

Create one source (a **frame**) and replicate that across all your desired projects. As you update your **frame**, your projects can be updated to reflect the changes as well!

## How?

#### 1. Write a frame or use an existing one.

A frame is simply a npm package with *any* files (seriously anything). These files act as the template for your project.

```
$ mkdir my-oss-frame
$ cd my-oss-frame
$ npm init
$ touch .eslintrc .gitignore webpack.config.js LICENSE.md README.md
$ npm publish
```

#### 2. Initialise or update your project with your frame.

All files from your frame are copied over into your project. Woo, boilerplate!

We will also preprocess these files as [mustache](https://www.npmjs.com/package/mustache) templates using [your data](#template-data).

```
$ cd my-project
$ frame my-oss-frame
```

#### 3. Update your frame.

Just modify any of your frame files (or add new ones!) and publish as a new package version.

```
$ cd my-oss-frame
$ touch .newconfig
$ npm version minor
$ npm publish
```

#### 4. Install and update the new frame in your project

The newly updated files will be copied over.

If you updated any of your project files which were sourced from your frame we treat these as "ejected" files. We do this by keeping track of the file hashes in frame versions.

```
$ cd my-project
$ npm install my-oss-frame@newverison
$ frame
```

*Note: You can and should commit the files which are persisted into your project.*

## Install

```
npm install -g frame
```

## Template Data

Any data found in your [configuration](https://github.com/davidtheclark/cosmiconfig) will be available in your files which are all treated as [mustache](https://www.npmjs.com/package/mustache) templates. We also add `pkg` which is your projects `package.json` data!

For example with the configuration file `.framerc`:

```json
{
  "data": {
    "name": "My Project",
    "description": "This is a great project"
  }
}
```

And the frame file `README.md`:

```
# {{name}} ({{pkg.version}})

{{description}}
```

We would see the following file `README.md` copied to your project:

```
# My Project (0.0.1)

This is a great project
```

## Roadmap

- [ ] Special/initial handling of `package.json` from source frame
- [ ] Nicer cli UX by allowing choosing of specific overrides rather than *always* either skipping or forcing
- [ ] :bug: Handling overwrites where file was not previously framed
- [ ] Framed frames (ie. infinite `"extends"`)