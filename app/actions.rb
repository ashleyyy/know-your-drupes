# Homepage (Root path)
get '/' do
  @things = Thing.all
  erb :index
end
