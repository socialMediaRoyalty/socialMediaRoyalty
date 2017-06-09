'use strict'

const db = require('APP/db')
    , {User, CartDetail, Cart, Product, Review, Order, Category, Promise} = db
    , {mapValues} = require('lodash')

function seedEverything() {
  const seeded = {
    users: users(),
    products: products()
  }
  seeded.carts = carts(seeded)
  seeded.cartDetails = cartDetails(seeded)
  seeded.reviews = reviews(seeded)
  seeded.orders = orders(seeded)
  seeded.categories = categories(seeded)

  return Promise.props(seeded)
}

const users = seed(User, {
  'god': {
    name: 'So many names',
    email: 'god@example.com',
    password: '1234',
    isAdmin: true,
    facebookLink: 'https://www.facebook.com/TheGoodLordAbove/god',
    twitterHandle: '@TheGoodGodAbove',
    instagramHandle: '@goodgodabove',
    snapChatHandle: '@goodlordabove',
    address: 'Everywhere'
  },
  'barack': {
    name: 'Barack Obama',
    email: 'barack@example.gov',
    password: '1234',
    isAdmin: true,
    facebookLink: 'https://www.facebook.com/TheGoodLordAbove/god',
    twitterHandle: '@BarackObama',
    instagramHandle: '@BarackObama',
    snapChatHandle: '@BarackObama',
    address: '100 Pennsylvania Avenue, Washington D.C. 94108'
  },
  'bo': {
    name: 'Bo Obama',
    email: 'bo@example.gov',
    password: '1234',
    facebookLink: 'https://www.facebook.com/boobama',
    twitterHandle: '@BoObama',
    instagramHandle: '@BoObama',
    snapChatHandle: '@BoObama',
    address: '100 Pennsylvania Avenue, Washington D.C. 94108'
  },
  'michelle': {
    name: 'Michelle Obama',
    email: 'michelle@example.gov',
    password: '1234',
    facebookLink: 'https://www.facebook.com/michelleobama',
    twitterHandle: '@MichelleObama',
    instagramHandle: '@MichelleObama',
    snapChatHandle: '@MichelleObama',
    address: '100 Pennsylvania Avenue, Washington D.C. 94108'
  },
})

const carts = seed(Cart,
  ({users}) => ({
    'cart1': { user_id: users.god.id },
    'cart2': { user_id: users.barack.id },
    'cart3': { user_id: users.bo.id },
    'cart4': { user_id: users.michelle.id },
  })
)

const products = seed(Product, {
  'prod1': {
    name: 'Facebook Fanpage Likes',
    available: true,
    quantity: 100,
    price: 5.99,
    ratings: 4,
    description: 'Increase your fan base!'
  },
  'prod2': {
    name: 'Facebook Post/ Photo Likes',
    available: true,
    quantity: 100,
    price: 5.99,
    ratings: 4,
    description: 'Get more likes!'
  },
  'prod3': {
    name: 'Facebook Comments',
    available: true,
    quantity: 100,
    price: 5.99,
    ratings: 4,
    description: 'Get more love!'
  },
  'prod4': {
    name: 'Facebook Video Views',
    available: true,
    quantity: 100,
    price: 5.99,
    ratings: 4,
    description: 'Get more viewers!'
  }
})

const cartDetails = seed(CartDetail,
({carts, products}) => ({
  '1': {
    quantity: 2,
    cart_id: carts.cart1.id,
    product_id: products.prod1.id
  },
  '2': {
    quantity: 2,
    cart_id: carts.cart2.id,
    product_id: products.prod2.id
  },
  '3': {
    quantity: 1,
    cart_id: carts.cart3.id,
    product_id: products.prod3.id
  },
  '4': {
    quantity: 3,
    cart_id: carts.cart4.id,
    product_id: products.prod4.id
  }
})
)

const reviews = seed(Review,
({users, products}) => ({
  '1': {
    rating: 4,
    date: Date(),
    comment: 'All the comments were great, but I wish they could be more detailed',
    user_id: users.god.id,
    product_id: products.prod3.id
  },
  '2': {
    rating: 1,
    date: Date(),
    comment: 'The Facebook likes have not increased my popularity on Facebook which is what I expected it would do',
    user_id: users.bo.id,
    product_id: products.prod1.id
  },
  '3': {
    rating: 5,
    date: Date(),
    comment: 'The more views I get, the more people watch my videos! This is a great product.',
    user_id: users.michelle.id,
    product_id: products.prod4.id
  },
  '4': {
    rating: 3,
    date: Date(),
    comment: 'My photos have the most likes of all my friends! They all think I am so popular! So cool!',
    user_id: users.barack.id,
    product_id: products.prod2.id
  }
}))

const orders = seed(Order,
  ({users}) => ({
    '1': {
      status: 'received',
      purchaseDate: new Date(),
      user_id: users.god.id,
    },
    '2': {
      status: 'delivered',
      purchaseDate: new Date(),
      user_id: users.barack.id,
    },
    '3': {
      status: 'processed',
      purchaseDate: new Date(),
      user_id: users.bo.id,
    },
    '4': {
      status: 'received',
      purchaseDate: new Date(),
      user_id: users.michelle.id,
    }
  })
)

const categories = seed(Category,
  ({products}) => ({
    '1': {
      name: 'Facebook',
      product_id: products.prod1.id,
    },
    '2': {
      name: 'Instagram',
      product_id: products.prod2.id,
    },
    '3': {
      name: 'Youtube',
      product_id: products.prod3.id,
    },
    '4': {
      name: 'Snapchat',
      product_id: products.prod4.id,
    }
  })
)

if (module === require.main) {
  db.didSync
    .then(() => db.sync({force: true}))
    .then(seedEverything)
    .finally(() => process.exit(0))
}

class BadRow extends Error {
  constructor(key, row, error) {
    super(error)
    this.cause = error
    this.row = row
    this.key = key
  }

  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`
  }
}

// seed(Model: Sequelize.Model, rows: Function|Object) ->
//   (others?: {...Function|Object}) -> Promise<Seeded>
//
// Takes a model and either an Object describing rows to insert,
// or a function that when called, returns rows to insert. returns
// a function that will seed the DB when called and resolve with
// a Promise of the object of all seeded rows.
//
// The function form can be used to initialize rows that reference
// other models.
function seed(Model, rows) {
  return (others={}) => {
    if (typeof rows === 'function') {
      rows = Promise.props(
        mapValues(others,
          other =>
            // Is other a function? If so, call it. Otherwise, leave it alone.
            typeof other === 'function' ? other() : other)
      ).then(rows)
    }

    return Promise.resolve(rows)
      .then(rows => Promise.props(
        Object.keys(rows)
          .map(key => {
            const row = rows[key]
            return {
              key,
              value: Promise.props(row)
                .then(row => Model.create(row)
                  .catch(error => { throw new BadRow(key, row, error) })
                )
            }
          }).reduce(
            (all, one) => Object.assign({}, all, {[one.key]: one.value}),
            {}
          )
        )
      )
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`)
        return seeded
      }).catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`)
      })
  }
}

module.exports = Object.assign(seed, {users, products, carts, cartDetails, reviews, orders, categories})
