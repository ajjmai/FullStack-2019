const { ApolloServer, gql } = require("apollo-server");
const uuid = require("uuid/v1");
const mongoose = require("mongoose");
const Book = require("./models/book");
const Author = require("./models/author");
const jwt = require("jsonwebtoken");

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const MONGODB_URI =
  "mongodb+srv://fullstack:pw@cluster0-rcvs5.mongodb.net/graphql?retryWrites=true";

const JWT_SECRET = "Bearer";

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error connecting to MongoDB: ", error.message);
  });

const typeDefs = gql`
  type Book {
    title: String!
    author: Author!
    published: String!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: String
    bookCount: Int
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: String!
      genres: [String]
    ): Book
    editAuthor(name: String!, setBornTo: String): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: () => Book.find({}).populate("author"),
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: parent => {
      return Book.collection.countDocuments({ author: parent });
    }
  },
  Book: {
    author: root => {
      const author = Author.findOne({ name: root.author.name });
      return {
        author: author
      };
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          });
        }
      }
      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author._id
      });
      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }

      return book;
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }

      return author;
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username });
      return user.save().catch(error => {
        throw new UserInputError(error.message, { invalidArgs: args });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secred") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
