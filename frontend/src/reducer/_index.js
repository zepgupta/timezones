
export default function(state, action) {
  return {
    app: {
      global: {
        loggedIn: true,
      },
      users: {
        editMode: false,
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
        selected: 1,
        arr: [],
        city: 'New York',
        localTime: '2pm',
        utcOffset: '-4',
        name: 'test timezone'
      }
    },
    user: {
      id: 1,
      role: '',
      firstName: 'Ted',
      lastName: 'Mosby',
      email: 'tedmosby@gmail.com',
    },
    timezones: [{
      id: 1,
      city: 'New York',
      localTime: '2pm',
      utcOffset: '-4',
      name: 'test timezone'
    },{
      id: 1,
      city: 'New York',
      localTime: '2pm',
      utcOffset: '-4',
      name: 'test timezone'
    },{
      id: 1,
      city: 'New York',
      localTime: '2pm',
      utcOffset: '-4',
      name: 'test timezone'
    },{
      id: 1,
      city: 'New York',
      localTime: '2pm',
      utcOffset: '-4',
      name: 'test timezone'
    },{
      id: 1,
      city: 'New York',
      localTime: '2pm',
      utcOffset: '-4',
      name: 'test timezone'
    },{
      id: 1,
      city: 'New York',
      localTime: '2pm',
      utcOffset: '-4',
      name: 'test timezone'
    }],
    users: [{
      id: 1,
      role: 'ADMIN',
      firstName: 'Ted',
      lastName: 'Mosby',
      email: 'tedmosby@gmail.com',
    },{
      id: 2,
      role: 'ADMIN',
      firstName: 'Barney',
      lastName: 'Stinson',
      email: 'bstinson@gmail.com',
    },{
      id: 1,
      role: 'ADMIN',
      firstName: 'Ted',
      lastName: 'Mosby',
      email: 'tedmosby@gmail.com',
    },{
      id: 2,
      role: 'ADMIN',
      firstName: 'Barney',
      lastName: 'Stinson',
      email: 'bstinson@gmail.com',
    },{
      id: 1,
      role: 'ADMIN',
      firstName: 'Ted',
      lastName: 'Mosby',
      email: 'tedmosby@gmail.com',
    },{
      id: 2,
      role: 'ADMIN',
      firstName: 'Barney',
      lastName: 'Stinson',
      email: 'bstinson@gmail.com',
    },{
      id: 1,
      role: 'ADMIN',
      firstName: 'Ted',
      lastName: 'Mosby',
      email: 'tedmosby@gmail.com',
    },{
      id: 2,
      role: 'ADMIN',
      firstName: 'Barney',
      lastName: 'Stinson',
      email: 'bstinson@gmail.com',
    },{
      id: 1,
      role: 'ADMIN',
      firstName: 'Ted',
      lastName: 'Mosby',
      email: 'tedmosby@gmail.com',
    },{
      id: 2,
      role: 'ADMIN',
      firstName: 'Barney',
      lastName: 'Stinson',
      email: 'bstinson@gmail.com',
    },{
      id: 1,
      role: 'ADMIN',
      firstName: 'Ted',
      lastName: 'Mosby',
      email: 'tedmosby@gmail.com',
    },{
      id: 2,
      role: 'ADMIN',
      firstName: 'Barney',
      lastName: 'Stinson',
      email: 'bstinson@gmail.com',
    },{
      id: 1,
      role: 'ADMIN',
      firstName: 'Ted',
      lastName: 'Mosby',
      email: 'tedmosby@gmail.com',
    },{
      id: 2,
      role: 'ADMIN',
      firstName: 'Barney',
      lastName: 'Stinson',
      email: 'bstinson@gmail.com',
    },{
      id: 1,
      role: 'ADMIN',
      firstName: 'Ted',
      lastName: 'Mosby',
      email: 'tedmosby@gmail.com',
    },{
      id: 2,
      role: 'ADMIN',
      firstName: 'Barney',
      lastName: 'Stinson',
      email: 'bstinson@gmail.com',
    },{
      id: 1,
      role: 'ADMIN',
      firstName: 'Ted',
      lastName: 'Mosby',
      email: 'tedmosby@gmail.com',
    },{
      id: 2,
      role: 'ADMIN',
      firstName: 'Barney',
      lastName: 'Stinson',
      email: 'bstinson@gmail.com',
    }],
  }
}
