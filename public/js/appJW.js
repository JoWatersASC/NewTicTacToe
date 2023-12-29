class ParentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                "Item 1",
                "Item 2",
                "Item 3"
            ]
        };
    }

    render() {
        return (
            <div className='ui unstackable items'>
                {this.state.items.map((item, index) => (
                    <ChildComponent
                        key={index}
                        content={item}
                    />
                ))}
            </div>
        );
    }
}

class ChildComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGreen: false
        };
    }

    toggleColor = () => {
        var curColor= !this.state.isGreen;
        this.setState({
            isGreen: curColor,
        });
    };

    render() {
        const cardClass = this.state.isGreen ? 'ui centered green card' : 'ui centered card';

        return (
            <div className={cardClass}>
                <div className='field'>
                    <label>{this.props.content}</label>
                </div>
                <button
                    className='ui basic blue button'
                    onClick={this.toggleColor}
                >
                    Submit!
                </button>
            </div>
        );
    }
}

ReactDOM.render(
    <ParentComponent />,
    document.getElementById("content")
);