import React from "react";
import Board from "../board/board.jsx";
import "../board_container/board.style.css";
class BoardContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="board-container">
        <div className="color-picker-container">
          <input type="color" />
        </div>

        <div className="board-container-inline">
          <Board></Board>
        </div>
      </div>
    );
  }
}
export default BoardContainer;
