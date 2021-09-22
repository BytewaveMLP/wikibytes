module Resolvers
  class ArticleResolver < Resolvers::BaseResolver
    type Types::ArticleType, null: false

    argument :id, ID, required: true

    def resolve(id:)
      Article.find(id)
    end
  end
end
