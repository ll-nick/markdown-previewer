const CONTENT = 'CONTENT'
const EDITOR_SIZE = 'EDITOR_SIZE'
const PREVIEWER_SIZE = 'PREVIEWER_SIZE'

const INITIAL_CONTENT = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`< div ></div> \`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
        return multiLineCode;
    }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`

const updateContent = (content) => {
    return {
        type: CONTENT,
        content: content
    }
}

const toggleEditorMaximize = () => {
    return {
        type: EDITOR_SIZE,
    }
}

const togglePreviewerMaximize = () => {
    return {
        type: PREVIEWER_SIZE,
    }
}

const contentReducer = (state = INITIAL_CONTENT, action) => {
    switch (action.type) {
        case CONTENT:
            return action.content;
        default:
            return state
    }
}

const sizeReducer = (state = 'none', action) => {
    switch (action.type) {
        case EDITOR_SIZE:
            return state == 'none' ?
                'editor' :
                'none'
        case PREVIEWER_SIZE:
            return state == 'none' ?
                'previewer' :
                'none'
        default:
            return state;
    }
}

const rootReducer = Redux.combineReducers({
    content: contentReducer,
    maximized: sizeReducer
});

const store = Redux.createStore(rootReducer);