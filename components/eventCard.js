import { Typography } from "@mui/material";
import { useRouter } from "next/router";

export function EventCard(props) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push("/event/" + `${props.id}`);
      }}
      style={{
        display: "inline-block",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        width: "300px",
        borderRadius: "15px",
        margin: "32px 0px 48px 48px",
      }}
    >
      <img
        width={"100%"}
        style={{ borderRadius: "15px 15px 0px 0px" }}
        src={`${props.imageURL}`}
      ></img>
      <Typography
        variant="h6"
        fontWeight={"bold"}
        style={{
          marginTop: "24px",
          marginBottom: "12px",
          marginLeft: "24px",
          borderRadius: "15px 15px 0px 0px",
        }}
      >
        {props.name}
      </Typography>
      <Typography
        variant="inherit"
        style={{
          marginBottom: "0px",
          marginLeft: "24px",
        }}
      >
        Time: {props.date}
      </Typography>
      <br></br>
      <Typography
        variant="inherit"
        style={{ marginBottom: "48px", marginLeft: "24px" }}
      >
        Venue: {props.venue}
      </Typography>
    </div>
  );
}
