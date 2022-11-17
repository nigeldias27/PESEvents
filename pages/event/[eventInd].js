import {
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/router";
import { getSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { EventCard } from "../../components/eventCard";
import axios from "axios";

export default function EventPage() {
  const router = useRouter();
  const { eventInd } = router.query;
  const [anchorEl, setAnchorEl] = useState(null);
  const [profile, setProfile] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const open = Boolean(anchorEl);
  useEffect(() => {
    if (data == "") {
      setLoading(true);
    }
    initState();
  }, []);
  const initState = async () => {
    const mysession = await getSession();
    setProfile(mysession.user.image);
    console.log(eventInd);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API}` + "getEvent",
      { id: eventInd }
    );
    console.log(response.data);
    const stringified = JSON.stringify(response.data);
    console.log(stringified);
    setData(stringified);
    setLoading(false);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if (data == "") {
    return <div></div>;
  } else {
    return (
      <div>
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

        <img width={"100%"} src={`${JSON.parse(data).imageURL}`}></img>
        <Typography
          variant="h3"
          fontWeight={"bold"}
          style={{ margin: "48px 0px 32px 48px" }}
        >
          {JSON.parse(data).name}
        </Typography>
        <Typography
          variant="h6"
          fontWeight={"bold"}
          style={{ margin: "0px 0px 32px 48px" }}
        >
          Details
        </Typography>
        <div style={{ marginLeft: "48px" }}>
          <Typography style={{ color: "#B0B0B0" }}>
            Date: {JSON.parse(data).date}
          </Typography>
          <Typography style={{ color: "#B0B0B0" }}>
            Venue: {JSON.parse(data).venue}
          </Typography>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Typography style={{ color: "#B0B0B0" }}>
              Link to register:
            </Typography>
            <a>
              <Typography
                color={"blue"}
                sx={{ textDecoration: "underline" }}
                display="inline"
              >
                {JSON.parse(data).registrationLink}
              </Typography>
            </a>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Typography style={{ color: "#B0B0B0" }}>
              Registration Closes in
            </Typography>
            <Typography style={{ color: "#B80000" }}>
              {" "}
              {JSON.parse(data).registrationCloses} days
            </Typography>
          </div>
        </div>
        <Typography
          variant="h6"
          fontWeight={"bold"}
          style={{
            margin: "0px 0px 0px 48px",
            paddingTop: "32px",
            paddingBottom: "32px",
          }}
        >
          Description
        </Typography>
        <Typography style={{ color: "#B0B0B0", margin: "0px 48px 0px 48px" }}>
          {JSON.parse(data).description}
        </Typography>
        <div style={{ height: "10vh" }}></div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          onClick={() => {
            setLoading(false);
          }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
}
