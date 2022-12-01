import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import axios from "axios";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Backdrop,
  CircularProgress,
  FormGroup,
  Checkbox,
  Alert,
  AppBar,
  Select,
  Box,
  MenuItem,
  InputLabel,
  Grid,
} from "@mui/material";
import { useState, useEffect } from "react";
export default function InfoForm() {
  const router = useRouter();
  const { infoForm } = router.query;
  const [studentQnA, setStudentQnA] = useState([
    { input: "SRN", val: "" },
    { input: "Year of Study", val: "" },
    { input: "Campus", val: "" },
  ]);
  const [clubQnA, setClubQnA] = useState([
    { input: "SRN", val: "" },
    { input: "Year of Study", val: "" },
    { input: "Campus", val: "" },
    { input: "Name of Club", val: "" },
    { input: "Description", val: "" },
  ]);
  useEffect(() => {
    console.log(clubQnA);
    console.log(studentQnA);
  }, [clubQnA, studentQnA]);

  const handleChange = (prop, option) => (event) => {
    console.log(option);
    if (option == "student") {
      studentQnA[prop].val = event.target.value;
      setStudentQnA([...studentQnA]);
    }
    if (option == "clubhead") {
      clubQnA[prop].val = event.target.value;
      setClubQnA([...clubQnA]);
    }
  };
  return (
    <div>
      <Container
        maxWidth="md"
        style={{ paddingTop: "24px", paddingBottom: "24px" }}
      >
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" align="center">
              Enter more info
            </Typography>
            <Stack
              direction={"column"}
              justifyContent="center"
              spacing={7}
              marginTop={3}
            >
              {infoForm == "student"
                ? studentQnA.map((val, i) => {
                    return (
                      <TextField
                        key={i.toString()}
                        id="outlined-name"
                        value={val.val}
                        label={`${val.input}`}
                        onChange={handleChange(i, "student")}
                      />
                    );
                  })
                : clubQnA.map((val, i) => {
                    return (
                      <TextField
                        key={i.toString()}
                        id="outlined-name"
                        value={val.val}
                        label={`${val.input}`}
                        onChange={handleChange(i, "clubhead")}
                      />
                    );
                  })}
              <Button
                variant="contained"
                onClick={async () => {
                  const mysession = await getSession();
                  if (infoForm == "student") {
                    const response = await axios.post(
                      `${process.env.NEXT_PUBLIC_API}` + "signUp",
                      {
                        user: mysession.user,
                        srn: studentQnA[0].val,
                        yearofstudy: studentQnA[1].val,
                        campus: studentQnA[2].val,
                        role: infoForm,
                      }
                    );
                    router.push("/home");
                  } else {
                    const response = await axios.post(
                      `${process.env.NEXT_PUBLIC_API}` + "signUp",
                      {
                        user: mysession.user,
                        srn: clubQnA[0].val,
                        yearofstudy: clubQnA[1].val,
                        campus: clubQnA[2].val,
                        role: infoForm,
                        clubName: clubQnA[3].val,
                        description: clubQnA[4].val,
                      }
                    );
                    router.push("/auth/clubhead");
                  }
                }}
              >
                Submit
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
