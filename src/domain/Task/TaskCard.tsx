import styled from "styled-components";
import { Avatar, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Task } from "./Task";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";

export type TaskCardProp = {
  taskDetail: Task;
  onAction: (action: string) => void;
  onClick?: () => void;
};

export const TaskCard = (props: TaskCardProp) => {
  const { taskDetail, onClick, onAction } = props;

  const stringToColor = (string: string): string => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 70%, 80%)`;
    return color;
  };

  const getInitials = (name: string) => {
    const words = name.split(" ");
    return words
      .map((word) => word[0]?.toUpperCase())
      .join("")
      .slice(0, 2);
  };

  const isExpired = (date: string) => {
    return new Date(date).getTime() < new Date().getTime();
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const onUpdateTask = (e: React.MouseEvent) => {
    onAction("update");
    handleClose(e);
  };

  const onDeleteTask = (e: React.MouseEvent) => {
    onAction("delete");
    handleClose(e);
  };

  return (
    <Wrapper onClick={onClick}>
      <Header>
        <Title>{taskDetail.name}</Title>
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={onUpdateTask}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Update</ListItemText>
          </MenuItem>
          <MenuItem onClick={onDeleteTask}>
            <ListItemIcon>
              <DeleteOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>
      </Header>
      <DetailsWrapper>
        <DeadlineWrapper $isExpired={isExpired(taskDetail.deadlineAt)}>
          {taskDetail.deadlineAt}
        </DeadlineWrapper>
        <Tooltip title={taskDetail.assignee} arrow>
          <Avatar
            sx={{
              bgcolor: stringToColor(taskDetail.assignee),
              color: "#fff",
              textTransform: "uppercase",
              width: 30,
              height: 30,
              fontSize: 30 * 0.4,
            }}
          >
            {getInitials(taskDetail.assignee)}
          </Avatar>
        </Tooltip>
      </DetailsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 8px;
  background-color: #fff;
  border-radius: 6px;
  gap: 2px;
  cursor: pointer;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h4`
  margin: 0;
`;

const DetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const DeadlineWrapper = styled.div<{ $isExpired?: boolean }>`
  max-width: 50%;
  padding: 2px;
  background-color: ${(p) => (p.$isExpired ? "#ffd2cc" : "#bee3be")};
  color: ${(p) => (p.$isExpired ? "#ae2a19" : "#044d15")};
  border-radius: 2px;
  display: flex;
  justify-content: center;
`;
