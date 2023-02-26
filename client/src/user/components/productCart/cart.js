import React, { useState } from 'react';
import './cart.css'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {FacebookShareButton, WhatsappShareButton } from "react-share";
import {FacebookIcon,WhatsappIcon} from "react-share";
import {message} from 'antd'


import { useSelector } from 'react-redux';
import axios from 'axios';

const Cart = (props) => {

  const shareUrl = 'https://example.com';

  const [favouriteProduct, setFavouriteProduct] = useState([]);
  const [cartProduct,setCartProduct]=useState([])
  const [isFav, setIsFav] = useState(false);
  const [color, setColor] = useState('black');
  const [quantity,setQuantity]=useState(1)
  const { _id } = useSelector((state) => state.user);
  const userId = _id;

  console.log( props.item, '@@@');

  const handleAddToFav = async (productId) => {
    try {
      const isProductFav = favouriteProduct.some((product) => product.productId === productId);
      if (!isProductFav) {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/favourites`, {
          productId,
          userId,
          color: "red"
        });
        setFavouriteProduct([...favouriteProduct, response.data]);
        setIsFav(true);
        setColor('red');
      } else {
        message.error("Product already added to favourites.", 2);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart=async (productId) => {
    try {
      const isProductFav = cartProduct.some((product) => product.productId === productId);
      if (!isProductFav) {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/carts`, {
          productId,
          userId,
          quantity
        });
        console.log(response,"res")
        setCartProduct([...cartProduct, response.data]);
      } else {
        message.error("Product already added to favourites.", 2);
      }
    } catch (error) {
      console.error(error);
    }
  };
  


  return (
    <div className='cart-container'>
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            sx={{ color: 'blue' }}
            title={props.item.name}
            subheader={'Rs ' + props.item.price}
          />
          <CardMedia
            component='img'
            height='194'
            image={
              require(`../../../uploads/products/${props.item.productImage}`) ||
              'No Image for this product'
            }
            alt={props.item?.productImage || 'img'}
            style={{ height: 250, objectFit: 'cover' }}
          />
          <CardContent>
            <Typography variant='body2' color='text.secondary'>
              Good Food, Good Mood
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label='add to favorites'>
              <p
                style={{ color: color, border:"2px solid grey",borderRadius:"10px" }}
                onClick={() => {
                    handleAddToFav(props.item._id);
                }}
                >
                  Add To Fav
                </p>
            </IconButton>

            <IconButton aria-label='add to cart'>
              <p style={{border:"2px solid grey",borderRadius:"10px", color:"indigo"}}
                onClick={() => {
                  handleAddToCart(props.item._id)
                }}
              >
                Add to Cart
                </p>
            </IconButton>

            <FacebookShareButton
              url={shareUrl}
              quote='Check out this link!'
              hashtag='#example'
              disabled={false}>
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>

            <WhatsappShareButton
              url={shareUrl}
              quote='Check out this link!'
              hashtag='#example'
              disabled={false}>
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
          </CardActions>
        </Card>
      </div>
  );
};

export default Cart;
