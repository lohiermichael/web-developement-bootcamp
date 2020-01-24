# Git

## 1. Introduction

* What is Git?

It is a distributed version control system: a tool to work with different version of the code. We can go back to previous versions of the code and work in team.

* What is Github

It is  Website working with Git, a viewer of Git to publicly share code and work collaboratively.

* Why should you care about Git?
At the time of the course 42% of developers were using it.
It is an important skill to add to a resume

* Novel writing analogy

We can write different stories and then keep the best, "merge" them...

* Initializing Git

Find tutorials for to set up Git

# 2. Git Basics

* git init

By running this command in a folder, we initialize `git within this folder. Anything out of it won't be tracked by Git.
The good practice is to have one **repository**, aka folder (repo) per project.
The `git init` command creates at the root of the repo a hidden folder: *.git*

* git status

Add Git for a current status of your file track.
By running it, it reminds you:
- the branch you are currently on
- the commit you are at
- the untracked files


* git add

With this command we can add or update to git a new version of a file, a folder or several. the added content is then ready to be committed: it is at a staged state.
`git add .` stage everything

* git commit

A commit is a version of the code that we want to save with git. You draft a message to describe the changes that you want to keep by adding the tag `-m`. Without the tag, it terminal will open a text editor to write the message.
The common practice is to write the messages in present temps. *ex: Add app file*

## Steps

1. mkdir git_intro
2. cd git_intro
3. touch app.js
4. Add something in the file
5. git init
6. git status: to see that app.js is in the untracked files
7. touch cat.js
8. git status: cat.js has appeared in the untracked files
9. git add app.js
10. git status: now we see that app.js is ready to be committed
11. git commit -m "Add app file": it then said that one file changed: a insertion
12. git status: app.js is no longer present, only cat.js is untracked
13. git add cat.js
14. git commit -m "Add cat file"
15. git status: it prints the message: 'noting to commit, working directory clean, which basically means that git is one with our code
16. Modify the content of cat.js and save
17. git status: now it says that cat.js is modified
18. git add cat.js
19. git commit -m "Add MEOW to cat": message shown: 1 file changed, 1 insertion


# 3. Git checkout

* git log

Running this command gives a history of the commits that you have made in the repo. 
- By hitting the up and down arrows it will scroll through your commits.
- By typing `q` you leave the logs
- Per commit, you have 4 pieces of information:
    1. The commit long code (hash)
    2. The author: given that we can work in team it makes sens
    3. The date the commit was made
    4. The message


* git checkout 

 It is a versatile command to view a special status of the code. In the case of the logs. If we type `git checkout` + log_hash_code it will show how the code was at the state of this commit.

 If we try to checkout while our current status is not in sync with Git, Git is going to warn us to either commit our changes or revert them.

 The key word HEAD stands for a point in time. By checking out to a previous commit it says: HEAD detached at commit_hash.

    HEAD
     O -> O ->O ->O -> O 
                        Master 

To come back to the latest state run : `git checkout master`

*IMPORTANT!* How to revert to a previous commit

There are different ways to do it. The easier is certainly:
`git revert --no-commit <commit_hash>..HEAD`

## Steps

1. Make a dog.js file and commit it
    - touch dog.js
    - git add dog.js
    - git commit -m "Add dog file"
2. Make something dumb inside it and commit
    - Add some not running code in dog.js
    - git add dog.js
    - git commit -m "Mess up dog file"
3. Revert two commits back before the dog file was made
    - git log: to find the hash of the commit that we want to revert
    - git revert --no-commit `<commit_hash>`..HEAD
    - git status: It prints:
        You are currently reverting commit `<commit_hash>`
    - git commit -m "Revert back before the creation of the dog file" or "Revert back to commit `<commit_hash>`
    
