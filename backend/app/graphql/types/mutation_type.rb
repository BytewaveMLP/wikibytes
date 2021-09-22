# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :edit_article, mutation: Mutations::EditArticle
    field :create_article, mutation: Mutations::CreateArticle
  end
end
