import React from "react";
import { Link } from "react-router-dom";
// import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./Product.css";
import * as actionTypes from "../../redux/action";
import { connect } from "react-redux";

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
    marginBottom: "3%",
  },
  media: {
    height: "30vh",
  },
});

function Product2({ product, addToCart, loadCurrentItem }) {
  const history = useHistory();
  const classes = useStyles();

  const handleOnClick = () => {
    loadCurrentItem(product);
    history.push(`/product/${product.id}`);
  };
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.image}
        title={product.title}
      />
      <CardContent className={classes.cardstyle}>
        <Typography gutterBottom variant="h6" component="h6">
          {product.title}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          style={{ height: "5vh", marginTop: "1px" }}
        >
          {product.description.substring(0, 60)}
        </Typography>
        <br />
        <Typography
          variant="h5"
          align="center"
          color="#d43226"
          style={{ marginTop: "1px" }}
        >
          Rs.{product.price}
        </Typography>
      </CardContent>

      <CardActions align="center">
        <Button size="small" color="primary" onClick={handleOnClick}>
          View Item
        </Button>

        <Button
          size="small"
          color="primary"
          onClick={() => addToCart(product.id)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

const mapDispatchToProps = (dispatch) => {
  console.log("Dispatch", dispatch);

  return {
    loadCurrentItem: (item, qty) =>
      dispatch({
        type: actionTypes.LOAD_CURRENT_ITEM,
        payload: { item: item },
      }),
    addToCart: (id) =>
      dispatch({ type: actionTypes.ADD_TO_CART, payload: { id: id } }),
  };
};

export default connect(null, mapDispatchToProps)(Product2);
