module Mutations
  class EditArticle < BaseMutation
    field :article, Types::ArticleType, null: true
    field :errors, [String], null: true

    argument :id, ID, required: true
    argument :title, String, required: true
    argument :body, String, required: true

    def resolve(id:, title:, body:)
      article = Article.find(id)
      if article.update(title: title, body: body)
        { article: article }
      else
        { errors: article.errors.full_messages }
      end
    end
  end
end
