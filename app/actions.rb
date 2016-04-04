# Homepage (Root path)
get '/' do
  erb :index
end

get '/things' do
  Thing.all.to_json
end

