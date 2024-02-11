import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import "../App.css";
import { Board, Items } from "./Dashboard";
type DashboardCardProps = {
  items: Items[];
  board: Board;
  dragOverHandler: (e: React.DragEvent<HTMLDivElement>) => void;
  dragLeaveHandler: (e: React.DragEvent<HTMLDivElement>) => void;
  dragStartHandler: (
    e: React.DragEvent<HTMLDivElement>,
    board: Board,
    item: Items
  ) => void;
  dragEndHandler: (e: React.DragEvent<HTMLDivElement>) => void;
  isFilter: Boolean;
};

function DashboardCard({
  items,
  board,
  dragOverHandler,
  dragLeaveHandler,
  dragStartHandler,
  dragEndHandler,
  isFilter,
}: DashboardCardProps) {
  const navigate = useNavigate();
  const newArr = [...items];

  if (isFilter) {
    newArr.sort((a: any, b: any) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }

  return (
    <Fragment>
      {newArr?.map((item: any) => (
        <div
          key={item.id}
          className="item lex flex-col max-w-80 m-4 bg-white border-1 border border-indigo-600 rounded-md cursor-pointer"
          onDragOver={(e) => dragOverHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragStart={(e) => dragStartHandler(e, board, item)}
          onDragEnd={(e) => dragEndHandler(e)}
          draggable={true}
          onClick={() => {
            navigate(`card/${item.id}`);
          }}
        >
          <p>{item.title}</p>
          <div className="item-content flex flex-row justify-between mt-2">
            <div className="item-content__priority flex flex-row items-center mx-1">
              <img src={item.priorityIcon} alt="" className="w-5 max-h-8" />
              <span className="item-content__point ">{item.point}</span>
            </div>

            <img
              className="item-content__use w-8 max-h-8 mx-1 mb-2"
              src={item.imgUser}
              alt=""
            />
          </div>
        </div>
      ))}
    </Fragment>
  );
}

export default DashboardCard;
{
  /* <Fragment>
      {newArr?.map((item: any) => (
        <div
          key={item.id}
          className="flex flex-col max-w-80 m-4 bg-white border-1 border border-indigo-600 rounded-md"
          onDragOver={(e) => dragOverHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragStart={(e) => dragStartHandler(e, board, item)}
          onDragEnd={(e) => dragEndHandler(e)}
          draggable={true}
          onClick={() => {
            navigate(`card/${item.id}`);
          }}
        >
          <p> {item.title}</p>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row">
              <img src={item.priorityIcon} alt="" className="w-10" />
              <span className="item-content__point">{item.point}</span>
            </div>

            <img className="w-10" src={item.imgUser} alt="" />
          </div>
        </div>
      ))}
    </Fragment> */
}
