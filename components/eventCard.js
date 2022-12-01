import { Typography } from "@mui/material";
import { useRouter } from "next/router";

export function EventCard(props) {
  const router = useRouter();
  return (
    <div
      key={props.key}
      onClick={() => {
        router.push("/event/" + `${props.id}`);
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "rgba(0, 0, 0, 0.16) 0px 1px 4px";
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
