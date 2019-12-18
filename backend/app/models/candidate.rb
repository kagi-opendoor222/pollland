class Candidate < ApplicationRecord
  belongs_to :agenda
  has_many :votes

  has_one_attached :image

  include Rails.application.routes.url_helpers

  def self.to_json_with_data(candidates)
    return candidates.to_json(methods: [:image_url, :vote_count, :vote_ratio, :votes_user_ids])
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

  def image_url
    image.attached? ? rails_blob_url(self.image) : ""
  end

  def vote_count
    self.votes.length
  end

  def vote_ratio
    sum_votes = self.agenda.sum_votes
    if sum_votes > 0
      vote_ratio = (self.votes.length.to_f / sum_votes * 100).round
    else
      vote_ratio = 0
    end
    return vote_ratio
  end

  def votes_user_ids
    votes.map{|vote| vote.user_id}
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
