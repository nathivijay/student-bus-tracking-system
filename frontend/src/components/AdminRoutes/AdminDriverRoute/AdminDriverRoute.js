import React from "react";
import { UserPlus, UserMinus, UserCog } from "lucide-react";
// import AddStudentModal from "../../AdminOperatins/AddStudent/AddStudent";
import AddDriver from "../../AdminOperatins/AddDriver/AddDriver";
// import RemoveStudentModal from "../../AdminOperatins/RemoveStudent/RemoveStudent";
import RemoveDriver from "../../AdminOperatins/RemoveDriver/RemoveDriver";
// import UpdateStudent from "../../AdminOperatins/UpdateStudent/UpdateStudent";
import UpdateDriver from "../../AdminOperatins/UpdateDriver/UpdateDriver";
// import AdminHeader from "../../AdminHeader/AdminHeader";

const AdminDriverRoute = () => (
  <>
    <div className="admin-dashboard-wrapper">
      <div className="cards-grid">
        {/* Add Student Card */}
        <div className="card">
          <div className="card-content">
            <UserPlus className="card-icon card-icon-blue" />
            <h2 className="card-title">Add Driver</h2>
            <p className="card-description">Add a new Driver to the system</p>
            <AddDriver />
          </div>
        </div>

        {/* Remove Student Card */}
        <div className="card">
          <div className="card-content">
            <UserMinus className="card-icon card-icon-red" />
            <h2 className="card-title">Remove Driver</h2>
            <p className="card-description">Remove a Driver from the system</p>
            <RemoveDriver />
          </div>
        </div>

        {/* Update Student Card */}
        <div className="card">
          <div className="card-content">
            <UserCog className="card-icon card-icon-green" />
            <h2 className="card-title">Update Driver</h2>
            <p className="card-description">Update Driver information</p>
            <UpdateDriver />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default AdminDriverRoute;
