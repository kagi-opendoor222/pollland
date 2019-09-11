class Candidate < ApplicationRecord
  belongs_to :agenda
  has_many :votes

  # has_one_attached :image

  def votes_count
    self.votes.length
  end
  # def self.votes_count_list
  #   self.all.map(&:votes_count)
  # end
  def self.to_ratio(counts)
    return counts.map do |num|
      (num / counts.sum.to_f * 100).round
    end
  end

  def vote_ratio
    votes_counts = self.agenda.votes_counts_of_candidates
    vote_ratio = (self.votes.length.to_f / votes_counts.sum * 100).round
    return all_votes_counts.sum > 0 ? vote_ratio : 0
  end
end
