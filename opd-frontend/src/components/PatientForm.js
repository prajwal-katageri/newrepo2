import React, { useState } from 'react';

const PatientForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    mobile: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    validateField(name, formData[name]);
  };

  const validateField = (fieldName, value) => {
    let error = '';

    if (fieldName === 'name') {
      if (!value.trim()) {
        error = 'Name is required';
      } else if (value.trim().length < 2) {
        error = 'Name must be at least 2 characters';
      }
    }

    if (fieldName === 'mobile') {
      if (!value.trim()) {
        error = 'Mobile number is required';
      } else if (!/^\d{10}$/.test(value.trim())) {
        error = 'Mobile number must be exactly 10 digits';
      }
    }

    if (fieldName === 'address') {
      if (!value.trim()) {
        error = 'Address is required';
      } else if (value.trim().length < 5) {
        error = 'Address must be at least 5 characters';
      }
    }

    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));

    return error === '';
  };

  const validateForm = () => {
    const nameValid = validateField('name', formData.name);
    const mobileValid = validateField('mobile', formData.mobile);
    const addressValid = validateField('address', formData.address);

    setTouched({ name: true, mobile: true, address: true });

    return nameValid && mobileValid && addressValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.name && formData.address && formData.mobile) {
      if (validateForm()) {
        onSubmit(formData);
        setFormData({ name: '', address: '', mobile: '' });
        setErrors({});
        setTouched({});
      }
    } else {
      setTouched({ name: true, mobile: true, address: true });
      alert('Please fill all fields');
    }
  };

  const handleReset = () => {
    setFormData({ name: '', address: '', mobile: '' });
    setErrors({});
    setTouched({});
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <svg
              className="w-7 h-7 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            Patient Registration Form
          </h2>
          <p className="text-blue-100 text-sm mt-1">
            Fill in the details to register a new patient
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name Field */}
          <div className="form-group">
            <label 
              htmlFor="name" 
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Patient Name
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter patient's full name"
                required
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                  touched.name && errors.name
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                }`}
              />
            </div>
            {touched.name && errors.name && (
              <p className="mt-1 text-sm text-red-500 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.name}
              </p>
            )}
          </div>

          {/* Mobile Field */}
          <div className="form-group">
            <label 
              htmlFor="mobile" 
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Mobile Number
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter 10-digit mobile number"
                required
                maxLength="10"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                  touched.mobile && errors.mobile
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                }`}
              />
            </div>
            {touched.mobile && errors.mobile && (
              <p className="mt-1 text-sm text-red-500 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.mobile}
              </p>
            )}
          </div>

          {/* Address Field */}
          <div className="form-group">
            <label 
              htmlFor="address" 
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Address
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}