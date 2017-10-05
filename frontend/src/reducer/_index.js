
export default function(state, action) {
  return {
    app: {
      global: {
        loggedIn: true,
      },
      users: {
        editMode: true,
        selected: 0,
        updates: {
          firstName: "",
          lastName: "",
          role: "",
          email: "",
          oldPassword: "",
          newPassword: ""
        }
      },
      timezones: {
        selected: 1
      }
    },
    user: {
      id: 1,
      role: 'ADMIN',
      firstName: 'Ted',
      lastName: 'Mosby',
      email: 'tedmosby@gmail.com',
    },
    timezones: [],
    users: [],
  }
}