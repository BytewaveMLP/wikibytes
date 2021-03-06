module Mutations
  class CreateArticle < BaseMutation
    field :article, Types::ArticleType, null: true
    field :errors, [String], null: true

    argument :title, String, required: true
    argument :body, String, required: true

    def resolve(title:, body:)
      article = Article.new(
        title: title,
        body:  body
      )

      if article.save
        { article: article }
      else
        { errors: article.errors.full_messages }
      end
    end
  end
end
