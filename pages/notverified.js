import {
  Alert,
  Container,
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import styles from "../styles/Home.module.css";
export default function NotVerified() {
  const router = useRouter();
  useEffect(() => {
    initstate();
  }, []);

  const initstate = async () => {
    const mysession = await getSession();
    if (mysession != null && mysession != undefined) {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}` + "auth",
        mysession.user
      );
      console.log(response.data);
      var data = response.data.exists;
      if (data == true) {
        if (response.data.verified == true) {
          router.push("/home");
        }
      }
    }
    console.log(mysession);
  };
  return (
    <div className={styles.container}>
      <Container maxWidth="sm">
        <Card variant="outlined">
          <CardContent>
            <Typography marginTop={2} variant="h5" align="center">
              Verification incomplete
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
              <Alert severity="info">
                Your account has not been verified by the admin yet
              </Alert>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
