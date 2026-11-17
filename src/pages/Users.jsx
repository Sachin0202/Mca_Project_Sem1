import React, { useState, useEffect } from 'react';
import {
  Users as UsersIcon,
  UserPlus,
  Edit2,
  Trash2,
  Shield,
  Mail,
  Phone,
  CheckCircle2,
  Clock,
  Search,
  Key,
  RotateCcw
} from 'lucide-react';

import DataTable from '../components/DataTable';
import SearchBar from '../components/SearchBar';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import { usersService } from '../services/api';
import { userRolesList } from '../data/usersData';

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('ALL');

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'DevOps Engineer',
    department: 'Site Reliability Engineering',
    status: 'Active',
    phone: '',
    password: ''
  });

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const data = await usersService.getUsers();
      setUsers(data);
    } catch (err) {
      console.error('Failed to load users', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Filtered Users
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'ALL' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  // Open Add Modal
  const handleOpenAdd = () => {
    setFormData({
      name: '',
      email: '',
      role: 'DevOps Engineer',
      department: 'Site Reliability Engineering',
      status: 'Active',
      phone: '',
      password: ''
    });
    setShowAddModal(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department || 'Infrastructure',
      status: user.status,
      phone: user.phone || '',
      password: ''
    });
  };

  // Submit Add User
  const handleSaveAdd = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    try {
      const created = await usersService.createUser(formData);
      setUsers([...users, created]);
      setShowAddModal(false);
      showToast(`User account created for ${created.name}`);
    } catch (err) {
      showToast('Error creating user');
    }
  };

  // Submit Edit User
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      const updated = await usersService.updateUser(editingUser.id, formData);
      setUsers(users.map(u => (u.id === editingUser.id ? { ...u, ...formData } : u)));
      setEditingUser(null);
      showToast(`User ${formData.name} updated successfully`);
    } catch (err) {
      showToast('Error updating user');
    }
  };

  // Confirm Delete User
  const handleConfirmDelete = async () => {
    if (!deletingUser) return;
    try {
      await usersService.deleteUser(deletingUser.id);
      setUsers(users.filter(u => u.id !== deletingUser.id));
      showToast(`User ${deletingUser.name} deleted.`);
      setDeletingUser(null);
    } catch (err) {
      showToast('Error deleting user');
    }
  };

  // Table Columns
  const columns = [
    {
      key: 'name',
      title: 'User Profile',
      sortable: true,
      render: (val, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: row.avatarBg || '#2563eb',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {row.avatarInitials || 'US'}
          </div>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{val}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{row.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      title: 'Assigned Role',
      sortable: true,
      render: (val) => {
        let badgeClass = 'badge-info';
        if (val === 'Administrator') badgeClass = 'badge-error';
        if (val === 'Security Analyst') badgeClass = 'badge-warning';
        if (val === 'DevOps Engineer') badgeClass = 'badge-success';
        return <span className={`badge ${badgeClass}`}>{val}</span>;
      }
    },
    {
      key: 'department',
      title: 'Department',
      sortable: true,
      render: (val) => <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{val || 'Operations'}</span>
    },
    {
      key: 'lastLogin',
      title: 'Last Active Session',
      sortable: true,
      render: (val) => (
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {val}
        </span>
      )
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (val) => <StatusBadge type="status" value={val} />
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, row) => (
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          <button
            type="button"
            className="btn-secondary"
            style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
            onClick={() => handleOpenEdit(row)}
            title="Edit User"
          >
            <Edit2 size={13} />
            <span>Edit</span>
          </button>
          <button
            type="button"
            className="btn-danger"
            style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
            onClick={() => setDeletingUser(row)}
            title="Delete User"
          >
            <Trash2 size={13} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div>
      {/* Toast */}
      {toastMessage && (
        <div className="toast-notification success">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-title">
          <h1>
            <UsersIcon size={28} style={{ color: 'var(--primary-blue)' }} />
            Administrator User Management
          </h1>
          <p className="page-header-subtitle">
            Configure system operator accounts, assign role permissions and audit access controls
          </p>
        </div>

        <div className="page-header-actions">
          <button
            type="button"
            className="btn-primary"
            onClick={handleOpenAdd}
          >
            <UserPlus size={16} />
            <span>Add New User</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-body" style={{ padding: '1.25rem 1.5rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: '1 1 280px' }}>
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search administrators by name or email..."
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Filter Role:</span>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                style={{ minWidth: '160px' }}
              >
                <option value="ALL">All Roles</option>
                {userRolesList.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>

              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedRole('ALL');
                }}
              >
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Users DataTable */}
      <DataTable
        columns={columns}
        data={filteredUsers}
        keyField="id"
        pageSize={8}
        isLoading={isLoading}
        emptyMessage="No administrators or operators matched your search."
      />

      {/* Add User Modal */}
      {showAddModal && (
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Create New Administrator Account"
          icon={UserPlus}
          size="lg"
          footer={
            <>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={handleSaveAdd}
              >
                Create Account
              </button>
            </>
          }
        >
          <form onSubmit={handleSaveAdd}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Full Legal Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Gupta"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Corporate Email Address *</label>
                <input
                  type="email"
                  placeholder="name@logmonitor.internal"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">System Security Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  {userRolesList.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Department / Unit</label>
                <input
                  type="text"
                  placeholder="e.g. Site Reliability Engineering"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Account Initial Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Temporary Initial Password</label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>
          </form>
        </Modal>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <Modal
          isOpen={!!editingUser}
          onClose={() => setEditingUser(null)}
          title={`Edit Administrator: ${editingUser.name}`}
          icon={Edit2}
          size="lg"
          footer={
            <>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setEditingUser(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={handleSaveEdit}
              >
                Save Changes
              </button>
            </>
          }
        >
          <form onSubmit={handleSaveEdit}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">System Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  {userRolesList.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Contact Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deletingUser && (
        <Modal
          isOpen={!!deletingUser}
          onClose={() => setDeletingUser(null)}
          title="Confirm Account Deletion"
          icon={Trash2}
          footer={
            <>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setDeletingUser(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-danger"
                onClick={handleConfirmDelete}
              >
                Delete Account Permanently
              </button>
            </>
          }
        >
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Are you sure you want to revoke access and permanently delete the administrator profile for <strong>{deletingUser.name}</strong> ({deletingUser.email})?
          </p>
        </Modal>
      )}
    </div>
  );
};

export default Users;
