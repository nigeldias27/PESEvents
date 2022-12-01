import {
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Button,
  Box,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useRouter } from "next/router";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { getSession, signOut } from "next-auth/react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { EventCard } from "../components/eventCard";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addEventList, setAddList] = useState(["", "", "", "", "", ""]);
  const [eventList, setEventList] = useState([]);
  const [profile, setProfile] = useState("");
  const [addOption, setAddOption] = useState(false);
  const [search, setSearch] = useState("");
  const myRef = useRef(null);
  const open = Boolean(anchorEl);
  useEffect(() => {
    initState();
  }, []);
  const initState = async () => {
    const mysession = await getSession();
    if (mysession == null) {
      router.push("/");
      return;
    }
    setProfile(mysession.user.image);
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API}` + "getType/" + mysession.user.email
    );
    console.log(response.data);
    if (response.data == "student") {
      setAddOption(false);
    } else {
      setAddOption(true);
    }
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}` + "getAllEvents"
    );
    setEventList([...res.data]);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (prop) => (event) => {
    addEventList[prop] = event.target.value;
    setAddList([...addEventList]);
    console.log(addEventList);
  };
  return (
    <div>
      <div
        style={{
          height: "100vh",
          backgroundColor: "#ADD8E6",
        }}
      >
        <div
          style={{
            display: "flex",
            backgroundColor: "rgba(255,255,255,0.6)",
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
          <div>
            {addOption ? (
              <Button
                variant="outlined"
                onClick={() => {
                  if (modalOpen == false) {
                    setModalOpen(true);
                  } else {
                    setModalOpen(false);
                  }
                }}
              >
                Add event
              </Button>
            ) : (
              <div></div>
            )}
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
              <MenuItem
                onClick={() => {
                  router.push("/profile");
                }}
              >
                Profile
              </MenuItem>
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
        </div>
        <div
          style={{
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.9)",
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 1px 1px 0px inset, rgba(0, 0, 0, 0.25) 0px 50px 100px -20px, rgba(173, 216, 230, 0.3) 0px 30px 60px -30px",
              padding: "50px",
              borderRadius: "50px",
              width: "50vw",
            }}
          >
            <Typography fontWeight={"bold"} variant="h4" textAlign={"center"}>
              PESEvents
            </Typography>
            <Typography
              style={{ marginTop: "12px", paddingBottom: "12px" }}
              color={"#B0B0B0"}
              textAlign={"center"}
            >
              Welcome to PESEvents! A single unified platform which makes events
              easy and accessible to all students
            </Typography>
            <Box
              display={"flex"}
              flexDirection="row"
              justifyContent={"center"}
              margin="12px"
            >
              <Autocomplete
                fullWidth
                id="free-solo-demo"
                freeSolo
                options={eventList.map((option) => option.name)}
                renderInput={(params) => (
                  <TextField {...params} label="Search for events" />
                )}
              />
              <Button
                style={{ marginLeft: "12px", padding: "0px 24px 0px 24px" }}
                variant="contained"
                onClick={() => {
                  setSearch(document.getElementById("free-solo-demo").value);
                  myRef.current.scrollIntoView({ behaviour: "smooth" });
                }}
              >
                Search
              </Button>
            </Box>
          </div>
        </div>
      </div>
      <Typography
        ref={myRef}
        variant="h3"
        fontWeight={"bold"}
        style={{ padding: "48px" }}
      >
        {search == "" ? "All Events" : "Results for: '" + search + "'"}
      </Typography>
      <div style={{ overflow: "auto", whiteSpace: "nowrap" }}>
        {eventList.map((val, i) => {
          console.log(val);
          if (search == "") {
            return (
              <EventCard
                key={i.toString()}
                name={`${val.name}`}
                imageURL={`${val.imageURL}`}
                venue={`${val.venue}`}
                date={`${val.date}`}
                id={`${val._id}`}
              ></EventCard>
            );
          } else {
            if (val.name.includes(search) == true) {
              return (
                <EventCard
                  key={i.toString()}
                  name={`${val.name}`}
                  imageURL={`${val.imageURL}`}
                  venue={`${val.venue}`}
                  date={`${val.date}`}
                  id={`${val._id}`}
                ></EventCard>
              );
            }
          }
        })}
      </div>
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add an event
          </Typography>

          <TextField
            id="outlined-name"
            label="Name of Event"
            onChange={handleChange(0)}
            style={{ width: "100%", marginTop: "24px" }}
          />
          <TextField
            id="outlined-textarea"
            label="Description"
            onChange={handleChange(1)}
            style={{ width: "100%", marginTop: "12px" }}
            multiline
          />
          <TextField
            id="outlined-name"
            label="Venue"
            onChange={handleChange(2)}
            style={{ width: "100%", marginTop: "12px" }}
          />
          <TextField
            id="outlined-name"
            label="Date"
            onChange={handleChange(3)}
            style={{ width: "100%", marginTop: "12px" }}
          />
          <TextField
            id="outlined-name"
            onChange={handleChange(4)}
            label="In how many days does the registration close? "
            style={{ width: "100%", marginTop: "12px" }}
          />
          <TextField
            id="outlined-name"
            onChange={handleChange(5)}
            label="Registration Link"
            style={{ width: "100%", marginTop: "12px", marginBottom: "24px" }}
          />
          <div>
            <Button
              variant="contained"
              style={{ marginRight: "4px" }}
              onClick={() => {
                let input = document.createElement("input");
                input.type = "file";
                input.onchange = (_) => {
                  // you can use this method to get file and perform respective operations
                  const firebaseConfig = {
                    apiKey: "AIzaSyCcvAMGKrrMkifMT58FaZ3sdwJtP8adXvQ",
                    authDomain: "newsheadstheworld2.firebaseapp.com",
                    databaseURL: "https://newsheadstheworld2.firebaseio.com",
                    projectId: "newsheadstheworld2",
                    storageBucket: "newsheadstheworld2.appspot.com",
                    messagingSenderId: "799353860306",
                    appId: "1:799353860306:web:6feeb51297c584a6aebd0b",
                  };

                  // Initialize Firebase
                  const app = initializeApp(firebaseConfig);
                  let files = Array.from(input.files);
                  const file = files[0];
                  const storage = getStorage();
                  const storageRef = ref(storage, `files/${file.name}`);

                  const uploadTask = uploadBytesResumable(storageRef, file);

                  // Register three observers:
                  // 1. 'state_changed' observer, called any time the state changes
                  // 2. Error observer, called on failure
                  // 3. Completion observer, called on successful completion
                  uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                      // Observe state change events such as progress, pause, and resume
                      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                      const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                      console.log("Upload is " + progress + "% done");
                      switch (snapshot.state) {
                        case "paused":
                          console.log("Upload is paused");
                          break;
                        case "running":
                          console.log("Upload is running");
                          break;
                      }
                    },
                    (error) => {
                      // Handle unsuccessful uploads
                    },
                    () => {
                      // Handle successful uploads on complete
                      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                      getDownloadURL(uploadTask.snapshot.ref).then(
                        async (downloadURL) => {
                          console.log("File available at", downloadURL);
                          const response = await axios.post(
                            `${process.env.NEXT_PUBLIC_API}` + "addEvent",
                            {
                              name: addEventList[0],
                              description: addEventList[1],
                              venue: addEventList[2],
                              date: addEventList[3],
                              registrationCloses: addEventList[4],
                              registrationLink: addEventList[5],
                              imageURL: downloadURL,
                            }
                          );
                          setModalOpen(false);
                        }
                      );
                    }
                  );
                };
                input.click();
              }}
            >
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
