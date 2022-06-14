# Todo-List

Todo-List is an web application where user can create and remove things to do and add tags for each todo. Tags can be removed by simply clicking on. It has three status available, upcoming, in progress, and done. Depending on the status of todo, user can change the status by clicking on upcoming, in progress, done buttons.

### Preview

![](https://github.com/cyss0317/Todo-list/blob/main/frontend/src/img/Todo-list%20demo.gif)

## Instruction

1. Go to config folder and follow the instructions in keys_example.js in config
2. run `npm install` in root folder
3. run `cd Frontend` and run `npm install`
4. run `cd ..` will direct you to the root folder, and run `npm run dev`

### In case, if it doesn't work

1. Delete node_modules and package.json.package in root folder AND Frontend folder.
2. Repeat the instruction.

### `npm run dev` run this command in the main root folder.

Runs the app in the development mode.\
 [http://localhost:5000](http://localhost:5000) to request to the backend.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### How to use

Create: You can add a New Todo by clicking "+Add {status} todo", depending on which {status} todo you click on, you're able to create a new todo and add it to the corresponding column.

Delete: Clicking on "X" button will remove todo.

Add Tags: You can add tags on each todo by type into "Add Tags to this" and press "enter" key.

Change Due Date: Click on the todo's due date and change, and submit to save the change.

Remove Tag: Clicking on each tag will remove the tag.

Change status of todo: In "Move to:" in each todo, you could change the status of todo by clicking on buttons.
