import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  Typography,
  Button,
  Grid,
  useMediaQuery,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
export default function Home() {
  const theme = useTheme();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [profile, setProfile] = useState("");
  const [sess, setSess] = useState({});
  const open = Boolean(anchorEl);
  useEffect(() => {
    initState();
  }, []);
  const initState = async () => {
    const mysession = await getSession();
    console.log(mysession);
    setProfile(mysession.user.image);
    setSess({ ...mysession });
    console.log(sess);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "24px",
          paddingBottom: "24px",
        }}
      >
        <Typography fontWeight={"bold"} variant="h6">
          PESEvents
        </Typography>
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <Avatar src={`${profile}`}></Avatar>
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
          <MenuItem onClick={() => {}}>Profile</MenuItem>
          <MenuItem onClick={() => {}}>My account</MenuItem>
          <MenuItem
            onClick={async () => {
              await signOut();
              router.push("/");
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </div>

      <Grid container>
        <Grid
          item
          md={6}
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "720px",
          }}
        >
          <Avatar src={`${profile}`} sx={{ width: 400, height: 400 }}></Avatar>
        </Grid>
        <Grid item md={6} xs={12}>
          <div
            style={
              useMediaQuery(theme.breakpoints.up("md"))
                ? {
                    display: "flex",
                    flexDirection: "column",
                    height: "720px",
                    justifyContent: "center",
                  }
                : {
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "48px",
                  }
            }
          >
            <Typography fontWeight={"bold"} variant="h3">
              {sess.user == undefined ? "" : sess.user.name}
            </Typography>
            <Typography
              style={{ marginBottom: "24px", marginTop: "24px" }}
              color="#78909c"
            >
              {sess.user == undefined ? "" : "Email: " + sess.user.email}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
