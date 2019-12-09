class Agenda < ApplicationRecord
    belongs_to :user
    has_many :candidates

    def self.to_json_with_data(agendas)
      return agendas.to_json(methods: [:user_name])
    end
    def user_name
      self.user.name
    end
    def sum_votes
      candidates_votes_array = candidates.map(&:vote_count)
      candidates_votes_array.sum
    end
end
