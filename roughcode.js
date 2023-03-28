import express from "express";
import { cards } from "./customerData.js";
// import { router } from "./test.Router.js";
import { transactions } from "./customerData.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
  //or console.log("Listening on PORT" + PORT)
});

app.use(express.json());
// app.use("/test", router);

// const transactions = getTransactionsFromDatabase(customer_id);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Validate Card by Card Number and Cvv
app.get("/api/card/validate/:debitCardNumber/:cvv", (req, res) => {
  // const debitCardNumber = req.params.debitCardNumber
  const card = cards.find(
    (card) =>
      card.debitCardNumber === Number(req.params.debitCardNumber) &&
      card.CVV === Number(req.params.cvv) &&
      card.isDeleted === false
  );
  if (card) res.send(true);
  else res.send(false);
});

// Get Card by card number and cvv
app.get("/api/card/:debitCardNumber/:cvv", (req, res) => {
  const card = cards.find(
    (card) =>
      card.debitCardNumber === Number(req.params.debitCardNumber) &&
      card.CVV === Number(req.params.cvv) &&
      card.isDeleted === false
  );
  if (card) res.send(card);
  else res.status(404).send("Card not found");
});


// Add transaction
app.post("/api/card/", (req, res) => {
  const card = cards.find(
    (card) =>
      card.debitCardNumber === Number(req.body.debitCardNumber) &&
      card.isDeleted === false
  );

  if (!card) {
    res.status(404).send("Card not found");
  } else if (card.amount < Number(req.body.amount)) {
    res.status(400).send("Insufficient balance");
  } else {
    const newTransaction = {
      id: transactions.length + 1,
      debitCardNumber: Number(req.body.debitCardNumber),
      amount: Number(req.body.amount),
      dateAndTime: Date.UTC,
      isDeleted: false,
    };
    card.amount = card.amount - Number(newTransaction.amount);
    transactions.push(newTransaction);
    res.send(newTransaction);
  }
});

// Delete card by card id
app.delete("/api/card/:cardId", (req, res) => {
  if (!card) {
    res.status(404).send("Card not found");
  } else {
    card.isDeleted = true;
    res.send(true);
  }
});

// Get All Transactions
app.get("/api/transactions/", (req, res) => {
  res.send(transactions);
});

//edit transaction by transactionID
app.put("/api/transactions/:debitCardNumber/:transactionID", (req, res) => {
  const debitCardNumber = req.params.debitCardNumber;
  const transactionID = req.params.transactionID;
  const cardIndex = transactions.findIndex(
    (transaction) =>
      transaction.debitCardNumber === Number(req.params.debitCardNumber) &&
      transaction.id === Number(req.params.transactionID)
  );
  if (cardIndex === -1) {
    res.status(404).send("Card not found");
  } else {
    if (req.body.amount) {
      transactions[cardIndex].amount = req.body.amount;
    }

    console.log(transactions[cardIndex]);
    res.send(String(cardIndex));
  }
});

// list all transactions in database after each occurence by transactionID:
app.post("/api/transactions/:debitCardNumber/:transactionID", (req, res) => {
  const newTransaction = {
    transactionID: req.body.transactionID,
    debitCardNumber: req.body.debitCardNumber,
    amount: req.body.amount,
    dateAndTime: Date.UTC
  };

  transactions.push(newTransaction);

  res.send("Transaction added");
});


git merge practice
mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking
$ git status
fatal: not a git repository (or any of the parent directories): .git

mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking
$ git status
fatal: not a git repository (or any of the parent directories): .git

mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking
$ git init
Initialized empty Git repository in D:/InceptionU/firstProject-Banking/.git/

mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (master)
$ git remote

mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (master)
$ git remote github git remote add github git://github.com/jdoe/coolapp.git
error: unknown subcommand: `github'
usage: git remote [-v | --verbose]
   or: git remote add [-t <branch>] [-m <master>] [-f] [--tags | --no-tags] [--mirror=<fetch|push>] <name> <url>
   or: git remote rename [--[no-]progress] <old> <new>
   or: git remote remove <name>
   or: git remote set-head <name> (-a | --auto | -d | --delete | <branch>)
   or: git remote [-v | --verbose] show [-n] <name>
   or: git remote prune [-n | --dry-run] <name>
   or: git remote [-v | --verbose] update [-p | --prune] [(<group> | <remote>)...]
   or: git remote set-branches [--add] <name> <branch>...
   or: git remote get-url [--push] [--all] <name>
   or: git remote set-url [--push] <name> <newurl> [<oldurl>]
   or: git remote set-url --add <name> <newurl>
   or: git remote set-url --delete <name> <url>

    -v, --verbose         be verbose; must be placed before a subcommand


mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (master)
$ git remote

mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (master)
$ git remote add master git remote add github git://github.com/jdoe/coolapp.git
usage: git remote add [<options>] <name> <url>

    -f, --fetch           fetch the remote branches
    --tags                import all tags and associated objects when fetching
                          or do not fetch any tag at all (--no-tags)
    -t, --track <branch>  branch(es) to track
    -m, --master <branch>
                          master branch
    --mirror[=(push|fetch)]
                          set up remote as a mirror to push to or fetch from


mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (master)
$ git remove master git remote add github g^C://github.com/jdoe/coolapp.git



mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (master)
$ git remote master https://github.com/Mousumi927/API-For-Banking-Transactions.git
error: unknown subcommand: `master'
usage: git remote [-v | --verbose]
   or: git remote add [-t <branch>] [-m <master>] [-f] [--tags | --no-tags] [--mirror=<fetch|push>] <name> <url>
   or: git remote rename [--[no-]progress] <old> <new>
   or: git remote remove <name>
   or: git remote set-head <name> (-a | --auto | -d | --delete | <branch>)
   or: git remote [-v | --verbose] show [-n] <name>
   or: git remote prune [-n | --dry-run] <name>
   or: git remote [-v | --verbose] update [-p | --prune] [(<group> | <remote>)...]
   or: git remote set-branches [--add] <name> <branch>...
   or: git remote get-url [--push] [--all] <name>
   or: git remote set-url [--push] <name> <newurl> [<oldurl>]
   or: git remote set-url --add <name> <newurl>
   or: git remote set-url --delete <name> <url>

    -v, --verbose         be verbose; must be placed before a subcommand


mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (master)
$ git remote add master https://github.com/Mousumi927/API-For-Banking-Transactions.git

mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (master)
$ git pull
remote: Enumerating objects: 3, done.
remote: Counting objects: 100% (3/3), done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (3/3), 616 bytes | 77.00 KiB/s, done.
From https://github.com/Mousumi927/API-For-Banking-Transactions
 * [new branch]      main       -> master/main
There is no tracking information for the current branch.
Please specify which branch you want to merge with.
See git-pull(1) for details.

    git pull <remote> <branch>

If you wish to set tracking information for this branch you can do so with:

    git branch --set-upstream-to=master/<branch> master


mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (master)
$ git pull master
You asked to pull from the remote 'master', but did not specify
a branch. Because this is not the default configured remote
for your current branch, you must specify a branch on the command line.

mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (master)
$ git remote pull master main
error: unknown subcommand: `pull'
usage: git remote [-v | --verbose]
   or: git remote add [-t <branch>] [-m <master>] [-f] [--tags | --no-tags] [--mirror=<fetch|push>] <name> <url>
   or: git remote rename [--[no-]progress] <old> <new>
   or: git remote remove <name>
   or: git remote set-head <name> (-a | --auto | -d | --delete | <branch>)
   or: git remote [-v | --verbose] show [-n] <name>
   or: git remote prune [-n | --dry-run] <name>
   or: git remote [-v | --verbose] update [-p | --prune] [(<group> | <remote>)...]
   or: git remote set-branches [--add] <name> <branch>...
   or: git remote get-url [--push] [--all] <name>
   or: git remote set-url [--push] <name> <newurl> [<oldurl>]
   or: git remote set-url --add <name> <newurl>
   or: git remote set-url --delete <name> <url>

    -v, --verbose         be verbose; must be placed before a subcommand


mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (master)
$ git remote pull
error: unknown subcommand: `pull'
usage: git remote [-v | --verbose]
   or: git remote add [-t <branch>] [-m <master>] [-f] [--tags | --no-tags] [--mirror=<fetch|push>] <name> <url>
   or: git remote rename [--[no-]progress] <old> <new>
   or: git remote remove <name>
   or: git remote set-head <name> (-a | --auto | -d | --delete | <branch>)
   or: git remote [-v | --verbose] show [-n] <name>
   or: git remote prune [-n | --dry-run] <name>
   or: git remote [-v | --verbose] update [-p | --prune] [(<group> | <remote>)...]
   or: git remote set-branches [--add] <name> <branch>...
   or: git remote get-url [--push] [--all] <name>
   or: git remote set-url [--push] <name> <newurl> [<oldurl>]
   or: git remote set-url --add <name> <newurl>
   or: git remote set-url --delete <name> <url>

    -v, --verbose         be verbose; must be placed before a subcommand


mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (master)
$ git pull
There is no tracking information for the current branch.
Please specify which branch you want to merge with.
See git-pull(1) for details.

    git pull <remote> <branch>

If you wish to set tracking information for this branch you can do so with:

    git branch --set-upstream-to=master/<branch> master


mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (master)
$ git pull master main
From https://github.com/Mousumi927/API-For-Banking-Transactions
 * branch            main       -> FETCH_HEAD

mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (master)
$ git push
fatal: The current branch master has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream master master

To have this happen automatically for branches without a tracking
upstream, see 'push.autoSetupRemote' in 'git help config'.


mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (master)
$ git status
On branch master
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .gitignore
        customerData.js
        package-lock.json
        package.json
        roughcode.js
        routes/
        server.js

nothing added to commit but untracked files present (use "git add" to track)

mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (master)
$ git checkout -b main
Switched to a new branch 'main'

mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (main)
$ git push
fatal: The current branch main has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream master main

To have this happen automatically for branches without a tracking
upstream, see 'push.autoSetupRemote' in 'git help config'.


mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (main)
$     git push --set-upstream master main
Everything up-to-date
branch 'main' set up to track 'master/main'.

mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (main)
$ touch .gitignore

mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (main)
$ git add .
warning: in the working copy of 'package-lock.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'package.json', LF will be replaced by CRLF the next time Git touches it

mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (main)
$ git commit -am "first"
[main 9472558] first
 8 files changed, 909 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 customerData.js
 create mode 100644 package-lock.json
 create mode 100644 package.json
 create mode 100644 roughcode.js
 create mode 100644 routes/card.js
 create mode 100644 routes/transaction.js
 create mode 100644 server.js

mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (main)
$ git status
On branch main
Your branch is ahead of 'master/main' by 1 commit.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean

mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (main)
$ git push
Enumerating objects: 12, done.
Counting objects: 100% (12/12), done.
Delta compression using up to 4 threads
Compressing objects: 100% (10/10), done.
Writing objects: 100% (11/11), 9.31 KiB | 1.86 MiB/s, done.
Total 11 (delta 1), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (1/1), done.
To https://github.com/Mousumi927/API-For-Banking-Transactions.git
   193e49d..9472558  main -> main

mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (main)
$ git checkout -b mongoose
Switched to a new branch 'mongoose'

mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (mongoose)
$ git status
On branch mongoose
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   README.md

no changes added to commit (use "git add" and/or "git commit -a")

mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (mongoose)
$ git checkout main
Switched to branch 'main'
M       README.md
Your branch is up to date with 'master/main'.

mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (main)
$ git checkout mongoose
Switched to branch 'mongoose'
M       README.md

mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (mongoose)
$ git commit -am "first mongoose"
[mongoose fb357ea] first mongoose
 1 file changed, 3 insertions(+), 1 deletion(-)

mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (mongoose)
$ git main
git: 'main' is not a git command. See 'git --help'.

The most similar command is
        mailinfo

mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (mongoose)
$ git checkout main
Switched to branch 'main'
Your branch is up to date with 'master/main'.

mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (main)
$ git checkout .
Updated 1 path from the index

mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (main)
$ git checkout mongoose
Switched to branch 'mongoose'

mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (mongoose)
$ git checkout main
Switched to branch 'main'
Your branch is up to date with 'master/main'.

mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (main)
$ git checkout mongoose
Switched to branch 'mongoose'

mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (mongoose)
$ git push
fatal: The current branch mongoose has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream master mongoose

To have this happen automatically for branches without a tracking
upstream, see 'push.autoSetupRemote' in 'git help config'.


mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (mongoose)
$     git push --set-upstream master mongoose
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 4 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 303 bytes | 303.00 KiB/s, done.
Total 3 (delta 1), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (1/1), completed with 1 local object.
To https://github.com/Mousumi927/API-For-Banking-Transactions.git
 * [new branch]      mongoose -> mongoose
branch 'mongoose' set up to track 'master/mongoose'.

mousumi@DESKTOP-EM9BHBU MINGW64 /d/InceptionU/firstProject-Banking (mongoose)
$

