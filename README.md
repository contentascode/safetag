[![Travis](https://img.shields.io/travis/contentascode/safetag.svg)](https://travis-ci.org/contentascode/safetag) [![npm](https://img.shields.io/npm/dt/docsmith.svg)](https://www.npmjs.com/package/docsmith) [![Code Climate](https://img.shields.io/codeclimate/github/contentascode/safetag.svg)](https://codeclimate.com/github/contentascode/safetag) [![GitHub license](https://img.shields.io/github/license/contentascode/safetag.svg)](https://github.com/contentascode/safetag/blob/master/LICENSE)

# SAFETAG Content as Code CLI tool

SAFETAG is a curricula, a methodology, and a framework for security auditors working with advocacy groups.

Command line tool to manage content workflows for the SAFETAG project. It uses the content as code framework.

## Install

Prerequisites:
 - [node v6](https://nodejs.org/en/)
 - npm v5.3.0
   -  `npm i -g npm`
 - pandoc 1.17
   - Debian/Ubuntu `wget https://github.com/jgm/pandoc/releases/download/1.19.2.1/pandoc-1.19.2.1-1-amd64.deb && sudo dpkg -i pandoc-1.19.2.1-1-amd64.deb`
   - OSX : `brew install pandoc`
 - docsmith v0.5.3:
   -  `npm i -g docsmith`

```
npm i -g safetag
```

## Usage

```
mkdir workspace
cd workspace
safetag init
```

This will prompt you with a few questions about configuration. The defaults should work in the majority of cases.

```
safetag start
```

This will start the preview server and watch your local files for changes. You can open your browser at `http://localhost:3000` to browse the toolkit.

## Plan an Audit

Follow the instructions on the toolkit homepage. The steps will be:
 - Start from scratch or the minimum audit scenario provided.
 - Add and configure activities for your planned audit.
 - Download an `audit.yml` file and drop it in the `workspace/audits` folder.

This will create a audit project structure for you to:
 - Have a printable outline you can share with the audited organisation's staff and use as a checklist.
 - Have a structure to gather notes and results from the audit that will be useful to collect for your report.

## Customise the toolkit

How this works:
 - The content in your workspace can be changed to override the default content from the released toolkit.

### Modifying activities

You might find that the content of an activity you are used to perform doesn't reference material which. Gladly this as simple as adding an activity `variation`! Let's go step by step:
 - 1

### Changing the categorisation

Everyone have different ways to categorise content. Even thought we provide various ways to categorise the content, you might want to add your own categorisation or modify existing categorisation to fit your needs. Thankfully this is very simple! Here are the steps:
 - 1


## Contribute back

You can contribute back to the SAFETAG community of practice in various ways.


### Activity content packages

### Toolkit content package

### Minumum Audit scenario package

You can use
