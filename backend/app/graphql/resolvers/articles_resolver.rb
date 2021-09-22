module Resolvers
  class ArticlesResolver < Resolvers::BaseResolver
    type Types::ArticleType.connection_type, null: false

    def resolve
      Article.all
    end
  end
end
