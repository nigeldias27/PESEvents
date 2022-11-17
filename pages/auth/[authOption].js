import {
  Button,
  Container,
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";

export default function Auth() {
  const { data: session } = useSession();
  const router = useRouter();
  const { authOption } = router.query;
  useEffect(() => {
    initstate();
  }, []);

  const initstate = async () => {
    const mysession = await getSession();
    console.log(mysession);

    if (mysession != null) {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}` + "auth",
        mysession.user
      );
      console.log(response.data);
      var data = response.data.exists;
      if (data == true) {
        if (response.data.verified == true) {
          router.push("/home");
        } else {
          router.push("/notverified");
        }
      } else {
        if (authOption == undefined) {
          router.push("/moreInfo/clubhead");
        }
        router.push("/moreInfo/" + authOption);
      }
    }
  };
  return (
    <div className={styles.container}>
      <Container maxWidth="sm">
        <Card variant="outlined">
          <CardContent>
            <Typography marginTop={2} variant="h5" align="center">
              Getting started with PESEvents
            </Typography>
            <Stack
              direction={"column"}
              justifyContent="center"
              spacing={3}
              marginTop={3}
              marginLeft={10}
              marginRight={10}
              paddingBottom={3}
            >
              <Button
                variant="raised"
                sx={{
                  textTransform: "none",
                  color: "grey",
                  background: "white",
                  boxShadow:
                    "0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25)",
                  fontSize: "16px",
                  fontWeight: "700",
                }}
                onClick={() => {
                  signIn("google");
                }}
              >
                <img
                  width={20}
                  style={{ marginRight: "15px" }}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/300px-Google_%22G%22_Logo.svg.png"
                ></img>
                Google
              </Button>
              <Button
                variant="raised"
                sx={{
                  textTransform: "none",
                  color: "black",
                  background: "white",
                  boxShadow:
                    "0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25)",
                  fontSize: "16px",
                  fontWeight: "700",
                }}
                onClick={() => {
                  signIn("github");
                }}
              >
                <img
                  width={20}
                  style={{ marginRight: "15px" }}
                  src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
                ></img>
                Github
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
