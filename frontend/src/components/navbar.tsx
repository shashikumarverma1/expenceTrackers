import { IoSearch, IoBriefcaseOutline } from "react-icons/io5";
import { SearchTextInFo } from "../context/searchProvider";
import { useContext, useState } from "react";
import { CartInFo } from "../context/cart";
import "./NavBar.css"; // Import the CSS file

function NavBar() {
  const { setSearchText } = useContext(SearchTextInFo);
  const { cartData } = useContext(CartInFo);
const [showModal , setShowModal]=useState(false)
  return (
    <div>
      <div className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">
          <img
            src="https://salinaka-ecommerce.web.app/images/logo-full.059e10fa5fedbfb65165e7565ed3936f.png"
            alt="logo"
            style={{ width: 100, height: 30 }}
          />
          <ul className="navbar-menu">
            <li className="navbar-menu-item">Home</li>
            <li className="navbar-menu-item">Shop</li>
            <li className="navbar-menu-item">Feature</li>
            <li className="navbar-menu-item">Recommended</li>
          </ul>
        </div>
        <div className="navbar-user">
          <p className="navbar-filter">filter</p>
          <div className="navbar-search">
            <IoSearch />
            <input
              type="text"
              placeholder="search"
              className="navbar-search-input"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        <span onClick={()=>setShowModal(!showModal)}><IoBriefcaseOutline /></span>
          <p className="navbar-cart">{cartData.length}</p>
          <div className="navbar-user">
            <p className="navbar-user-item">User</p>
            <img
              src="https://avatars.githubusercontent.com/u/103879105?v=4"
              alt="image"
              className="navbar-user-image"
            />
            <select className="navbar-user-select">
              <option></option>
              <option>1</option>
              <option>2</option>
            </select>
          </div>
        </div>
      
      </div>
     
    </div>
     {showModal && <div>
      <div style={{position:"absolute" , left:'80vw' , backgroundColor:"grey", width:100 , borderRadius:10}}>
              <ul>
               
           
      {
        cartData.map((e , index)=>{
          console.log(e)
          return (
            <li style={{ paddingLeft:10, color:"#FFFFFF" , fontSize:10 ,}} key={index}>
              <div style={{display:'flex' , alignItems:"center"}}>
              <span style={{margin:5}}>{index +1}.</span> <img
        src="https://firebasestorage.googleapis.com/v0/b/salinaka-ecommerce.appspot.com/o/products%2FYIZuxWur1W4fAT6z3ejk?alt=media&token=7dca264f-c345-4cfc-93a8-60217a53f66a"
        alt="Logo"
        style={{width:20 , height:20 , backgroundColor:"#FFFFFF" , borderRadius:2 , margin:5}}
      /> <span style={{margin:5}}>{e.title}</span> 

              </div>
            </li>
          )
        })
      }
         </ul>
            </div>
      </div>}
    </div>
  );
}

export default NavBar;
