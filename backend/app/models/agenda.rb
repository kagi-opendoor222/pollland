class Agenda < ApplicationRecord
    # belongs_to :user
    has_many :candidates

    def votes_counts_of_candidates
      candidates.map(&:votes_count)
    end
end
