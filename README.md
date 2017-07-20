# SAFETAG Content as Code CLI tool

SAFETAG is a curricula, a methodology, and a framework for security auditors working with advocacy groups.

Command line tool to manage content workflows for the SAFETAG project. It uses the content as code framework.

## Install

Prerequisites:
 - node v4
 - npm v5.0.4?

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
