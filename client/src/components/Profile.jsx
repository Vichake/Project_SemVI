import React from 'react';
import {
  MDBCol,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';
import './css/Profile.css';

export default function PersonalProfile({ onClose, userData }) {

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="profile-popup-container">
      <MDBCard className="profile-popup-card custom-shadow">
        <MDBRow className="g-0">
          <MDBCol md="4" className="profile-left text-white text-center">
            <MDBCardImage
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
              alt="Avatar"
              className="rounded-circle mb-3 profile-avatar"
              fluid
            />
            <MDBTypography tag="h5">{userData?.name || 'User Name'}</MDBTypography>
            <MDBCardText className="small-text">{userData?.role || 'Full time berojgar'}</MDBCardText>
          </MDBCol>

          <MDBCol md="8">
            <MDBCardBody className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <MDBTypography tag="h5" className="fw-bold mb-0">Profile</MDBTypography>
                <button className="custom-close-btn" onClick={onClose}>✖</button>
              </div>

              <hr />

              <MDBRow className="pt-2">
                <MDBCol size="12" className="mb-3">
                  <MDBTypography tag="h6">Email</MDBTypography>
                  <MDBCardText className="text-muted">{userData?.email || 'info@example.com'}</MDBCardText>
                </MDBCol>
                <MDBCol size="12">
                  <MDBTypography tag="h6">Phone</MDBTypography>
                  <MDBCardText className="text-muted">{userData?.phone || '123 456 789'}</MDBCardText>
                </MDBCol>
              </MDBRow>

              <div className="d-flex justify-content-end mt-4">
                <MDBBtn color="danger" size="sm" className="logout-btn" onClick={handleLogout}>
                  <MDBIcon icon="sign-out-alt" className="me-2" />
                  Logout
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </div>
  );
}
