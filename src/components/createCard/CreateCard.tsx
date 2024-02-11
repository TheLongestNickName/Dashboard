import React, { FC, useState } from "react";

import { useMutation } from "@apollo/client";
import { CREATE_CARD } from "../../apollo/dashboard";
import Select, { SingleValue, components } from "react-select";
import "./CreateCard.css";
import { useNavigate } from "react-router-dom";

enum Boards {
  ToDo = 1,
  InProgress = 2,
  Done = 3,
}

const CreateCard: FC = () => {
  const [discription, setDiscription] = useState<string | number | undefined>();
  const [point, setPoint] = useState<
    string | number | readonly string[] | undefined
  >();
  const [avatarImg, setAvatarImg] = useState<string | number | undefined>();
  const [boardId, setBoardId] = useState<string | number | undefined>();
  const [priorityIcon, setPriorityIcon] = useState<
    string | number | undefined
  >();
  const [createCard] = useMutation(CREATE_CARD, {
    update(cashe) {
      cashe.modify({
        fields: {
          allDashbords() {},
        },
      });
    },
  });
  const navigate = useNavigate();
  const isReady = !!(
    discription &&
    point &&
    avatarImg &&
    boardId &&
    priorityIcon
  );
  const options = [
    {
      value: "",
      label: "Select priority",
    },
    {
      value: "Major",
      label: "Major",
      icon: "https://raw.githubusercontent.com/cglynne/jira-priority-icons/dc505157ab8cdac2adad074ef054da783f9fee70/jira_priority/major.svg",
    },
    {
      value: "Lowest",
      label: "Lowest",
      icon: "https://raw.githubusercontent.com/cglynne/jira-priority-icons/dc505157ab8cdac2adad074ef054da783f9fee70/jira_priority/lowest.svg",
    },
    {
      value: "Highest",
      label: "Highest",
      icon: "https://raw.githubusercontent.com/cglynne/jira-priority-icons/dc505157ab8cdac2adad074ef054da783f9fee70/jira_priority/highest.svg",
    },
    {
      value: "Critical",
      label: "Critical",
      icon: "https://raw.githubusercontent.com/cglynne/jira-priority-icons/dc505157ab8cdac2adad074ef054da783f9fee70/jira_priority/critical.svg",
    },
  ];

  const optionBoard = [
    {
      value: "",
      label: "Select dashboard",
    },
    {
      value: Boards.ToDo.toString(),
      label: "To Do",
    },
    {
      value: Boards.InProgress.toString(),
      label: "In Progress",
    },
    {
      value: Boards.Done.toString(),
      label: "Done",
    },
  ];

  const { Option } = components;

  const IconOption = (props: any) => (
    <Option {...props}>
      {props.data.icon && (
        <img
          src={props.data.icon}
          style={{ width: 12 }}
          alt={props.data.label}
        />
      )}
      {props.data.label}
    </Option>
  );

  const DashBoards = (props: any) => (
    <Option {...props}>{props.data.label}</Option>
  );
  const isFormReady =
    discription && avatarImg && priorityIcon && point && boardId;
  return (
    <>
      <form
        action="/"
        onSubmit={(e) => {
          if (!isFormReady) {
            return;
          }
          createCard({
            variables: {
              title: discription,
              imgUser: avatarImg,
              ImgPriority: priorityIcon,
              point: +point,
              dashboardId: boardId,
              date: new Date(),
            },
          });
        }}
      >
        <div className="create-card">
          <div className="create-card__discription">
            <span>Enter discriptions</span>
            <textarea
              required
              name="createTitle"
              id="createTitle"
              value={discription}
              onChange={(e) => {
                setDiscription(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="create-card__point">
            <input
              required
              type="number"
              name="createPoint"
              id="createPoint"
              placeholder="Enter points for ticket"
              value={point}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPoint(e.target.value);
              }}
            ></input>
          </div>
          <div className="create-card__avatar">
            <input
              required
              type="text"
              name="createAvatarimg"
              id="createAvatarimg"
              placeholder="Enter your avatar image path"
              value={avatarImg}
              onChange={(e) => {
                setAvatarImg(e.target.value);
              }}
            ></input>
          </div>
          <div className="create-card__dashboard">
            <Select
              defaultValue={optionBoard[0]}
              options={optionBoard}
              components={{ Option: DashBoards }}
              classNamePrefix="create-card"
              onChange={(e: SingleValue<{ value: string; label: string }>) => {
                setBoardId(e?.value);
              }}
            />
          </div>
          <div className="create-card__priority">
            <Select
              defaultValue={options[0]}
              options={options}
              components={{ Option: IconOption }}
              classNamePrefix="create-card"
              onChange={(
                e: SingleValue<{ value: string; label: string; icon?: string }>
              ) => {
                setPriorityIcon(e?.icon);
              }}
            />
          </div>

          <div className="create-card__submit">
            <button type="submit" disabled={!isReady}>
              Create card
            </button>
            <button
              type="button"
              onClick={() => {
                navigate(-1);
              }}
            >
              Go back
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateCard;
