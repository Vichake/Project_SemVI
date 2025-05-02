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
    <div className="pp-container">
      <MDBCard className="pp-card">
        <MDBRow className="g-0">
          <MDBCol md="4" className="pp-sidebar">
            <div className="pp-avatar-wrapper">
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                alt="Avatar"
                className="pp-avatar"
                fluid
              />
            </div>
            <MDBTypography tag="h5" className="pp-username">{userData?.name || 'User Name'}</MDBTypography>
            <MDBCardText className="pp-user-role">{userData?.role || ''}</MDBCardText>
          </MDBCol>
          
          <MDBCol md="8">
            <MDBCardBody className="pp-body">
              <div className="pp-header">
                <MDBTypography tag="h5" className="pp-title">Profile</MDBTypography>
                <button className="pp-close-btn" onClick={onClose} aria-label="Close">
                  <span aria-hidden="true">✖</span>
                </button>
              </div>
              
              <hr className="pp-divider" />
              
              <MDBRow className="pp-info-section">
                <MDBCol size="12" className="pp-info-item">
                  <MDBTypography tag="h6" className="pp-info-label">Email</MDBTypography>
                  <MDBCardText className="pp-info-value">{userData?.email || 'info@example.com'}</MDBCardText>
                </MDBCol>
                <MDBCol size="12" className="pp-info-item">
                  <MDBTypography tag="h6" className="pp-info-label">Phone</MDBTypography>
                  <MDBCardText className="pp-info-value">{userData?.phone || '123 456 789'}</MDBCardText>
                </MDBCol>
              </MDBRow>
              
              <div className="pp-footer">
                <MDBBtn color="danger" size="sm" className="pp-logout-btn" onClick={handleLogout}>
                  <MDBIcon icon="sign-out-alt" className="pp-icon" />
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