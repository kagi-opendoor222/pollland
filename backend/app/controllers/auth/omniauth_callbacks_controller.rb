class Auth::OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController
  include Devise::Controllers::Rememberable

  def omniauth_success
    get_resource_from_auth_hash
    # create_token_info
    set_token_on_resource
    create_auth_params

    # ここは使わないのでコメントアウト
    #if resource_class.devise_modules.include?(:confirmable)
    #  # don't send confirmation email!!!
    #  @resource.skip_confirmation!
    #end

    sign_in(:user, @resource, store: false, bypass: false)

    # 動作確認用にユーザ情報を保存できたらjsonをそのまま返す処理
    # if @resource.save!
    #   # update_token_authをつけることでレスポンスヘッダーに認証情報を付与できる。
    #   update_auth_header
    #   yield @resource if block_given?
    #   render json: @resource, status: :ok
    # else
    #   render json: { message: "failed to login" }, status: 500
    # end

    # 本実装時はこちらを使用する
    @resource.save!
          
    update_auth_header # これは自分で追加する
    yield @resource if block_given?
    render_data_or_redirect('deliverCredentials', @auth_params.as_json, @resource.as_json)

  end

  protected
  def get_resource_from_auth_hash
    # find or create user by provider and provider uid
    @resource = resource_class.where({
      uid:      auth_hash['uid'],
      provider: auth_hash['provider']
    }).first_or_initialize

    if @resource.new_record?
      @oauth_registration = true
      # これが呼ばれるとエラーになるのでコメントアウトする
      #set_random_password
    end

    # sync user info with provider, update/generate auth token
    assign_provider_attrs(@resource, auth_hash)

    # assign any additional (whitelisted) attributes
    extra_params = whitelisted_params
    @resource.assign_attributes(extra_params) if extra_params

    @resource
  end
  def render_data_or_redirect(message, data, user_data = {})

    # We handle inAppBrowser and newWindow the same, but it is nice
    # to support values in case people need custom implementations for each case
    # (For example, nbrustein does not allow new users to be created if logging in with
    # an inAppBrowser)
    #
    # See app/views/devise_token_auth/omniauth_external_window.html.erb to understand
    # why we can handle these both the same.  The view is setup to handle both cases
    # at the same time.
    if ['inAppBrowser', 'newWindow'].include?(omniauth_window_type)
      render_data(message, user_data.merge(data))

    elsif auth_origin_url # default to same-window implementation, which forwards back to auth_origin_url

      # build and redirect to destination url
      redirect_to DeviseTokenAuth::Url.generate(auth_origin_url, data.merge(blank: true))
    else

      # there SHOULD always be an auth_origin_url, but if someone does something silly
      # like coming straight to this url or refreshing the page at the wrong time, there may not be one.
      # In that case, just render in plain text the error message if there is one or otherwise
      # a generic message.
      fallback_render data[:error] || 'An error occurred'
    end
  end
end
