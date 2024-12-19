import React from "react";
import { UserPlus, UserMinus, UserCog } from "lucide-react";
import AddBus from "../../AdminOperatins/AddBus/AddBus";
import RemoveBus from "../../AdminOperatins/RemoveBus/RemoveBus";
import UpdateBus from "../../AdminOperatins/UpdateBus/UpdateBus";

const AdminBusRoute = () => (
  <>
    <div className="admin-dashboard-wrapper">
      <div className="cards-grid">
        {/* Add Student Card */}
        <div className="card">
          <div className="card-content">
            <UserPlus className="card-icon card-icon-blue" />
            <h2 className="card-title">Add Bus</h2>
            <p className="card-description">Add a new Bus to the system</p>
            <AddBus />
          </div>
        </div>

        {/* Remove Student Card */}
        <div className="card">
          <div className="card-content">
            <UserMinus className="card-icon card-icon-red" />
            <h2 className="card-title">Remove Bus</h2>
            <p className="card-description">Remove a Bus from the system</p>
            <RemoveBus />
          </div>
        </div>

        {/* Update Student Card */}
        <div className="card">
          <div className="card-content">
            <UserCog className="card-icon card-icon-green" />
            <h2 className="card-title">Update Bus</h2>
            <p className="card-description">Update Bus information</p>
            <UpdateBus />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default AdminBusRoute;
