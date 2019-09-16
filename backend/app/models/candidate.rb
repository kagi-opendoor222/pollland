class Candidate < ApplicationRecord
  belongs_to :agenda
  has_many :votes

  has_one_attached :image

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

  def parse_base64(img)
    if img.present? || rex_image(img) == ''
      content_type = create_extension(img)
      contents = img.sub %r/data:((image|application)\/.{3,}),/, ''
      decoded_data = Base64.decode64(contents)
      filename = Time.zone.now.to_s + '.' + content_type
      File.open("#{Rails.root}/tmp/#{filename}", 'wb') do |f|
        f.write(decoded_data)
      end
      attach_image(filename)
    end
  end

  private
  def create_extension(img)
    content_type = rex_image(img)
    content_type[%r/\b(?!.*\/).*/]
  end

  def rex_image(img)
    img[%r/(image\/[a-z]{3,4})|(application\/[a-z]{3,4})/]
  end

  def attach_image(filename)
    image.attach(io: File.open("#{Rails.root}/tmp/#{filename}"), filename: filename)
    FileUtils.rm("#{Rails.root}/tmp/#{filename}")
  end
end
