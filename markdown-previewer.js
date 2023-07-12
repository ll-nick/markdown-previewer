const App = styled.div`
    width: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    background-color: #462255;
    display: flex;
    flex-wrap: wrap;
`

const Wrapper = styled.div`
    background-color: #DDFFF7;
    height: 100%;
    margin: 2% 2%;
    border-radius: 1rem;
    flex: 1 1 0;
    min-width: 400px;
    transition: width 1s;
`

const TitleBar = styled.div`
    padding: 1vh 2vw;
    background-color: #FFA69E;
    border-radius: 1rem 1rem 0 0;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const Title = styled.h2`
    display: inline-block;
`

const MaximizeButton = styled.button`
    border-radius: 0.5rem;
    background-color: #DDFFF7;
    border: none;
    font-size: 1.5rem;
`

const Text = styled.div`
    width: 100%;
    background-color: #DDFFF7;
    border: none;
    padding: 2%;
    text-align: left;
    border-radius: 1rem;
    margin: 0;
`

const TextArea = styled.textarea`
    width: 100%;
    height: 100vh;
    background-color: #DDFFF7;
    border: none;
    margin: 0 0 20px 0;
    padding: 2%;
`

function MaximizeButtonComponent(props) {
    let icon = props.maximized ? "fa fa-compress" : "fa fa-arrows-alt"
    return (
        <MaximizeButton onClick={props.onClick}><i className={icon}></i></MaximizeButton>
    )
}

function TitleComponent(props) {
    return (
        <TitleBar>
            <span>
                <Title><i className="fa fa-fire"></i> {props.title}</Title>
            </span>
            <span>
                <MaximizeButtonComponent maximized={props.maximized} onClick={props.onClick} />
            </span>
        </TitleBar>
    );
}

class MarkdownEditor extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        store.dispatch(updateContent(event.target.value))

    }

    textAreaAdjust(element) {
        element.style.height = "1px";
        element.style.height = (25 + element.scrollHeight) + "px";
    }

    render() {
        let wrapperStyle = this.props.hidden ? { display: 'none' } : {}
        return (
            <Wrapper style={wrapperStyle} className="editor-wrapper">
                <TitleComponent title="Markdown Editor" maximized={this.props.maximized} onClick={this.props.toggleMaximize} />
                <TextArea
                    id="editor"
                    value={this.props.content}
                    onChange={this.handleChange}
                />
            </Wrapper>
        );
    }
}

class MarkdownPreviewer extends React.Component {
    constructor(props) {
        super(props)
        this.parseMarkdown = this.parseMarkdown.bind(this)
    }

    parseMarkdown() {
        const options = {
            breaks: true,
            mangle: false,
            headerIds: false
        };

        return { __html: marked.parse(this.props.content, options) };
    }

    render() {
        let parsedHTML = this.parseMarkdown()
        let wrapperStyle = this.props.hidden ? { display: 'none' } : {}
        return (
            <Wrapper style={wrapperStyle} className="previewer-wrapper">
                <TitleComponent title="Markdown Previewer" maximized={this.props.maximized} onClick={this.props.toggleMaximize} />
                <Text id="preview" dangerouslySetInnerHTML={parsedHTML}></Text>
            </Wrapper>
        );
    }
}

// React Redux

const editorMapStateToProps = (state) => {
    return {
        content: state.content,
        maximized: state.maximized == 'editor' ? true : false,
        hidden: state.maximized == 'previewer' ? true : false
    }
};

const previewerMapStateToProps = (state) => {
    return {
        content: state.content,
        maximized: state.maximized == 'previewer' ? true : false,
        hidden: state.maximized == 'editor' ? true : false
    }
};

const editorMapDispatchToProps = (dispatch) => {
    return {
        updateContent: (content) => {
            dispatch(updateContent(content))
        },
        toggleMaximize: () => {
            dispatch(toggleEditorMaximize())
        }
    }
};

const previewerMapDispatchToProps = (dispatch) => {
    return {
        toggleMaximize: () => {
            dispatch(togglePreviewerMaximize())
        }
    }
};

const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;
const MarkdownEditorContainer = connect(editorMapStateToProps, editorMapDispatchToProps)(MarkdownEditor);
const MarkdownPreviewerContainer = connect(previewerMapStateToProps, previewerMapDispatchToProps)(MarkdownPreviewer);

class AppWrapper extends React.Component {
    render() {
        return (
            <App>
                <Provider store={store}>
                    <MarkdownEditorContainer />
                    <MarkdownPreviewerContainer />
                </Provider>
            </App>
        );
    }
};

const container = document.getElementById('app-wrapper');
const root = ReactDOM.createRoot(container);
root.render(<AppWrapper />);