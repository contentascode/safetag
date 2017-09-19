# Contribution

In order to contribute back your changes there are several approaches.

## Simple edits

A simple edit should be easy to contribute by relying on the edit links provided on the [toolkit website](https://contentascode.github.io/safetag/@safetag/toolkit/) and Github's own collaboration features. The process will be as follow:
 - Click an edit link on the toolkit website at https://contentascode.github.io/safetag/@safetag/toolkit/
 -

## Create your fork

Follow the following steps:
- Assuming you have a github account, create a fork of the `safetag-toolkit` repository.

Just go to the github page for the repo https://github.com/contentascode/safetag-toolkit and click the Fork button on the top right.
This will create a working copy of the content package which you can edit and work on until you're ready to contribute your changes.

- Clone your fork `safetag-toolkit` repository

```
cd ~
git clone https://github.com/MY_USER_NAME/safetag-toolkit.git
```

- Link the cloned repository to your workspace

This is necessary because normally the `safetag` command manages content packages for you (it installs and updates them in `~/.content/packages`) but when you want to work on the `safetag-toolkit` package yourself, then you need to link the `~/.content/packages/safetag-toolkit` folder to the folder where you cloned the repo with git (and where you just copied the migrated content).

```
cd ~/safetag-toolkit
# backup the existing content package just in case
mv ~/.content/packages/safetag-toolkit ~/.content/packages/safetag-toolkit.bak
ln -s   ~/.content/packages/safetag-toolkit
```

### For Contributors

Assuming you want to contribute a recently migrated update to the `safetag-toolkit` package, and have followed the previous steps then you need to:
 - Clone the `safetag-toolkit` repository.
 -

### For Publishers

Assuming you have permissions to publish the package on the npm registry (contact the maintainer to receive access), then you need to:
