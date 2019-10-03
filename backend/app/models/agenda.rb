class Agenda < ApplicationRecord
    # belongs_to :user
    has_many :candidates

    def sum_votes
      candidates_votes_array = candidates.map(&:vote_count)
      candidates_votes_array.sum
    end
end
