import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_CARD, GET_CARD, UPDATE_CARD } from "../apollo/dashboard";

export enum BoardsIdByCategory {
  ToDo = 1,
  InProgress = 2,
  Done = 3,
}

const ViewCard: FC = () => {
  const navigate = useNavigate();
  const { id: cardId } = useParams();

  const { data } = useQuery(GET_CARD, {
    variables: { id: cardId },
  });
  const [deleteCard] = useMutation(DELETE_CARD, {
    update(cashe) {
      cashe.modify({
        fields: {
          allDashbords() {},
        },
      });
    },
  });
  const [updateCard] = useMutation(UPDATE_CARD, {
    update(cashe) {
      cashe.modify({
        fields: {
          allDashbords() {},
        },
      });
    },
  });

  const [newTitle, setNewItem] = useState();
  const [newPoin, setNewpoint] = useState();
  const [newDashboard, setNewDashboard] = useState();

  useEffect(() => {
    if (data?.Item) {
      setNewpoint(data.Item.point);
      setNewItem(data.Item.title);
      setNewDashboard(data.Item.Dashbord.id);
    }
  }, [data?.Item]);

  const showSelected = (newDashboard: String | undefined, equals: Number) => {
    if (newDashboard) {
      return +newDashboard === equals;
    }
  };

  const isFormReady = cardId && newTitle && newPoin && newDashboard;
  return (
    <>
      <form
        action="/"
        onSubmit={(e) => {
          if (isFormReady) {
            updateCard({
              variables: {
                id: cardId,
                title: newTitle,
                point: +newPoin,
                dashboardId: newDashboard,
                date: new Date(),
              },
            });
          }
        }}
      >
        <div className="form-content flex flex-col justify-centerbg-white ">
          <div className="input-field flex justify-center">
            <textarea
              className="h-80 w-9/12 px-3  m-4 bg-gray-50 border-1 border rounded-xl border-indigo-600"
              name="title"
              id="title"
              value={
                newTitle as string | number | readonly string[] | undefined
              }
              onChange={(e) => {
                setNewItem(e.target.value as any);
              }}
            ></textarea>
          </div>
          <div className="flex flex-row justify-center m-5">
            <div className="input-point">
              <span className="mr-3">Enter point</span>
              <input
                className="border w-8"
                type="number"
                name="point"
                id="point"
                value={
                  newPoin as string | number | readonly string[] | undefined
                }
                onChange={(e) => {
                  setNewpoint(e.target.value as any);
                }}
              ></input>
            </div>
            <div className="input-board ml-5">
              <span className="mr-3">Change dashboard</span>
              <select
                className="bg-gray-50 border"
                onChange={(e: any) => {
                  setNewDashboard(e.target.value);
                }}
              >
                <option
                  value={BoardsIdByCategory.ToDo}
                  selected={showSelected(newDashboard, BoardsIdByCategory.ToDo)}
                >
                  To do
                </option>
                <option
                  value={BoardsIdByCategory.InProgress}
                  selected={showSelected(
                    newDashboard,
                    BoardsIdByCategory.InProgress
                  )}
                >
                  In Progress
                </option>
                <option
                  value={BoardsIdByCategory.Done}
                  selected={showSelected(newDashboard, BoardsIdByCategory.Done)}
                >
                  Done
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="btn-wrap flex justify-center">
          <button
            type="submit"
            className="btn btn-primary m-5 bg-green-100 rounded-xl min-w-36"
          >
            Edite and save
          </button>

          <button
            type="button"
            className="btn btn-red m-5 bg-red-100 border rounded-xl min-w-36"
            onClick={() => {
              deleteCard({
                variables: { id: cardId },
              });
              navigate("/");
            }}
          >
            Remove card
          </button>
        </div>
      </form>
    </>
  );
};

export default ViewCard;
