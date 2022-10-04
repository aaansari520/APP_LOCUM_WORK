import Iphone14 from "./Iphone14.jpeg";
import Bluetooth from "./Bluetooth.jpg";
import JurassicWorld from "./JurassicWorld.jpg";
import BluetoothEar from "./BluetoothEar.jpg";
import Mivi from "./Mivi.jpg";
import Refrigerator from "./Refrigerator.jpg";
import Earbuds from "./Earbuds.jpg";
import Refrigerator1 from "./Refrigerator1.jpg";

import * as actionTypes from "./action";

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");

const initialState = {
  products: [
    {
      id: 1,
      title: "Iphone14",
      description: `This smartphone is not just a sight to behold but also comes equipped with innovative features
         that will keep you productive and entertained. Its Helio G85 Gaming Processor ensures that you stay
          on top of the leaderboard while gaming. Its 16.5 cm (6.5) Mini-drop Fullscreen ensures an immersive
           experience while gaming, streaming content, and more. `,
      price: 140000,
      image: Iphone14,
    },
    {
      id: 2,
      title: "Bluetooth Speaker",
      description: `With the Bluetooth speaker, you can enjoy motivational, dance, or instrumental music whenever you want. 
        It ensures an immersive listening experience with its 52 mm full-range driver so that you can stay entertained
         wherever you are. With an IPX7 rating, it ensures water resistance so that you can listen to music by
          the poolside without a worry in the world.`,
      price: 999.0,
      image: Bluetooth,
    },
    {
      id: 3,
      title: "JurassicWorld",
      description: `The land of Meluha is an empire created by Lord Rama, and it is ruled by the Suryavanshis. This empire 
        is powerful and proud, however, the Saraswati river that is their source of water is slowing drying up. 
        On top of that, the empire is at war with the Chandravanshis who have allied with The Nagas, a group of 
        sinister and deformed human beings who have extraordinary martial art skills.`,
      price: 250.0,
      image: JurassicWorld,
    },

    {
      id: 4,
      title: "BluetoothEar",
      description: `Oneplus Bullets Z2 Bluetooth Wireless in Ear Earphones with Mic, Bombastic Bass - 12.4 Mm Drivers, 10 Mins Charge - 20 Hrs Music, 30 Hrs Battery Life, Launched in April 2022 (Magico Black)`,
      price: 3000.0,
      image: BluetoothEar,
    },

    {
      id: 5,
      title: "Mivi",
      description: `New JBL Tune 130NC TWS | Active Noise Cancellation Earbuds (Upto 40dB) | JBL APP - Adjust EQ for Extra Bass | Massive 40Hrs Playtime | Legendary JBL Sound | 4Mics for Clear Calls | BT 5.2 (Black)`,
      price: 3799.0,
      image: Mivi,
    },

    {
      id: 6,
      title: "Refrigerator",
      description: `Godrej 185 L 4 Star Inverter Direct-Cool Single Door Refrigerator (RD UNO 1854 PTI ZN BL, Zen Blue, Cool Lock Technology)`,
      price: 13990.0,
      image: Refrigerator,
    },

    {
      id: 7,
      title: "Earbuds",
      description: `Noise Buds Vs104 Bluetooth Truly Wireless in Ear Earbuds with Mic, 30-Hours of Playtime, Instacharge, 13Mm Driver and Hyper Sync (Charcoal Black)`,
      price: 1599.0,
      image: Earbuds,
    },

    {
      id: 8,
      title: "Refrigerator1",
      description: `LG 190 L 3 Star Direct-Cool Single Door Refrigerator (GL-B201RPZD, Shiny Steel, Moist 'N' Fresh)`,
      price: 13990.0,
      image: Refrigerator1,
    },
  ],
  cart: cartFromLocalStorage,
  currentItem: null,
  isLoggedIn: false,
};

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const item = state.products.find(
        (product) => product.id === action.payload.id
      );

      const inCart = state.cart.find((product) =>
        product.id === action.payload.id ? true : false
      );
      return {
        ...state,
        cart: inCart
          ? state.cart.map((product) =>
              product.id === action.payload.id
                ? { ...product, qty: parseInt(product.qty + 1) }
                : product
            )
          : [...state.cart, { ...item, qty: 1 }],
      };

    case actionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload.item,
        // currentItem: state.products.map((product) =>
        //   product.id === action.payload.id
        //     ? { ...product, qty: parseInt(product.qty + 1) }
        //     : product
        // ),
      };

    case actionTypes.UPDATE_QTY:
      return {
        ...state,
        cart: state.cart.map((product) =>
          product.id === action.payload.id
            ? {
                ...product,
                qty: parseInt(action.payload.qty),
                id: action.payload.id,
              }
            : product
        ),
      };

    case actionTypes.DELETE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((product) => product.id !== action.payload.id),
      };
    case actionTypes.EMPTY_CART:
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export default shopReducer;
