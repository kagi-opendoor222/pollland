class CreateCandidates < ActiveRecord::Migration[5.2]
  def change
    create_table :candidates do |t|
      t.string        :name
      t.text          :message
      t.references    :agenda,     foreign_key: false
      t.timestamps
    end
  end
end
