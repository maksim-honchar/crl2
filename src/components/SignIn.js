import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { setNav } from "../redux/navSlice";
import { setViewNav } from "../redux/viewNavSlice";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const [userLogin, setUserLogin] = useState("");
  const [inputPass, setInputPass] = useState("");

  const users = useSelector((state) => state.users);
  const currentUser = users.find((user) => user.login === userLogin);

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = (event, newInputValue) => setUserLogin(newInputValue);
  const handlePass = (e) => setInputPass(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userLogin === "создать пользователя" && inputPass === "admin") {
      history.push("/dashboard/makeuser");
      dispatch(setNav(1));
    }

    if (userLogin !== "создать пользователя" && inputPass === "admin") {
      history.push(`/dashboard/currentUser/${currentUser.id}`);
      dispatch(setViewNav(false));
      setUserLogin("");
      setInputPass("");
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Вход в систему
          </Typography>
          <form className={classes.form}>
            <Autocomplete
              id="auto-output users"
              required
              // freeSolo
              onInputChange={handleLogin}
              options={users.map((user) => user.login)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Login"
                  variant="outlined"
                  required
                />
              )}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={inputPass}
              onChange={handlePass}
            />
            <Typography variant="body2" color="secondary">
              password: admin
            </Typography>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
              // disabled={!userLogin}
            >
              Войти
            </Button>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
