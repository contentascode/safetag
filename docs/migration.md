# Migration

The migration script is automatically ran each time the safetag toolkit is rebuilt in order to pick up changes that are done in the [SAFETAG/SAFETAG](https://github.com/SAFETAG/SAFETAG) repo.

This guide explains how to run this process locally, the different component that are used during the process, and how to customise it in order to progressively move the master content repository to the new content as code approach.

## Usage

### Run migration locally

Avoid doing this from within your safetag `workspace`, the example below assumes you're using your home folder.

```bash
cd ~
git clone https://github.com/SAFETAG/SAFETAG.git
safetag start --no-watch --source $(pwd)/SAFETAG/en migrate
```

This command will start the safetag toolkit's `migrate` script with:
 - `--no-watch`: Running it once rather than watching the folder
 - `--source $(pwd)/SAFETAG/en`: Migrating from a locally cloned copy of the

### Link packages in order to replace local content package data

When bootstrapping the safetag toolkit with `safetag init`, the latest version of the `safetag-toolkit` package is downloaded. This version is regularly but manually updated with content from the upstream SAFETAG repo. If you follow the previous step, then you might have more recent content coming from upstream. In order to render the toolkit locally with this new content you need to:
 - First complete the step above that will run the migration script.
 - Then link the folders you just migrated to your safetag workspace by running:

```bash
safetag link @safetag/activities:~/.content/build/@safetag/migrate/activities --force
safetag link @safetag/references:~/.content/build/@safetag/migrate/references --force
safetag link @safetag/methods:~/.content/build/@safetag/migrate/methods --force
safetag link @safetag/images:~/.content/build/@safetag/migrate/images --force
safetag link @safetag/document_matter:~/.content/build/@safetag/migrate/document_matter --force
safetag link @safetag/guide/index.md:~/.content/build/@safetag/migrate/index.guide.md --force
```

## Continuous Migration

### How the migration is ran when the toolkit is built

The [Travis CI configuration file](https://github.com/contentascode/safetag/blob/0ae8af3a70f7bb1fda56030353dc4febe7e3026b/.travis.yml#L25-L30) contains the scripts steps that run the above steps automatically in order for the [preview website](https://contentascode.github.io/safetag/@safetag/toolkit/), hosted on github pages, to be up to date.

## Packaging Migrated Content

Currently this step is ran manually once in a while. It allows packaging the migrated content at a specific point in time inside the `safetag-toolkit` content package. This means that contributors who run the `safetag init` command (and soon with auto update, the ones running `safetag start`) will get the latest migrated content without having to run the migration steps above.

In order to package and distribute recently locally migrated content you need to follow the contribution guide with the following additional steps before pushing your changes:

- Run the migration locally (See above steps)
- Copy the migrated content to the cloned repository.

This will copy the 4 main folders that are migrated by the migration script. You can use the same syntax to migrate only one activity for instance.

```bash
cp -R ~/.content/build/@safetag/migrate/activities ~/safetag-toolkit/content/toolkit/ && cp -R ~/.content/build/@safetag/migrate/methods ~/safetag-toolkit/content/toolkit/ && cp -R ~/.content/build/@safetag/migrate/document_matter ~/safetag-toolkit/content/toolkit/ && cp -R ~/.content/build/@safetag/migrate/references ~/safetag-toolkit/content/toolkit/
```

## Partial Migration

In order to allow a smooth migration, progressively onboard SAFETAG contributors to use the new content as code approach, and allow getting feedback to finalise the content structure with the new approach the current upstream repo is continuously migrated, i.e. the current upstream repo is the real content master.

However, as contributors are onboarded, the content master will progressively switch to being the new content as code repository. The idea is that the content will be deleted from the upstream SAFETAG repository which will:
 - Help avoid any problems with two master versions of the content (note that this could be deal with in case it happens by mistake with the [3 way merge](https://github.com/iilab/contentascode/issues/19#issuecomment-327825734) technique)
 - Ensure that...
