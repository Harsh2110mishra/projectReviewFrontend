import React, { useState, useEffect } from "react";
 import Axios from "axios";
import { useHistory, Link } from "react-router-dom";



// material-ui imports
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExpandMore = styled((props) => {
      let history = useHistory();
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function dashboardCard(props) {
  const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [review, setReview] = useState({
        comment: [],
        rating: [],
        name:[]
 });

  // material-ui
  const [expanded, setExpanded] = React.useState(false);
const token = window.localStorage.getItem("token");
    const handleExpandClick = () => {
        if (props.role !== "user") {
            setExpanded(!expanded);
        }
    };
    useEffect(() => {
       setReview(props.review);
   },[props])
    const handleSubmit = async(e) => {
         e.preventDefault();
         try {
           const result = await Axios.put(
             `${process.env.REACT_APP_BASE_URL}/api/admin/Project/addReview`,
             {
               rating: rating,
               comment: comment,
               projectId: props.projectId,
             },
             {
               headers: {
                 "Content-Type": "application/json, text/plain, */*",
                 token: `${token}`,
               },
             }
           );
             console.log("result in review:", result);
           alert(" Added review");
           history.push("/Dashboard");
         } catch (err) {
           alert(err);
         }
    }
  return (
    <div
      style={{
        display: "grid",
        margin: "5px",
        padding: "5px",
        border: "5px",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {props.avatarName}
            </Avatar>
          }
          title={props.title}
          subheader={props.createdAtDate}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {<a href={props.downloadLink}>Download</a>}
          </Typography>
          <Typography paragraph>{props.description}</Typography>
          <Typography paragraph>Reviews:</Typography>

          {review !== undefined ? (
            <Typography paragraph> Mentor :{review.name}</Typography>
          ) : (
            <Typography paragraph> Review Pending...</Typography>
          )}
          {review !== undefined ? (
            <Typography paragraph>ratings: {review.rating}</Typography>
          ) : null}
          {review !== undefined ? (
            <Typography paragraph> comments: {review.comment}</Typography>
          ) : null}
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <form
              method="POST"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <label>
                Mentor Name:
                {props.name}
              </label>
              <label>
                Comment:
                <input
                  type="text"
                  name="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </label>

              <select
                value={rating}
                name="category"
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <input type="submit" />
            </form>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
