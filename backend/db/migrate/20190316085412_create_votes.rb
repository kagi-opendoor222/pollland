class CreateVotes < ActiveRecord::Migration[5.2]
  def change
    create_table :votes do |t|
      t.text        :message
      t.references  :candidate, foreign_key: true
      t.references  :user
      t.timestamps
    end
  end
end
