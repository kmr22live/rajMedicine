import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { CartItems } from "../Cart/CartItems";
import { logout } from "../../store/AuthSlice";
import { useNavigate } from "react-router-dom";
import { searchData } from "../../store/CartSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [inputText, setInputText] = React.useState("");

  const cartItems = useSelector((store) => store.cart.itemsList);
  const total = useSelector((store) => store.cart.totalAllQuatity);
  const totalPrice = useSelector((store) => store.cart.totalAllPrice);
  // console.log(cartItems);
  const testtotal = useSelector((store) => store.cart);
  // console.log(testtotal);
  const searchedDatafromStore = useSelector(
    (state) => state.cart.inputsearchData
  );

  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSignOut = () => {
    dispatch(logout());
  };

  const handleInputChange = (e) => {
    // setInputText(e.target.value);
    dispatch(searchData(e.target.value));
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
      <MenuItem style={{ cursor: "not-allowed" }}>Profile</MenuItem>
      <MenuItem style={{ cursor: "not-allowed" }}>My account</MenuItem>
      <MenuItem style={{ cursor: "not-allowed" }}>Payments</MenuItem>
      <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const launchRazorPay = () => {
    let options = {
      key: "rzp_test_AZkVt1LYh15ofN",
      amount: (totalPrice + 100) * 100,
      currency: "INR",
      name: "Raj Medicine",
      description: "Movie Purchase or Rental",
      image:
        "https://res.cloudinary.com/druttjvrf/image/upload/v1685439354/Raj_3_so8su8.png",
      handler: () => {
        alert("Payment Done");
      },
      theme: { color: "#ff0000" },
    };

    let razorPay = new window.Razorpay(options);
    razorPay.open();
  };

  return (
    <div className="header-nav container">
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          align="center"
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <img
            src="https://res.cloudinary.com/druttjvrf/image/upload/v1685438308/cropedMedicineLogo_axkiyh.png"
            className="logo-icon"
            style={{ width: "140px", height: "auto", marginTop: "20px" }}
          />
        </Typography>
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <img
                src="https://res.cloudinary.com/druttjvrf/image/upload/v1685438308/cropedMedicineLogo_axkiyh.png"
                className="logo-icon"
                id="logo-header-raj-medicine"
              />
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchedDatafromStore}
                onChange={handleInputChange}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />

            <button
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              className="btn border-0"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <Badge badgeContent={total} color="error">
                <AddShoppingCartIcon />
              </Badge>
            </button>

            <MenuItem onClick={handleProfileMenuOpen}>
              <IconButton
                size="small"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                {/* <AccountCircle /> */}
                <i className="fa-solid fa-circle-user"></i>
              </IconButton>
            </MenuItem>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h3 className="offcanvas-title" id="offcanvasRightLabel">
            Shopping Cart
          </h3>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {cartItems && cartItems.map((data) => <CartItems data={data} />)}
          {cartItems.length > 0 ? (
            <div>
              <div className="cart-summary" id="cart-summary">
                <p className="cart-summary-text">Cart Summary</p>
                <div className="payment-cart-summary">
                  <div className="payment-right">Quantity(s) {total} Nos.</div>
                  <div className="payment-left">Rs.{totalPrice}.00</div>
                </div>
                <div className="payment-cart-summary">
                  <div className="payment-right">Delivery Charge</div>
                  <div className="payment-left">Rs. 100.00</div>
                </div>
                <div className="payment-cart-summary">
                  <div className="payment-right1">Order Total</div>
                  <div className="payment-left">
                    <span>Rs.{totalPrice + 100}.00</span>
                  </div>
                </div>
              </div>
              <span id="address-get-text">
                (We will reach you shortly at your registered email for Mailing
                Address after the Successful Payment)
              </span>
            </div>
          ) : (
            <div>
              <div className="empty-cart">
                <i className="fa-solid fa-cart-arrow-down"></i>
                <h5>Your cart is Empty</h5>
              </div>
            </div>
          )}
        </div>
        <div className="offcanvas-footer">
          <button className="btn btn-dark" onClick={launchRazorPay}>
            Proceed To Payment
          </button>
        </div>
      </div>
    </div>
  );
}
