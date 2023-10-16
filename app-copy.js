class Game extends React.Component{
    state = {
        player : {},
        winner : "",
        gameOver : false,
        newGame : false,
    }

    componentDidMount(){
        this.setState({
            player :
                {
                    key : "Player 1",
                    token : 'X',
                },
            gameOver : false,
            newGame : false,
        });
    }

    switchPlayer = () => {
        let newPlayer
        if(this.state.player.key == "Player 1"){
            newPlayer = {
                key: "Player 2",
                token : "O",
            }
        }else{
            newPlayer = {
            key: "Player 1",
            token : "X",
            }
        }

        this.setState({
            player : newPlayer,
        });
    }

    checkWin = (board) => {
        const b0 = board[0];
        const b1 = board[1];
        const b2 = board[2];
        const b3 = board[3];
        const b4 = board[4];
        const b5 = board[5];
        const b6 = board[6];
        const b7 = board[7];
        const b8 = board[8];

        if(
            (b0 == b1 && b1 == b2 && b2 != " ") ||
            (b3 == b4 && b3 == b5 && b3 != " ") ||
            (b6 == b7 && b6 == b8 && b6 != " ") ||
            (b0 == b3 && b0 == b6 && b0 != " ") ||
            (b1 == b4 && b1 == b7 && b1 != " ") ||
            (b2 == b5 && b2 == b8 && b2 != " ") ||
            (b0 == b4 && b0 == b8 && b0 != " ") ||
            (b2 == b4 && b2 == b6 && b2 != " ")
        )
        {
            console.log("won");
            this.state.gameOver = true;
            this.setState({
                winner : (this.state.player.key === "Player 1") ? "Player 2" : "Player 1"
            });
            return true;
        }
        else if(b0 != ' ' && b1 != ' ' && b2 != ' ' && b3 != ' ' && b4 != ' ' && b5 != ' ' && b6 != ' ' && b7 != ' ' && b8 != ' ')
        {
            console.log("draw");
            this.state.gameOver = true;
            this.setState({
                winner : "Draw"
            });
            return true;
        }
        else
        {
            this.switchPlayer();
        }
    }

    clearBoard = (board) => {
        console.log("clear");
        const newTokens = [
            {id : 1, token : ' '},
            {id : 2, token : ' '},
            {id : 3, token : ' '},
            {id : 4, token : ' '},
            {id : 5, token : ' '},
            {id : 6, token : ' '},
            {id : 7, token : ' '},
            {id : 8, token : ' '},
            {id : 9, token : ' '},
        ];

        board.setState({
            spaces : newTokens
        });
        this.state.winner = "";
        this.state.newGame = false;
        this.state.gameOver = false;
    }

    handleSpaceClick = (spaceKey, spaces, grid) => { 
        const spaceTokens = spaces.map((space) => {
            return space.token;
        });
        
        this.checkWin(spaceTokens);

        if(this.state.gameOver){
            return;
        }
        const nextSpaces = spaces.map((space) => {
            if(space.id == spaceKey && space.token == " " ){
                return Object.assign({}, space, {
                    token : this.state.player.token,
                });
            }else{
                return space;
            }
        });

        grid.setState({
            spaces : nextSpaces,
        });
    }

    render(){
        return(
            <div className="game">
                <Board
                    key={"board 1"}
                    checkWin={this.checkWin}
                    player={this.state.player}
                    clear={this.clearBoard}
                    gameOver={this.state.gameOver}
                    // newGame={this.state.newGame}
                    // getGame={this.getGame}
                    spaceClicked={this.handleSpaceClick}
                />
                <p style={{display: "flex", alignItems: "center", justifyContent: "center"}}>Winner: {this.state.winner}</p>
            </div>
        );
    }
}

class Board extends React.Component {
    state = {
        spaces: [],
    }

    // getGameOver = () => {
    //     return this.props.getGame();
    // }
    // winCheck = () => {
    //     this.props.checkWin(this.state.spaces);
    // }

    clearBoard = () => {
        this.props.clear(this);
    }

    componentDidMount(){
        this.setState({
            spaces : [
                {
                    id: 1,
                    token: " ",
                },
                {
                    id: 2,
                    token: " ",
                },
                {
                    id: 3,
                    token: " ",
                },
                {
                    id: 4,
                    token: " ",
                },
                {
                    id: 5,
                    token: " ",
                },
                {
                    id: 6,
                    token: " ",
                },
                {
                    id: 7,
                    token: " ",
                },
                {
                    id: 8,
                    token: " ",
                },
                {
                    id: 9,
                    token: " ",
                },
            ],
        });
    }

    handleOnClick = (spaceKey) => {
        this.props.spaceClicked(spaceKey, this.state.spaces, this);
    }

    render(){
        if(this.props.newGame){
            this.clearBoard();
        }
        
        const spaceList = this.state.spaces.map((item) => (
            <Square
                key={'Item-'+ item.id}
                id={item.id}
                token={item.token}
                onClick={this.handleOnClick}
            />
        ));

        const firstRow = [spaceList[0], spaceList[1], spaceList[2]];
        const secondRow = [spaceList[3], spaceList[4], spaceList[5]];
        const thirdRow = [spaceList[6], spaceList[7], spaceList[8]];

        return (
            <div>
                <div style={{display: 'flex', alignItems : "center", justifyContent: 'center'}}>
                    <table style={{height: "25vw", width: "25vw"}}>
                        <tbody>
                            <tr>{firstRow}</tr>
                            <tr>{secondRow}</tr>
                            <tr>{thirdRow}</tr>
                        </tbody>
                    </table>
                </div>
                    
                    <Newgamebutton
                        key={2}
                        newGameClick={this.clearBoard}
                    />
            </div>            
        );
    }
}

class Square extends React.Component {
    handleClick = () => {
        this.props.onClick(this.props.id);
    }

    render() {
        return (
            <td
                style={{width: "33.33%", height: "33.33%", textAlign: "center"}}
                onMouseUp={this.handleClick}
            >
                {this.props.token}
            </td>
        );
    }
}

class Newgamebutton extends React.Component{
    handleClick = () => {
        this.props.newGameClick();
    }

    render(){
        return(
            <div className='ui centered card'>
                <button 
                    className='ui basic blue button'
                    onClick={this.handleClick}
                >
                    New Game
                </button>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById("content")
);