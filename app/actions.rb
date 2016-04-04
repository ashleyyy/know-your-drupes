# Homepage (Root path)
get '/things' do
  @things = Thing.all
  erb :index
end
