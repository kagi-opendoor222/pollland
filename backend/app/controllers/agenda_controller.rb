class AgendaController < ApplicationController
  def index
    @themes = Theme.all
  end
  def new
    @theme = Theme.new
  end
  def create
    theme = Theme.create(theme_params)
    params[:group][:number_of_groups].to_i.times do |i|
      group = theme.groups.create(group_params(i))
    end
    redirect_to themes_path
  end
  def show
    @theme = Theme.find(params[:id])
  end
  private
  def theme_params
    params.require(:theme).permit(:name).merge({user_id: current_user.id})
  end
  def group_params(i)
    params.require(:group).require("group#{i}").permit(:name, :message, :image)
  end
end
