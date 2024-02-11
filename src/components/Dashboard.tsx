import React, { useEffect, useState } from "react";

import "../App.css";
import DashboardCard from "./DashboardCard";
import { useMutation, useQuery } from "@apollo/client";
import { GET_DASHBOARDS, UPDATE_DASHBOARD } from "../apollo/dashboard";
import { Link } from "react-router-dom";

export type Items = {
  id: Number;
  title: String;
  imgUser: String;
  priorityIcon: String;
  point: Number;
  date: Date;
};

export type Board = {
  id: Number;
  Items: Items[];
  title: String;
};

function Dashboard() {
  const { data } = useQuery(GET_DASHBOARDS);

  const [updateBoard] = useMutation(UPDATE_DASHBOARD, {
    update(cashe) {
      cashe.modify({
        fields: {
          allDashbords() {},
        },
      });
    },
  });

  const [boards, setBoards] = useState<Board[] | undefined>();
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);
  const [currentItem, setCurrentItem] = useState<Items | null>(null);
  const [isFilter, setIsFilter] = useState(false);

  useEffect(() => {
    data?.allDashbords && setBoards(data.allDashbords);
  }, [data]);

  function dragOverHandler(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();

    if ((e.target as HTMLElement).className == "item") {
      (e.target as HTMLElement).style.boxShadow = `0 2px 3px gray`;
    }
  }

  function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>): void {
    (e.target as HTMLElement).style.boxShadow = `none`;
  }

  function dragStartHandler(
    e: React.DragEvent<HTMLDivElement>,
    board: Board,
    item: Items
  ): void {
    setCurrentBoard(board);
    setCurrentItem(item);
  }

  function dragEndHandler(e: React.DragEvent<HTMLDivElement>): void {
    (e.target as HTMLElement).style.boxShadow = `none`;
  }

  function dropCardHandler(e: React.DragEvent<HTMLDivElement>, board: Board) {
    if (currentItem && currentBoard) {
      updateBoard({
        variables: {
          id: currentItem.id,
          newId: board.id,
        },
      });
    }
  }

  return (
    <>
      <div className="flex justify-evenly  align-middle">
        <div>
          <label htmlFor="" className="bg-blue-100">
            Sort by date
          </label>
          <input
            className="mx-2 "
            type="checkbox"
            checked={isFilter}
            onChange={(e) => {
              setIsFilter(!isFilter);
            }}
          />
        </div>
        <div className="bg-blue-100">
          <Link to={"/createCard"}>Create new card</Link>
        </div>
      </div>
      <div className="flex justify-center">
        {boards &&
          boards.map((board: Board) => (
            <div
              className="board-wrap bg-gray-200 flex flex-col m-2 w-80"
              key={board.id as number}
              onDragOver={(e) => dragOverHandler(e)}
              onDrop={(e) => dropCardHandler(e, board)}
            >
              <div className="flex flex-col bg-blue-100 text-2xl">
                {board.title}
              </div>
              <DashboardCard
                items={board.Items}
                dragOverHandler={dragOverHandler}
                dragLeaveHandler={dragLeaveHandler}
                dragStartHandler={dragStartHandler}
                dragEndHandler={dragEndHandler}
                board={board}
                isFilter={isFilter}
              />
            </div>
          ))}
      </div>
    </>
  );
}

export default Dashboard;
