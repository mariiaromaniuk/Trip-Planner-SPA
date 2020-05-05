const Sequalize = require('sequalize');
const db = new Sequalize('postgres://localhost:5432/tripplanner-spa', {
    logging: false,
});

const Place = db.define('place', {
    address: {
        type: Sequalize.STRING,
        allowNull: false
    },
    city: {
        type: Sequalize.STRING,
        allowNull: false
    },
    state: {
        type: Sequalize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequalize.STRING,
        allowNull: false
    },
    location: {
        type: Sequalize.FLOAT,
        allowNull: false
    }
});

const Hotel = db.define("hotel", {
  name: {
    type: Sequalize.STRING,
    allowNull: false,
  },
  num_stars: {
    type: Sequalize.FLOAT,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  aminities: {
    type: Sequalize.STRING,
    allowNull: false
  }
});

const Activity = db.define('activity', {
    name: {
        type: Sequalize.STRING,
        allowNull: false
    },
    age_range: {
        type: Sequalize.STRING
    }
})

const Restaurant = db.define('restaurant', {
    name: {
        type: Sequalize.STRING,
        allowNull: false
    },
    cuisine: {
        type: Sequalize.STRING,
        allowNull: false
    },
    price: {
        type: Sequalize.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    }
})

Hotel.belongsTo(Place);
Place.hasOne(Hotel, {
    foreignKey: 'placeId'
});

Restaurant.belongsTo(Place);
Place.hasOne(Restaurant, {
    foreignKey: 'placeId'
});

Activity.belongsTo(Place);
Place.hasOne(Activity, {
    foreignKey: 'placeId'
});