import React from "react";
import { UserPlus, UserMinus, UserCog } from "lucide-react";
import AddStudentModal from "../../AdminOperatins/AddStudent/AddStudent";
import RemoveStudentModal from "../../AdminOperatins/RemoveStudent/RemoveStudent";
import UpdateStudent from "../../AdminOperatins/UpdateStudent/UpdateStudent";
// import AdminHeader from "../../AdminHeader/AdminHeader";

const AdminStudentRoute = () => (
  <>
    <div className="admin-dashboard-wrapper">
      <div className="cards-grid">
        {/* Add Student Card */}
        <div className="card">
          <div className="card-content">
            <UserPlus className="card-icon card-icon-blue" />
            <h2 className="card-title">Add Student</h2>
            <p className="card-description">Add a new student to the system</p>
            <AddStudentModal />
          </div>
        </div>

        {/* Remove Student Card */}
        <div className="card">
          <div className="card-content">
            <UserMinus className="card-icon card-icon-red" />
            <h2 className="card-title">Remove Student</h2>
            <p className="card-description">Remove a student from the system</p>
            <RemoveStudentModal />
          </div>
        </div>

        {/* Update Student Card */}
        <div className="card">
          <div className="card-content">
            <UserCog className="card-icon card-icon-green" />
            <h2 className="card-title">Update Student</h2>
            <p className="card-description">Update student information</p>
            <UpdateStudent />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default AdminStudentRoute;
