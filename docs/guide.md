---
presentation:
    progress: true
---

<!-- slide -->
# SAFETAG Toolkit
#### Getting Started Guide

<!-- slide vertical:true -->
### About this presentation

This presentation is also available as a markdown guide and we welcome contributions!

You can view a commented video of this presentation at:
 - https://...

<!-- slide -->

### Topics
<!-- TOC depthFrom:2 depthTo:2 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Concepts](#concepts)
- [Install](#install)
- [Launch](#launch)
- [Edit](#edit)
- [Organise](#organise)
- [Contribute](#contribute)
- [Publish](#publish)
- [Next](#next)

<!-- /TOC -->

<!-- slide -->
## Concepts

Separate content from code. 3 main things remain
   - metadata
   - transclusion
   - markdown

<!-- slide -->
## Install

 - Change your current directory to where you'd like your workspace to be
 - Use `safetag init` only on first use.
    - You'll have to confirm the default options.
    - This will setup a `~/.content` folder where content packages will be installed.
    - The workspace will link to this folder.
 - Use `safetag start` to start a work session
    - Open your browser to the local address specified
    - Start editing content in the workspace

<!-- slide -->
## Launch

<!-- slide -->
## Edit

<!-- slide vertical:true -->

### Atom

pandoc conf in markdown enhanced preview:  `markdown_github+yaml_metadata_block+definition_lists+markdown_in_html_blocks+grid_tables`

<!-- slide vertical:true -->
### Syntax

Refer to a Markdown manual for the basics of the syntax.

There is some special syntax.

<!-- slide vertical:true -->
### Transclusion

Transclusion is a way to reference content snippets (or more) into a document.

- `index.md`
```markdown
Hi :[](name)!
```

- `name.md`
```markdown
Alice
```

Will be rendered as:
```markdown
Hi Alice!
```

<!-- slide vertical:true -->

This helps make content more reusable since the snippet's content can be transcluded several times and updating the snippet will automatically update all the locations where it is transcluded.

<!-- slide vertical:true -->

We say that the "content" is "dependent" on the transcluded "content".

 `:[title](link)` this will include the `link` snippet content in the current document.

In the easiest case, `link` is the name of a file in the same directory, but it can also be used with the following type of links:

<!-- slide vertical:true -->
#### Smart links

Smart links are easy to write and should "do the right thing" so you can focus on your content. The link resolution mechanism is described in more details below. It follows the general principles:
 - **Concise**: Avoiding writing extensions
 - **Modular**: The should support reusable content packages.
 - **Adaptable**: They should not need to be changes when overriding content (See [Overrides](#overrides))
 - **

<!-- slide vertical:true -->

In more details:
 - `:[](name)` - This will match the first of the following cases:
   - in the same folder as the content.
     - a file called `name` and will transclude it.
     - a file called `name.md` and will transclude it.
     - a folder called `name` with an `index` file and will transclude it.
     - a folder called `name` with an `index.md` file and will transclude it.
     - a folder called `name` with no index, it will transclude all files in the folder.
  - the same in the parent folders all the way to the workspace's root.
  - content packages
    - a content package called `name` installed in the content repository.

 - `:[](folder/name)`
   - same as above
   - content packages
     - a content package called `folder` with a subpackage `name`, the subpackage can be:
       - a file called `name`, `name.md`
       - a folder called `name` with and `index` or `index.md` file
       - a folder called `name` with no index and it will transclude all files in the folder.

<!-- slide vertical:true -->

#### Explicit links

 - `:[](name.md)` this will only match a file called `name.md` in the same directory and will transclude it.
 - `:[](./folder/name.md)` this will only match a file in the `folder` subdirectory of the content's directory.

<!-- slide vertical:true -->

### Overrides

Overrides allow to modify published content with your personal customisation with minimum changes and making it easy to later contribute back these changes to the publication.

<!-- slide vertical:true -->

Overrides are enabled by `workspaces`. A workspace is a dynamic representation of the content which is kept connected to its source publication (allowing updates and making it easier to contribute back), but which is optimised for content authoring (hiding technical details about rendering), content editing (SOON - with version control and collaborative features).

<!-- slide vertical:true -->

Here's a basic override example:

```
   .
   ├── index.md          // Index
   └── :chapters/        // `:` means that the chapters are from a content package.
       ├── chapter_1.md  // as a consequence these chapters are linked
       └── chapter_2.md  // and should not be modified.
```

<!-- slide vertical:true -->

In order to override it with your own chapter 2, you need to :
 - create a `chapters` folder in your workspace
 - create a `chapter_2.md` file in this folder.

<!-- slide vertical:true -->

This is what it will look like:

```
   .
   ├── index.md            // Index
   ├── chapters/           // This new folder will setup an override.
   │   └── chapter_2.md    // This will override chapter_2.md
   └── :chapters/          //
       ├── chapter_1.md    //
       └── chapter_2.md    // This is now masked.
```

<!-- slide vertical:true -->

This makes it easy to start working on your own versions of content without having to worry about making irreversible changes. This is also setup (SOON) to deal with version control for you so that every change is properly tracked and facilitate content packaging so that it's easy to contribute back.

<!-- slide -->

## Organise

<!-- slide -->

## Contribute

<!-- slide -->

## Publish

<!-- slide -->

## Next

 - Star us on Github [![GitHub stars](https://img.shields.io/github/stars/contentascode/safetag.svg?style=social&label=Star)]()
