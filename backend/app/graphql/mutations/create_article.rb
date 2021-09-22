module Mutations
  class CreateArticle < BaseMutation
    # TODO: define return fields
    # field :post, Types::PostType, null: false
    field :article, Types::ArticleType, null: true
    field :errors, [String], null: true

    # TODO: define arguments
    # argument :name, String, required: true
    argument :title, String, required: true
    argument :body, String, required: true

    # TODO: define resolve method
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
