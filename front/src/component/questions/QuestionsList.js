import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import {
  getAllQuestionList,
  getQuestionListWithLabel,
} from "../../api/question";
import { useDispatch, useSelector } from "react-redux";
import { SET_QUESTION_ID } from "../../redux/QuestionInfo";

export default function QuestionsList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.AccountInfo.accessToken);
  const [selectedLabel, setSelectedLabel] = useState("NONE");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [list, setList] = useState([]);
  const labels = ["OS", "JAVA", "DB", "NETWORK", "DATASTRUCTURE"];
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleLabelChange = (e) => {
    //axios
    console.log(e.target.value);
    if (e.target.value !== "NONE") {
      console.log("label api 호출");
      getQuestionListWithLabel(
        e.target.value,
        token,
        (res) => {
          console.log("getQuestionListWithLabel res.data: ", res.data);
          setList(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      console.log("allquestion api 호출");
      getAllQuestionList(
        token,
        (res) => {
          console.log("getAllQuestionList res.data: ", res.data);
          setList(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
    }
    setSelectedLabel(e.target.value);
  };
  const handleChangeRowsPerPage = (event) => {
    console.log("handle", event.target);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    getAllQuestionList(
      token,
      (res) => {
        console.log("getAllQuestionList res.data: ", res.data);
        setList(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  const [search, setSearch] = useState("");
  const onChange = (e) => {
    console.log("keyword changed..", e.target.value);
    setSearch(e.target.value);
  };
  const ClickTitle = (questionId) => {
    console.log("ClickTitle questionId: ", questionId);
    dispatch(SET_QUESTION_ID(questionId));
    navigate("/questionsdetail");
  };
  const clickQuestionCreate = () => {
    navigate("/questionrequest");
  };

  return (
    <div>
      <div style={{ marginTop: "3vh" }}>
        <Box sx={{ minWidth: 120, mb: 4 }}>
          <FormControl sx={{ mr: 10, width: "15%" }} focused>
            <InputLabel id="demo-simple-select-standard-label">
              라벨 선택
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedLabel}
              onChange={handleLabelChange}
              defaultValue={"NONE"}
              label="라벨 선택"
            >
              <MenuItem value={"NONE"}>
                <em>선택 안함</em>
              </MenuItem>
              {labels.map((label) => (
                <MenuItem value={label}>{label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            sx={{ ml: 10, width: "50%" }}
            focused
            color="info"
            placeholder="문제 검색하기"
            id="outlined-start-adornment"
            value={search}
            onChange={onChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />{" "}
        </Box>
      </div>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="right">Id</TableCell>
              <TableCell align="right">Label</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Solved</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map(({ questionId, label, questionTitle, solved }, i) => (
                <TableRow key={questionId}>
                  <TableCell component="th" scope="row">
                    {page * rowsPerPage + i + 1}
                  </TableCell>
                  <TableCell align="right">{questionId}</TableCell>
                  <TableCell align="right">
                    {label.map((l) => ({ l }))}
                  </TableCell>
                  <TableCell
                    align="right"
                    onClick={() => ClickTitle(questionId)}
                  >
                    {questionTitle}
                  </TableCell>
                  <TableCell align="right">{solved}</TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={list.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <Button
        size="small"
        variant="contained"
        style={{
          backgroundColor: "#64b5f6",
          float: "right",
          margin: "0vh 4vh 4vh 0vh",
        }}
        onClick={clickQuestionCreate}
      >
        문제 만들기
      </Button>
    </div>
  );
}
