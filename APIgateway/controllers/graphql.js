const { sendFeedbackToKafka } = require('../services/KafkaProducer');
const User = require('../models/user');

const typeDefs = `
  type User {
    userId: String!
    preferences: Preferences
    feedbackHistory: [Feedback]
  }

  type Preferences {
    favoriteGenres: [String]
    dislikedGenres: [String]
  }

  type Feedback {
    movieId: String
    comment: String
    sentimentScore: Float
    timestamp: String
  }

  type Query {
    getUser(userId: String!): User
  }

  type Mutation {
    sendFeedback(userId: String!, comment: String!, genre: String!): Boolean
  }
`;

const resolvers = {
  Query: {
    getUser: async (_, { userId }) => {
      return await User.findOne({ userId });
    },
  },
  Mutation: {
    sendFeedback: async (_, { userId, comment, genre }) => {
      // Save to MongoDB
      await User.findOneAndUpdate(
        { userId },
        { 
          $push: { 
            feedbackHistory: { 
              genre, 
              comment,
              sentimentScore: 0 // Will be updated by feedback service later
            } 
          } 
        },
        { upsert: true, new: true }
      );
      
      // Send to Kafka for further processing
      await sendFeedbackToKafka({ userId, comment, genre });
      return true;
    },
  },
};

module.exports = { typeDefs, resolvers };