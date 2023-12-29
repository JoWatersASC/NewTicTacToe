
class ParentComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            children: [],
            colors: [],
        };
        this.changeChildsColor = this.changeChildsColor.bind(this);

    }
    componentDidMount() {
        this.setState( { children: 
            [
                {
                    id: 1,
                    title: 'child #1',
                    color: 1
                },
                {
                    id: 2,
                    title: 'child #2',
                    color: 2
                },
        ]})
        this.setState( {
            colors: [
                'red',
                'blue',
                'purple',
                'green',
            ]

        })
    }
    changeChildsColor(name){
        console.log('changing color for:');
        console.log(name)
        const nextChildren = this.state.children.map((child) => {
            if (child.title === name) {
                let newColor = (child.color+1)%4
                console.log(newColor)
                console.log(this.state.colors[newColor])
              return Object.assign({}, child, {
                color: newColor,
              });
            } else {
              return child;
            }
          });
          this.setState( {children: nextChildren });
    }
    render(){
        const childComponents = this.state.children.map((child) => (
            <ChildComponent
              key={'key-' + child.id}
              id={child.id}
              title={child.title}
              onButton={this.changeChildsColor}
              color={this.state.colors[child.color]}
            />
          ));
        return (
            <div className='ui unstackable items'>
                {childComponents}
            </div>
            
        );
    }
}

class ChildComponent extends React.Component {

    constructor(props) {
        super(props);
    
        this.handleButtonClick = this.handleButtonClick.bind(this);
      }
    handleButtonClick() {
        this.props.onButton(this.props.title);
    }
    render() {
        return (
            <div className='ui centered card'>
                <div 
                    className='field' 
                    style={{ backgroundColor: this.props.color }}>
                    <label>{this.props.title}</label>
                </div>
                
                <button 
                    className='ui basic blue button'
                    onClick={this.handleButtonClick}
                >
                    Submit
                </button>
            </div>
        );
    }
}

ReactDOM.render(
    <ParentComponent />,
    document.getElementById("content")
);