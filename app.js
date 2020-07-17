const express = require('express')
const app = express()
const port = 3000
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require('bcrypt');
const mongodb = require('mongodb');
// get config vars
dotenv.config();
app.use(express.urlencoded());
app.use(express.json());
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'pastry';
var ObjectId = require('mongodb').ObjectID;


app.get('/', (req, res) => res.send('Hello World!'))
app.post('/addProduct', authenticateToken, verifyAdmin, addProduct)//admin
app.get('/products', authenticateToken, listProducts)//
app.get('/product/:id', authenticateToken, getProductById)
// app.delete('/product/:id', authenticateToken, verifyAdmin, deleteProductById)//admin
// app.put('/product/:id', authenticateToken, updateProduct)

app.post('/user', addUser)
app.get('/users', authenticateToken, verifyAdmin, listUsers)
app.get('/user/:id', authenticateToken, getUserById)
app.delete('/user/:id', authenticateToken, verifyAdmin, deleteUserById)
app.put('/user/:id', authenticateToken, updateUser)
app.post('/login', loginUser)

app.post('/addRecipe', authenticateToken, addRecipe)
app.get('/recipes', authenticateToken, listRecipes)
app.get('/recipe/:id', authenticateToken, getRecipeById)
app.delete('/recipe/:id', authenticateToken, verifyRecipeOwner, deleteRecipeById)
app.get('/user/recipe/:id', authenticateToken, getRecipeByUserId)


app.post('/addComment', authenticateToken, addComment)
app.get('/comments', authenticateToken, listComments)
app.get('/comment/recipe/:id', authenticateToken, getCommentByRecipeId)
app.delete('/comment/:id', authenticateToken,  verifyCommentOwner, deleteCommentById)
app.get('/recipe/:id', authenticateToken, getCommentById)
app.put('/product/:id', authenticateToken, updateComment)


app.post('/addOrder', authenticateToken, addOrder)
app.get('/order/:id', authenticateToken, getOrderById)
app.get('/order/user/:id', authenticateToken, getOrderByUserId)

MongoClient.connect(url, function(err, client) {
    app.locals.db = client.db('pastry');;
});
function generateAccessToken(data) {
    return jwt.sign(data, process.env.TOKEN_SECRET, {
        expiresIn: '1h'
    });
}
//Users
function addUser(req, res) {
    // Create a new MongoClient
    const client = new MongoClient(url);

    // Use connect method to connect to the Server
    client.connect(function (err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        const newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: bcrypt.hashSync(req.body.password, 10),
            email: req.body.email,
            phone: req.body.phone,
            city: req.body.city,
            address: req.body.address,
            image: req.body.image,
            role: req.body.role,
        }

        // Get the documents collection
        const collection = db.collection('users');
        // Insert some documents

        collection.findOne({
            'email': req.body.email
        }).then(function (user) {
            if (user) {
                console.log('found with this email')
                parentvalidationErr = true;
                res.status('500');
                res.send({
                    message: 'Error: Email already in use'
                });
                return true;
            } else {
                collection.insertOne(
                    newUser,
                    function (err, result) {
                        if (err) {
                            res.status(500).send({
                                message: "Failed adding user"
                            });
                            throw err
                        }
                        console.log("Inserted 1 user into the collection");
                        res.status(201)
                        res.send(JSON.parse('{}'))
                        client.close();
                    });
            }
        }).catch(function (err) {
            console.log(err)
        });

    })
}

function listUsers(req, res, body) {
    const client = new MongoClient(url);
    client.connect(function (err) {
        console.log('client connected');
        const db = client.db(dbName);

        db.collection('users').find().toArray(function (err, users) {
            if (err) {
                console.log(err)
                res.status(500).send({
                    message: "Error: coud not find users"
                })
            }
            res.send(users)
            console.log(users)
            client.close();
        });

    });
}

function getUserById(req, res) {
    const client = new MongoClient(url);
    client.connect(function (err) {
        const db = client.db(dbName);
        var myquery = {
            _id: ObjectId(req.params.id)
        };
        db.collection("users").findOne(myquery, function (err, user) {
            if (err) {
                console.log(err)
                res.status(500).send({
                    message: "Error: coud not find user id"
                })
            }
            console.log("found user");
            console.log(user);
            res.send(user);
            client.close();
        });
    });
}

function deleteUserById(req, res) {
    const client = new MongoClient(url);
    client.connect(function (err) {
        const db = client.db(dbName);
        var myquery = {
            _id: ObjectId(req.params.id)
        };
        db.collection("users").deleteOne(myquery, function (err) {
            if (err) {
                console.log(err)
                res.status(500).send({
                    message: "Error: coud not delete user"
                })
            }
            console.log("user deleted successfully");
            res.send();
            client.close();
        });
    });
}

function updateUser(req, res) {
    const client = new MongoClient(url);
    client.connect(function (err) {
        const db = client.db(dbName);
        var myquery = {
            _id: ObjectId(req.params.id)
        };
        db.collection("users").updateOne(myquery, {
            $set: req.body
        }, function (err, user) {
            if (err) {
                console.log(err)
                res.status(500).send({
                    message: "Error: coud not update user"
                })
            }
            console.log("updated user");
            console.log(user);
            res.set('Location', 'user/' + req.params.id)
            res.send(user);
            client.close();
        });
    });
}

function loginUser(req, res) {
    const client = new MongoClient(url);

    client.connect(function (err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        const collection = db.collection('users');
        collection.findOne({
            'email': req.body.email
        }).then(function (user) {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    // access config var
                    process.env.TOKEN_SECRET;
                    const token = generateAccessToken({
                        email: req.body.email,
                        role: user.role,
                        id: user._id
                    });
                    res.json(token);
                    res.send();
                } else {
                    console.log('password dont match')
                    // Passwords don't match
                    res.status(403);
                    res.send({
                        'message': 'Invalid email or password'
                    })
                }
            }
        }).catch(function (error) {
            console.log('error is', error)
            res.status(403);
            res.send({
                'message': 'Error processing login request'
            })
        });
    });
    client.close();
}

//Products
function addProduct(req, res) {

    // Create a new MongoClient
    const client = new MongoClient(url);

    // Use connect method to connect to the Server
    client.connect(function (err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        const newProduct = {
            id: req.body.id,
            productName: req.body.productName,
            productCode: req.body.productCode,
            releaseDate: req.body.releaseDate,
            description: req.body.description,
            price: req.body.price,
            starRating: req.body.starRating,
            imageUrl: req.body.imageUrl
        }

        // Get the documents collection
        const collection = db.collection('products');
        // Insert some documents
        collection.insertOne(
            newProduct,
            function (err, result) {
                if (err) {
                    console.log(err)
                    res.status(500).send({
                        message: "Error: coud not add product"
                    })
                }
                console.log("Inserted 1 product into the collection");
                res.status(201)
                res.set('Location', 'shop/' + result.insertedId)
                res.send(JSON.parse('{}'))
                client.close();
            });

    });
}

function listProducts(req, res, body) {
    const client = new MongoClient(url);
    client.connect(function (err) {
        console.log('client connected');
        const db = client.db(dbName);

        db.collection('products').find().toArray(function (err, products) {
            if (err) {
                console.log(err)
                res.status(500).send({
                    message: "Error: coud not list products"
                })
            }
            res.send(products)
            console.log(products)
            client.close();
        });

    });
}

function getProductById(req, res) {
    const client = new MongoClient(url);
    client.connect(function (err) {
        const db = client.db(dbName);
        var myquery = {
            _id: ObjectId(req.params.id)
        };
        db.collection("products").findOne(myquery, function (err, product) {
            if (err) {
                console.log(err)
                res.status(500).send({
                    message: "Error: coud not find product"
                })
            }
            console.log("found product");
            console.log(product);
            res.send(product);
            client.close();
        });
    });
}

function updateProduct(req, res) {
    const client = new MongoClient(url);
    client.connect(function (err) {
        const db = client.db(dbName);
        var myquery = {
            _id: ObjectId(req.params.id)
        };
        db.collection("products").updateOne(myquery, {
            $set: req.body
        }, function (err, product) {
            if (err) {
                console.log(err)
                res.status(500).send({
                    message: "Error: coud not update product"
                })
            }
            console.log("updated product");
            console.log(product);
            res.set('Location', 'product/' + req.params.id)
            res.send(product);
            client.close();
        });
    });
}

function deleteProductById(req, res) {
    const client = new MongoClient(url);
    client.connect(function (err) {
        const db = client.db(dbName);
        var myquery = {
            _id: ObjectId(req.params.id)
        };
        db.collection("products").deleteOne(myquery, function (err) {
            if (err) {
                console.log(err)
                res.status(500).send({
                    message: "Error: coud not delete product"
                })
            }
            console.log("deleted successfully");
            res.send();
            client.close();
        });
    });
}

//Recipes
function addRecipe(req, res) {

    // Create a new MongoClient
    const client = new MongoClient(url);

    // Use connect method to connect to the Server
    client.connect(function (err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);


        const newRecipe = {
            id: req.body.id,
            recipeName: req.body.recipeName,
            description: req.body.description,
            directions: req.body.directions,
            ingredients: req.body.ingredients,
            difficulty: req.body.difficulty,
            numberServings: req.body.numberServings,
            prepTime: req.body.prepTime,
            cookTime: req.body.cookTime,
            imageUrl: req.body.imageUrl,
            user_id: req.body.user_id,
        }

        // Get the documents collection
        const collection = db.collection('recipes');
        // Insert some documents
        collection.insertOne(
            newRecipe,
            function (err, result) {
                if (err) {
                    console.log(err)
                    res.status(500).send({
                        message: "Error: coud not create recipe"
                    })
                }
                console.log("Inserted recipe into the collection");
                res.status(201)
                // res.set('Location', 'recipe/' + result.insertedId)
                res.send(JSON.parse('{}'))
                client.close();
            });

    });
}

function listRecipes(req, res, body) {
    const client = new MongoClient(url);
    client.connect(function (err) {
        console.log('client connected');
        const db = client.db(dbName);

        db.collection('recipes').find().toArray(function (err, recipes) {
            if (err) {
                console.log(err)
                res.status(500).send({
                    message: "Error: coud not find recipes"
                })
            }
            res.send(recipes)
            console.log(recipes)
            client.close();
        });

    });
}

function getRecipeById(req, res) {
    const client = new MongoClient(url);
    client.connect(function (err) {
        const db = client.db(dbName);
        var myquery = {
            _id: ObjectId(req.params.id)
        };
        db.collection("recipes").findOne(myquery, function (err, recipe) {
            if (err) {
                console.log(err)
                res.status(500).send({
                    message: "Error: coud not find recipe"
                })
            }
            console.log("found recipe");
            console.log(recipe);
            res.send(recipe);
            client.close();
        });
    });
}

function deleteRecipeById(req, res) {
    const client = new MongoClient(url);
    client.connect(function (err) {
        const db = client.db(dbName);
        var myquery = {
            _id: ObjectId(req.params.id)
        };
        db.collection("recipes").deleteOne(myquery, function (err) {
            if (err) {
                console.log(err)
                res.status(500).send({
                    message: "Error: coud not delete recipe"
                })
            }

            console.log("deleted successfully");
            res.send();
            client.close();
        });
    });
}

function getRecipeByUserId(req, res, body) {
    const client = new MongoClient(url);
    client.connect(function (err) {
        console.log('client connected');
        const db = client.db(dbName);
        var myquery = {
            user_id: req.params.id
        };
        db.collection("recipes").find(myquery).toArray(function (err, user) {
            console.log(err)
            if (err) {
                console.log(err)
                res.status(500).send({
                    message: "Error: coud not get user"
                })
            }
            res.send(user)
            console.log(user)
            client.close();

        });

    });
}

//Comments
function addComment(req, res) {

    // Create a new MongoClient
    const client = new MongoClient(url);

    // Use connect method to connect to the Server
    client.connect(function (err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);


        const newComment = {
            id: req.body.id,
            name: req.body.name,
            text: req.body.text,
            recipe_id: req.body.recipe_id,
            user_id: req.body.user_id,
            rating: req.body.rating,
        }

        // Get the documents collection
        const collection = db.collection('comments');
        // Insert some documents
        collection.insertOne(
            newComment,
            function (err, result) {
                if (err) {
                    console.log(err)
                    res.status(500).send({
                        message: "Error: coud not add comment"
                    })
                }
                console.log("Inserted comment into the collection");
                res.status(201)
                res.set('Location', 'comment/' + result.insertedId)
                console.log("location " + 'comment/' + result.insertedId);
                res.send(JSON.parse('{}'))
                client.close();
            });

    });
}

function getCommentByRecipeId(req, res, body) {
    const client = new MongoClient(url);
    client.connect(function (err) {
        console.log('client connected');
        const db = client.db(dbName);
        var myquery = {
            recipe_id: req.params.id
        };
        db.collection("comments").find(myquery).toArray(function (err, comment) {
            console.log(err)
            if (err) {
                console.log(err)
                res.status(500).send({
                    message: "Error: coud not get comment"
                })
            }
            res.send(comment)
            console.log(comment)
            client.close();

        });

    });
}

function listComments(req, res, body) {
    const client = new MongoClient(url);
    client.connect(function (err) {
        console.log('client connected');
        const db = client.db(dbName);

        db.collection('comments').find().toArray(function (err, comments) {
            if (err) {
                console.log(err)
                res.status(500).send({
                    message: "Error: coud not list comments"
                })
            }
            res.send(comments)
            console.log(comments)
            client.close();
        });

    });
}

function deleteCommentById(req, res) {
    const client = new MongoClient(url);
    client.connect(function (err) {
        const db = client.db(dbName);
        var myquery = {
            _id: ObjectId(req.params.id)
        };
        db.collection("comments").deleteOne(myquery, function (err) {
            if (err) {
                console.log(err)
                res.status(500).send({
                    message: "Error: coud not delete comment"
                })
            }
            console.log("deleted successfully");
            res.send();
            client.close();
        });
    });
}

function getCommentById(req, res) {
    const client = new MongoClient(url);
    client.connect(function (err) {
        const db = client.db(dbName);
        var myquery = {
            _id: ObjectId(req.params.id)
        };
        db.collection("comments").findOne(myquery, function (err, comment) {
            if (err) {
                console.log(err)
                res.status(500).send({
                    message: "Error: coud not get comment"
                })
            }
            console.log("found comment");
            console.log(comment);
            res.send(comment);
            client.close();
        });
    });
}

function updateComment(req, res) {
    const client = new MongoClient(url);
    client.connect(function (err) {
        const db = client.db(dbName);
        var myquery = {
            _id: ObjectId(req.params.id)
        };
        db.collection("comments").updateOne(myquery, {
            $set: req.body
        }, function (err, comment) {
            if (err) {
                console.log(err)
                res.status(500).send({
                    message: "Error: coud not update comment"
                })
            }
            console.log("found comment");
            console.log(comment);
            res.set('Location', 'comment/' + req.params.id)
            res.send(comment);
            client.close();
        });
    });
}
//orders
function addOrder(req, res) {

    // Create a new MongoClient
    const client = new MongoClient(url);

    // Use connect method to connect to the Server
    client.connect(function (err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);


        const newOrder = {
            id: req.body.id,
            products: req.body.products,
            totalSum: req.body.totalSum,
            address: req.body.address,
            user_id: req.body.user_id,
            order_id: req.body.order_id,
        }

        // Get the documents collection
        const collection = db.collection('orders');
        // Insert some documents
        collection.insertOne(
            newOrder,
            function (err, result) {
                if (err) {
                    console.log(err)
                    res.status(500).send({
                        message: "Error: coud not create order"
                    })
                }
                console.log("Inserted order into the collection");
                res.status(201)
                res.set('Location', 'order/' + result.insertedId)
                console.log("location " + 'order/' + result.insertedId);
                res.send(JSON.parse('{}'))
                client.close();
            });

    });
}

function getOrderById(req, res, body) {
    const client = new MongoClient(url);
    client.connect(function (err) {
        const db = client.db(dbName);
        var myquery = {
            _id: ObjectId(req.params.id)
        };
        db.collection("orders").findOne(myquery, function (err, order) {
            if (err) {
                console.log(err)
                res.status(500).send({
                    message: "Error: coud not get comment"
                })
            }
            console.log("found order");
            console.log(order);
            res.send(order);
            client.close();
        });
    });
}
function getOrderByUserId(req, res, body) {
    const client = new MongoClient(url);
    client.connect(function (err) {
        console.log('client connected');
        const db = client.db(dbName);
        var myquery = {
            user_id: req.params.id
        };
        db.collection("orders").find(myquery).toArray(function (err, order) {
            console.log(err)
            if (err) {
                console.log(err)
                res.status(500).send({
                    message: "Error: coud not get order"
                })
            }
            res.send(order)
            console.log(order)
            client.close();

        });

    });
}
function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // if there isn't any token
    jwt.verify(token, process.env.TOKEN_SECRET, function(err, user) {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next() // pass the execution off to whatever request the client intended
    })
}
function verifyAdmin(req, res, next) {
    const db = req.app.locals.db;
    if (req.user.role == 'admin') {
        next();
    } else {
      next({ status: 403, message: "Not enough privilegies for this operation." }); //Error
    }
}
function verifyRecipeOwner (req, res, next) {
    const paramRecipeId = req.params.id;
    const userId = req.user.id;
    const db = req.app.locals.db;
    console.log('db', db);
    console.log('paramRecipeId', paramRecipeId);
    console.log('userId', userId);
    if (!userId || !paramRecipeId ) next({ status: 403, message:  "No user provided." }); //Error
    else {
      db.collection('recipes').findOne({ _id: new mongodb.ObjectID(paramRecipeId) }, function (error, recipe) {
        if (error) next({ status: 500, message: "Server error.", error }); //Error
        else if (!recipe)  next({ status: 404, message: "not found." }); //Error
        else {
            if (req.user.role == "admin" || recipe.user_id == userId) {
                // if everything good, save user to request for use in other routes
                req.recipe = recipe;
                next();
            }
            else {
              next({ status: 403, message: "Not enough privilegies for this operation." });} //Error
        }
      });
    }
  }
  function verifyCommentOwner (req, res, next) {
    const paramCommentId = req.params.id;
    const userId = req.user.id;
    const db = req.app.locals.db;
    console.log('db', db);
    console.log('paramCommentId', paramCommentId);
    console.log('userId', userId);
    if (!userId || !paramCommentId ) next({ status: 403, message:  "No user provided." }); //Error
    else {
      db.collection('comments').findOne({ _id: new mongodb.ObjectID(paramCommentId) }, function (error, comment) {
        if (error) next({ status: 500, message: "Server error.", error }); //Error
        else if (!comment)  next({ status: 404, message: "not found." }); //Error
        else {
            if (req.user.role == "admin" || recipe.user_id == userId) {
                // if everything good, save user to request for use in other routes
                req.comment = comment;
                next();
            }
            else {
              next({ status: 403, message: "Not enough privilegies for this operation." });} //Error
        }
      });
    }
  }
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
