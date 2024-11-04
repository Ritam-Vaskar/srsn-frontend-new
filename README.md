
# SRSN Frontend

Welcome to the **SRSN Frontend** repository! This React-based application is the frontend for the Sriramkrishna Siksha Niketan platform, enabling effective management and engagement with the school’s community, alumni network, and event organization.


## Overview
The SRSN Frontend provides a seamless user experience for school staff, students, and alumni, featuring tools for managing profiles, displaying events, and controlling event statuses. Key features include:

- User registration and secure authentication
- Cloudinary integration for profile picture uploads
- Real-time event toggling for admins, with change history tracking
- Smooth scrolling to specific sections of the site
- Fully responsive design for mobile and desktop

The backend for this project is hosted at [srsnbackend.onrender.com](https://srsnbackend.onrender.com), and the frontend is deployed at [sriramkrishnasikshaniketan.me](https://sriramkrishnasikshaniketan.me/).

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Authors](#authors)
- [Contributing](#contributing)
- [License](#license)
- [Used By](#used-by)
- [Feedback](#feedback)

---
## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

Clone the repository:

```bash
  git clone https://github.com/Ritam-Vaskar/srsn-frontend-new.git
   cd srsn-frontend-new

```

Install dependencies:

```bash
  npm install
```
Add Environment Variables:

```bash
VITE_CLOUD_NAME=your_cloud_name
VITE_UPLOAD_PRESET=your_upload_preset
VITE_BACKEND_URL=your_backend_url
VITE_BOTPRESS_CHAT_URL=your_botpress_chat_url
VITE_BOTPRESS_CONFIG_URL=your_botpress_config_url



```
Start the server:

```bash
  npm run dev
```


## Features


- User Authentication: Provides secure login and registration with JWT-based authentication.
- Profile Management: Allows users to upload a profile picture using Cloudinary and update personal information.
- Event Management: Admins can view, toggle, and manage event statuses, with change history displayed in a separate table.

- Smooth Scrolling: Supports smooth scrolling to sections within the page, using HashLink.

- Responsive Design: Optimized for both desktop and mobile.

## Project Structure
The project structure follows a standard Node.js MVC architecture:

```plaintext
srsn-frontend-new/
├── public/                  # Static assets
├── src/
│   ├── ashramPages/         # Pages specific to Ashram-related content
│   ├── schoolPages/         # Pages related to school-specific content
│   ├── authentication/      # Components and utilities for authentication
│   ├── components/          # Reusable UI components
│   ├── context/             # Context API for global state management
│   ├── helpers/             # Utility functions for data processing and logic
│   ├── layouts/             # Layout components (e.g., headers, footers, sidebars)
│   ├── routes/              # Route configuration for navigation
│   ├── sections/            # Sections of pages or modular UI segments
│   ├── store/               # Redux store setup and slices
│   ├── App.js               # Main application component
│   ├── index.js             # Entry point
│   └── ...
└── package.json


```

## Tech Stack

- **React** : JavaScript library for building user interfaces.
- **Material-UI**: React component library for responsive UI design.
- **Axios**: Promise-based HTTP client for making API requests.
- **React Router**: Client-side routing for navigating between pages.
- **Cloudinary**: For image upload and storage.

## Authors

- [sandipto729](https://github.com/sandipto729)

- [Ritam-Vaskar](https://github.com/Ritam-Vaskar)


## Contributing

Contributions are welcome! Please fork this repository, create a new branch, and submit a pull request with a description of your changes.


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Used By

This project is used by the following companies:

- Student and Teachers of Sri Ramkrishna Siksha Niketan School (Primary and High Section)



## Feedback

If you have any feedback, please reach out to us at sandipto729@gamil.com
(Happy Coding)
