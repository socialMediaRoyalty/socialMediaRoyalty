'use strict'

const db = require('APP/db')
    , {User, CartDetail, Cart, Product, Review, Order, Category, OrderDetail, CategoryProduct, OrderProducts, ProductReview, Promise} = db
    , {mapValues} = require('lodash')
    , catProd = db.models.category_product
    , prodRev = db.models.product_review

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
  seeded.orderDetails = orderDetails(seeded)
  seeded.categoryProduct = categoryProduct(seeded)

  seeded.productReview = productReview(seeded)

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
    imageUrl: 'https://en.facebookbrand.com/wp-content/themes/fb-branding/prj-fb-branding/assets/images/thumb-drawn.svg',
    description: 'Increase your fan base!'
  },
  'prod2': {
    name: 'Animal Friends Post',
    available: true,
    quantity: 100,
    price: 5.99,
    ratings: 4,
    imageUrl: 'http://kids.nationalgeographic.com/content/dam/kids/photos/articles/Other%20Explore%20Photos/R-Z/Wacky%20Weekend/Animal%20Friendships/ww-animal-friendships-kitten-chick.adapt.945.1.jpg',
    description: 'Get more likes with these cute animal friends!'
  },
  'prod3': {
    name: 'Facebook Comments',
    available: true,
    quantity: 100,
    price: 5.99,
    ratings: 4,
    imageUrl: 'http://newwallpapershd.com/wp-content/uploads/2014/10/Funny-Facebook-Comment-Pictures-download-2.jpg',
    description: 'Get more love!'
  },
  'prod4': {
    name: 'Mean Facebook Post',
    available: true,
    quantity: 100,
    price: 5.99,
    ratings: 4,
    imageUrl: 'https://www.postplanner.com/hs-fs/hub/513577/file-2882290107-png/blog-files/screen-shot-2015-01-06-at-5.03.27-pm.png?t=1497029622634&width=428&height=285&name=screen-shot-2015-01-06-at-5.03.27-pm.png',
    description: 'Be snarky'
  },
  'prod5': {
    name: 'Instagram Foodie Post',
    available: true,
    quantity: 100,
    price: 5.99,
    ratings: 4,
    imageUrl: 'https://themuslimvibe.com/wp-content/uploads/2016/08/insta-food.jpg',
    description: 'Be the best Instagram Foodie!'
  },
  'prod6': {
    name: 'Become a Sponsored Instagrammer',
    available: true,
    quantity: 100,
    price: 5.99,
    ratings: 4,
    imageUrl: 'https://news.starbucks.com/uploads/images/Beverages/Caramel_Cocoa_Cluster_Low_Res.JPG',
    description: 'Get paid to eat pretty food'
  },
  'prod7': {
    name: 'Vacation Photo Post',
    available: true,
    quantity: 100,
    price: 5.99,
    ratings: 4,
    imageUrl: 'https://i.redditmedia.com/GR-wAcP9LdcCUqEpPFyp75fk91xptLSkdlWWAgXYJNQ.jpg?w=768&s=7fe05719f636626c78fbe4523a2e73e2',
    description: 'Make your friends jealous!'
  },
  'prod8': {
    name: 'Youtube Subscribers',
    available: true,
    quantity: 100,
    price: 5.99,
    ratings: 4,
    imageUrl: 'https://www.youtube.com/yt/brand/media/image/YouTube-icon-full_color.png',
    description: 'Become a Youtube Superstar!'
  },
  'prod9': {
    name: 'Start a Makeup Youtube Channel',
    available: true,
    quantity: 100,
    price: 5.99,
    ratings: 4,
    imageUrl: 'https://fashionista.com/.image/t_share/MTIwOTExMDU3MTAyMzY5ODIy/primary-photo.jpg',
    description: 'Become a Youtube Superstar!'
  },
  'prod10': {
    name: 'SnapChat Story',
    available: true,
    quantity: 100,
    price: 5.99,
    ratings: 4,
    imageUrl: 'https://tctechcrunch2011.files.wordpress.com/2016/03/2-snapcode-to-special-discover-channel.png?w=320&h=320',
    description: 'A hilarious Snapchat story'
  },
  'prod11': {
    name: 'SnapChat Story',
    available: true,
    quantity: 100,
    price: 5.99,
    ratings: 4,
    imageUrl: 'https://static1.businessinsider.com/image/55f97e93dd08952e3a8b4724/snapchats-new-selfie-filters-are-super-trippy.jpg',
    description: 'A hilarious Snapchat filtered photo'
  },
  'prod12': {
    name: 'Youtube Views',
    available: true,
    quantity: 100,
    price: 5.99,
    ratings: 4,
    imageUrl: 'https://i.ytimg.com/vi/QcC9v9ANTWU/maxresdefault.jpg',
    description: 'SO MANY VIEWS!!!'
  },
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
  'rev1': {
    rating: 4,
    date: Date(),
    comment: 'All the comments were great, but I wish they could be more detailed',
    user_id: users.god.id,
    product_id: products.prod3.id
  },
  'rev2': {
    rating: 1,
    date: Date(),
    comment: 'The Facebook likes have not increased my popularity on Facebook which is what I expected it would do',
    user_id: users.bo.id,
    product_id: products.prod1.id
  },
  'rev3': {
    rating: 5,
    date: Date(),
    comment: 'The more views I get, the more people watch my videos! This is a great product.',
    user_id: users.michelle.id,
    product_id: products.prod4.id
  },
  'rev4': {
    rating: 3,
    date: Date(),
    comment: 'My photos have the most likes of all my friends! They all think I am so popular! So cool!',
    user_id: users.barack.id,
    product_id: products.prod2.id
  }
}))

const orders = seed(Order,
  ({users}) => ({
    'order1': {
      status: 'received',
      purchaseDate: new Date(),
      user_id: users.god.id,
    },
    'order2': {
      status: 'shipped',
      purchaseDate: new Date(),
      user_id: users.barack.id,
    },
    'order3': {
      status: 'processed',
      purchaseDate: new Date(),
      user_id: users.bo.id,
    },
    'order4': {
      status: 'received',
      purchaseDate: new Date(),
      user_id: users.michelle.id,
    }
  })
)

const categories = seed(Category,
  ({products}) => ({
    'cat1': {
      name: 'Facebook',
      product_id: products.prod1.id,
    },
    'cat2': {
      name: 'Instagram',
      product_id: products.prod2.id,
    },
    'cat3': {
      name: 'Youtube',
      product_id: products.prod3.id,
    },
    'cat4': {
      name: 'Snapchat',
      product_id: products.prod4.id,
    }
  })
)

const orderDetails = seed(OrderDetail,
  ({orders, products}) => ({
    'ordDet1': {
      purchasedPrice: 5.99,
      quantity: 2,
      order_id: orders.order1.id,
      product_id: products.prod1.id,
    },
    'ordDet2': {
      purchasedPrice: 5.99,
      quantity: 1,
      order_id: orders.order2.id,
      product_id: products.prod4.id,
    },
    'ordDet3': {
      purchasedPrice: 5.99,
      quantity: 3,
      order_id: orders.order3.id,
      product_id: products.prod2.id,
    },
    'ordDet4': {
      purchasedPrice: 5.99,
      quantity: 2,
      order_id: orders.order4.id,
      product_id: products.prod3.id,
    }
  })
)

const categoryProduct = seed(catProd,
  ({categories, products}) => ({
    '1': {
      product_id: products.prod1.id,
      category_id: categories.cat1.id,
    },
    '2': {
      product_id: products.prod2.id,
      category_id: categories.cat1.id,
    },
    '3': {
      product_id: products.prod3.id,
      category_id: categories.cat1.id,
    },
    '4': {
      product_id: products.prod4.id,
      category_id: categories.cat1.id,
    },
    '5': {
      product_id: products.prod5.id,
      category_id: categories.cat2.id,
    },
    '6': {
      product_id: products.prod6.id,
      category_id: categories.cat2.id,
    },
    '7': {
      product_id: products.prod7.id,
      category_id: categories.cat2.id,
    },
    '8': {
      product_id: products.prod8.id,
      category_id: categories.cat3.id,
    },
    '9': {
      product_id: products.prod9.id,
      category_id: categories.cat3.id,
    },
    '10': {
      product_id: products.prod10.id,
      category_id: categories.cat4.id,
    },
    '11': {
      product_id: products.prod11.id,
      category_id: categories.cat4.id,
    },
    '12': {
      product_id: products.prod12.id,
      category_id: categories.cat3.id,
    }
  })
)

const productReview = seed(prodRev,
  ({products, reviews}) => ({
    '1': {
      product_id: products.prod3.id,
      review_id: reviews.rev1.id
    },
    '2': {
      product_id: products.prod1.id,
      review_id: reviews.rev2.id
    },
    '3': {
      product_id: products.prod4.id,
      review_id: reviews.rev3.id
    },
    '4': {
      product_id: products.prod2.id,
      review_id: reviews.rev4.id
    },
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

module.exports = Object.assign(seed, {users, products, carts, cartDetails, reviews, orders, categories, orderDetails, categoryProduct, productReview})

