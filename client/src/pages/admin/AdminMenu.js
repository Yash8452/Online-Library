import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <>
      <div className="text-center p-1" style={{border:"1px solid gray"}}>
        <div className="list-group dashboard-menu">
          <h4>Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/add-book"
            className="list-group-item list-group-item-action" 
          >
            Add a book
          </NavLink>
          {/* <NavLink
            to="/dashboard/admin/delete-book"
            className="list-group-item list-group-item-action"
          >
            Delete a book
          </NavLink> */}
          <NavLink
            to="/dashboard/admin/books"
            className="list-group-item list-group-item-action"
          >
            BookList
          </NavLink>   
        </div>
      </div>
    </>
  );
};

export default AdminMenu;