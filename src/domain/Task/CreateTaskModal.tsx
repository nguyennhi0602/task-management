import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Task } from "./Task";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { MenuItem, Select } from "@mui/material";
import { categories } from "../../db.json";
import moment from "moment";

export type CreateTaskModalProps = {
  taskDetail: Task | undefined;
  selectedCategory: number | undefined;
  open: boolean;
  onClose: () => void;
  onSubmitForm: (data: any) => void;
};

export const CreateTaskModal = (props: CreateTaskModalProps) => {
  const { taskDetail, selectedCategory, open, onClose, onSubmitForm } = props;
  const initialData = {
    name: "",
    description: "",
    assignee: "",
    deadlineAt: new Date().toDateString(),
    category: 0,
  };
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    if (!!taskDetail && taskDetail.id !== 0) {
      setFormData({ ...taskDetail });
    }
  }, [taskDetail]);

  const initialError = {
    name: "",
    description: "",
    assignee: "",
    deadlineAt: "",
  };
  const [formErrors, setFormErrors] = useState(initialError);

  const validateForm = () => {
    let errors = initialError;
    if (!formData.name) {
      errors.name = "Name is required";
    }
    if (!formData.description) {
      errors.description = "Description is required";
    }
    if (!formData.assignee) {
      errors.assignee = "Assignee is required";
    }
    if (!formData.deadlineAt) {
      errors.deadlineAt = "Deadline is required";
    }

    return errors;
  };

  const handleSubmit = () => {
    const errors = validateForm();

    if (Object.keys(errors).filter((error) => error === "").length === 0) {
      onSubmitForm(formData);
      setFormData(initialData);
    } else {
      setFormErrors(errors);
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    console.log("value");
    console.log(event.target);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeDeadline = (newDate: Dayjs | null) => {
    setFormData({
      ...formData,
      deadlineAt: newDate ? newDate.format("YYYY-MM-DD") : "",
    });
  };

  const handleClose = () => {
    setFormData(initialData);
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} color="#1976d2">
        New Task
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1, width: "33ch" } }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              id="outlined-required"
              label="Task Name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              name="name"
            />
            <TextField
              required
              id="outlined-disabled"
              label="Description"
              placeholder="Description"
              style={{
                width: "530px",
              }}
              value={formData.description}
              onChange={handleChange}
              name="description"
            />
            <TextField
              required
              id="outlined-password-input"
              label="Assignee"
              value={formData.assignee}
              onChange={handleChange}
              name="assignee"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                label="Deadline"
                format="DD-MM-YYYY"
                value={dayjs(formData.deadlineAt)}
                onChange={handleChangeDeadline}
                name="deadlineAt"
              />
            </LocalizationProvider>
            <Select
              id="demo-simple-select"
              value={selectedCategory ? selectedCategory : formData.category}
              onChange={handleChange}
              sx={{ marginLeft: "10px", width: "530px" }}
              label="Select an Option"
              name="category"
              disabled={selectedCategory ? true : false}
            >
              {categories.map((category) => (
                <MenuItem value={category.id}>{category.name}</MenuItem>
              ))}
            </Select>
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
