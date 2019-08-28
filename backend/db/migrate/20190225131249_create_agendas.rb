class CreateAgendas < ActiveRecord::Migration[5.2]
  def change
    create_table :agendas do |t|
      t.string      :name,          null: false
      t.text        :message
      t.datetime    :start_time
      t.datetime    :end_time
      t.integer     :user_id,       foreign_key: true
      t.timestamps
    end
  end
end
